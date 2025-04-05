// app/api/resubscribe/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import ResubscribeEmail from "../../../components/email-templates/ResubscribeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  console.log("=== RESUBSCRIBE API ROUTE START ===");

  try {
    console.log("Parsing request body...");
    // Parse the request body
    const body = await request.json();
    console.log("Received body:", body);

    let { email, token } = body;

    if (!email || !token) {
      console.log("Missing email or token in request");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Clean input data
    email = email.trim().toLowerCase();
    token = token.trim();

    console.log("Processing resubscribe request with cleaned data:");
    console.log("- Email:", email);
    console.log("- Token:", token);

    console.log("Querying Supabase...");
    // First check if the email and token combination exists
    const { data: subscribers, error: fetchError } = await supabase
      .from("subscribers")
      .select("id, email, subscribed")
      .eq("email", email)
      .eq("unsubscribe_token", token);

    console.log("Supabase query result:", { subscribers, error: fetchError });

    if (fetchError) {
      console.error("Error fetching subscriber data:", fetchError);
      return NextResponse.json(
        { error: "Database error", details: fetchError.message },
        { status: 500 }
      );
    }

    // If no matching records found
    if (!subscribers || subscribers.length === 0) {
      console.log("No matching subscriber found with email and token");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const subscriber = subscribers[0];
    console.log("Found matching subscriber:", subscriber);

    // Only attempt to resubscribe if currently unsubscribed
    if (subscriber.subscribed) {
      console.log("Subscriber is already active:", subscriber.id);
      return NextResponse.json({
        success: true,
        message: "أنت مشترك بالفعل في نشرة إثمار الإخبارية.",
      });
    }

    // Prepare update data for resubscribing - only using subscribed and unsubscribed_at
    const updateData = {
      subscribed: true,
      unsubscribed_at: null, // Clear the unsubscribe timestamp
    };

    console.log("Updating subscriber with data:", updateData);

    // Update the specific record by ID for more reliability
    const { error: updateError } = await supabase
      .from("subscribers")
      .update(updateData)
      .eq("id", subscriber.id);

    console.log("Update result error:", updateError);

    if (updateError) {
      console.error("Error updating subscriber:", updateError);
      return NextResponse.json(
        {
          error: "Failed to update subscription status",
          details: updateError.message,
        },
        { status: 500 }
      );
    }

    console.log("Successfully resubscribed subscriber:", subscriber.id);

    // Send confirmation email if Resend is initialized
    if (resend) {
      try {
        console.log("Attempting to send confirmation email");
        const emailComponent = ResubscribeEmail({
          email,
        }) as React.ReactElement;

        await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "🎉 تم تأكيد اشتراكك مجددًا في إثمار!",
          react: emailComponent,
        });

        console.log("Sent resubscribe confirmation email to:", email);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    } else {
      console.warn(
        "Resend API key not configured. Skipping confirmation email."
      );
    }

    // Return success response
    console.log("Returning success response");
    return NextResponse.json({
      success: true,
      message: "تم إعادة تفعيل اشتراكك بنجاح!",
    });
  } catch (error) {
    console.error("CRITICAL ERROR in resubscribe process:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "",
    });

    return NextResponse.json(
      { error: "حدث خطأ أثناء إعادة الاشتراك" },
      { status: 500 }
    );
  }
}
