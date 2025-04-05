// app/api/resubscribe/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import ResubscribeEmail from "../../../components/email-templates/ResubscribeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  // Enhanced error response function
  const errorResponse = (
    message: string,
    details: any,
    status: number = 500
  ) => {
    return NextResponse.json(
      {
        error: message,
        details: details,
        timestamp: new Date().toISOString(),
        url: request.url,
        diagnosticMode: true,
      },
      { status }
    );
  };

  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return errorResponse(
        "Failed to parse request body",
        { parseError: String(parseError) },
        400
      );
    }

    let { email, token } = body;

    if (!email || !token) {
      return errorResponse(
        "Missing required fields",
        { providedFields: { email: !!email, token: !!token } },
        400
      );
    }

    // Clean input data
    email = email.trim().toLowerCase();
    token = token.trim();

    // First check if the email and token combination exists
    let subscribers;
    let fetchError;

    try {
      const result = await supabase
        .from("subscribers")
        .select("id, email, subscribed")
        .eq("email", email)
        .eq("unsubscribe_token", token);

      subscribers = result.data;
      fetchError = result.error;
    } catch (supabaseError) {
      return errorResponse(
        "Supabase query failed",
        { supabaseError: String(supabaseError) },
        500
      );
    }

    if (fetchError) {
      return errorResponse("Database error during fetch", fetchError, 500);
    }

    // If no matching records found
    if (!subscribers || subscribers.length === 0) {
      return errorResponse(
        "Invalid or expired token",
        { email, tokenFirstChars: token.substring(0, 8) + "..." },
        401
      );
    }

    const subscriber = subscribers[0];

    // Only attempt to resubscribe if currently unsubscribed
    if (subscriber.subscribed) {
      return NextResponse.json({
        success: true,
        message: "أنت مشترك بالفعل في نشرة إثمار الإخبارية.",
      });
    }

    // Prepare update data for resubscribing
    const updateData = {
      subscribed: true,
      unsubscribed_at: null,
    };

    // Update the specific record by ID for more reliability
    let updateError;

    try {
      const updateResult = await supabase
        .from("subscribers")
        .update(updateData)
        .eq("id", subscriber.id);

      updateError = updateResult.error;
    } catch (supabaseUpdateError) {
      return errorResponse(
        "Supabase update operation failed",
        { supabaseUpdateError: String(supabaseUpdateError) },
        500
      );
    }

    if (updateError) {
      return errorResponse(
        "Failed to update subscription status",
        updateError,
        500
      );
    }

    // Send confirmation email if Resend is initialized
    let emailSent = false;
    let emailError = null;

    if (resend) {
      try {
        const emailComponent = ResubscribeEmail({
          email,
        }) as React.ReactElement;

        await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "🎉 تم تأكيد اشتراكك مجددًا في إثمار!",
          react: emailComponent,
        });

        emailSent = true;
      } catch (sendError) {
        emailError = sendError;
        // Continue execution even if email fails
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "تم إعادة تفعيل اشتراكك بنجاح!",
      emailSent,
      emailError: emailError ? String(emailError) : null,
    });
  } catch (error) {
    return errorResponse(
      "Unhandled exception in resubscribe process",
      {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      500
    );
  }
}
