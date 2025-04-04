// app/api/resubscribe/route.ts
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

    // Log the received data for debugging
    console.log("Received resubscribe data:", { email, token });

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

    // First check if the email exists (separately from token check)
    const { data: emailCheck, error: emailError } = await supabase
      .from("subscribers")
      .select("id, email, subscribed, unsubscribe_token")
      .eq("email", email)
      .single();

    if (emailError) {
      console.error("Error checking email existence:", emailError);

      // If the error is 'not found', give a specific message
      if (emailError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Email not found in our records" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Database error", details: emailError.message },
        { status: 500 }
      );
    }

    // Now we have the subscriber record - check if token matches
    console.log("Found subscriber:", emailCheck.id);
    console.log("Expected token:", emailCheck.unsubscribe_token);
    console.log("Provided token:", token);

    if (emailCheck.unsubscribe_token !== token) {
      console.log("Token mismatch for subscriber:", emailCheck.id);
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 401 }
      );
    }

    // Check if already subscribed
    if (emailCheck.subscribed === true) {
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
      .eq("id", emailCheck.id);

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

    console.log("Successfully reactivated subscriber:", emailCheck.id);

    // Fetch complete subscriber data for email
    const { data: subscriber, error: fetchError } = await supabase
      .from("subscribers")
      .select("id, email, name, subscribed")
      .eq("id", emailCheck.id)
      .single();

    if (fetchError) {
      console.error("Error fetching updated subscriber data:", fetchError);
      // Continue anyway since the subscription is already updated
    }

    // Send confirmation email if Resend is initialized
    if (resend) {
      try {
        const subscriberName = subscriber?.name || "";
        const emailComponent = ResubscribeEmail({
          email,
          name: subscriberName,
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
