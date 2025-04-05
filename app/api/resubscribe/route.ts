import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import ResubscribeEmail from "../../../components/email-templates/ResubscribeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    let { email, token } = body;

    if (!email || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Clean input data
    email = email.trim().toLowerCase();
    token = token.trim();

    // Check if the email and token combination exists
    const { data: subscribers, error: fetchError } = await supabase
      .from("subscribers")
      .select("id, email, subscribed")
      .eq("email", email)
      .eq("unsubscribe_token", token);

    if (fetchError) {
      return NextResponse.json(
        { error: "Database error", details: fetchError.message },
        { status: 500 }
      );
    }

    // If no matching records found
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
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

    // Update subscription status
    const { error: updateError } = await supabase
      .from("subscribers")
      .update({
        subscribed: true,
        unsubscribed_at: null,
      })
      .eq("id", subscriber.id);

    if (updateError) {
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
        const emailComponent = ResubscribeEmail({
          email,
        }) as React.ReactElement;

        await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "🎉 تم تأكيد اشتراكك مجددًا في إثمار!",
          react: emailComponent,
        });
      } catch (emailError) {
        // Continue even if email sending fails
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "تم إعادة تفعيل اشتراكك بنجاح!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إعادة الاشتراك" },
      { status: 500 }
    );
  }
}
