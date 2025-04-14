import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import WelcomeEmail from "@/components/email-templates/WelcomeEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { email, name, ...otherFields } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed", emailExists: true },
        { status: 409 }
      );
    }

    // Generate a unique unsubscribe token
    const unsubscribe_token = uuidv4();

    // Insert new subscriber with unsubscribe token
    const { error } = await supabase.from("subscribers").insert({
      email,
      name,
      unsubscribe_token,
      created_at: new Date().toISOString(),
      ...otherFields,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Send welcome email only if Resend is initialized
    let emailSent = false;
    let emailData = null;

    if (resend) {
      try {
        const { data, error: emailError } = await resend.emails.send({
          from: "Ethmar <no-reply@ethmar.xyz>",
          to: email,
          subject: "مرحباً بك في مجتمع إثمار",
          react: WelcomeEmail({
            email: email,
            unsubscribeToken: unsubscribe_token,
          }),
        });

        if (!emailError) {
          emailSent = true;
          emailData = data;
        } else {
          console.error("Email API error:", emailError);
        }
      } catch (emailError) {
        console.error("Email sending error:", emailError);
      }
    } else {
      console.warn("Resend API key not configured. Skipping welcome email.");
    }

    return NextResponse.json({
      status: "subscribed",
      emailSent,
      data: emailData,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
