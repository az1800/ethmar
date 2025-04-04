// app/api/resubscribe/route.ts
//xx
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import ResubscribeEmail from "../../../components/email-templates/ResubscribeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    console.log("Resubscribe request received");

    // Parse the request body
    const body = await request.json();
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

    console.log("Processing resubscribe request:");
    console.log("- Email:", email);
    console.log("- Token:", token);

    // First check if the email and token combination exists
    const { data: subscribers, error: fetchError } = await supabase
      .from("subscribers")
      .select("id, email, subscribed, name")
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
      console.log("No matching subscriber found with email and token");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const subscriber = subscribers[0];
    console.log("Found matching subscriber:", subscriber.id);

    // Check if already subscribed
    if (subscriber.subscribed === true) {
      console.log("Subscriber already active");
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    // Prepare update data
    const updateData = {
      subscribed: true,
      resubscribed_at: new Date().toISOString(),
      // Clear the unsubscribed_at field if it exists
      unsubscribed_at: null,
    };

    console.log("Updating subscriber with data:", updateData);

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

    console.log("Successfully reactivated subscriber:", subscriber.id);

    // Send confirmation email if Resend is initialized
    if (resend) {
      try {
        const emailComponent = ResubscribeEmail({
          email,
          name: subscriber.name || "",
        }) as React.ReactElement;

        await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "إثمار - أهلاً بك مجدداً",
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
    return NextResponse.json({
      success: true,
      message: "Subscription successfully reactivated",
    });
  } catch (error) {
    console.error("Resubscribe error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "",
    });

    return NextResponse.json(
      { error: "An error occurred during resubscription" },
      { status: 500 }
    );
  }
}
