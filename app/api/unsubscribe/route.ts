// app/api/unsubscribe/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import UnsubscribeEmail from "../../../components/email-templates/UnsubscribeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    ("Unsubscribe request received");

    // Parse the request body
    const body = await request.json();
    let { email, token } = body;

    if (!email || !token) {
      ("Missing email or token in request");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Clean input data
    email = email.trim().toLowerCase();
    token = token.trim();

    // First check if the email and token combination exists
    const { data: subscribers, error: fetchError } = await supabase
      .from("subscribers")
      .select("id, email, subscribed")
      .eq("email", email)
      .eq("unsubscribe_token", token);

    if (fetchError) {
      console.error("Error fetching subscriber data:", fetchError);
      return NextResponse.json(
        { error: "Database error", details: fetchError.message },
        { status: 500 }
      );
    }

    // If no matching records found
    if (!subscribers || subscribers.length === 0) {
      ("No matching subscriber found with email and token");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const subscriber = subscribers[0];

    // Check if already unsubscribed
    if (subscriber.subscribed === false) {
      ("Subscriber already unsubscribed");
      return NextResponse.json({
        success: true,
        message: "Already unsubscribed",
      });
    }

    // Prepare update data
    const updateData = {
      subscribed: false,
      unsubscribed_at: new Date().toISOString(),
    };

    // Update the specific record by ID for more reliability
    const { error: updateError } = await supabase
      .from("subscribers")
      .update(updateData)
      .eq("id", subscriber.id);

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

    // Send confirmation email if Resend is initialized

    if (resend) {
      try {
        const emailComponent = UnsubscribeEmail({
          email,
          resubscribeToken: token,
        }) as React.ReactElement;

        await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "تأكيد إلغاء الاشتراك",
          react: emailComponent,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    } else {
      console.warn(
        "Resend API key not configured. Skipping confirmation email."
      );
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "",
    });

    return NextResponse.json(
      { error: "An error occurred during unsubscription" },
      { status: 500 }
    );
  }
}
