// // app/api/unsubscribe/route.ts
// import { NextResponse } from "next/server";
// import supabase from "../../../Services/supabase";
// import { Resend } from "resend";
// import ResubscribeEmail from "../../../components/email-templates/ResubscribeEmail";

// // Initialize Resend only if API key is available
// const resendApiKey = process.env.RESEND_API_KEY || "";
// const resend = resendApiKey ? new Resend(resendApiKey) : null;

// export async function POST(request: Request) {
//   try {
//     console.log("Unsubscribe request received");

//     // Parse the request body
//     const body = await request.json();
//     let { email, token } = body;

//     if (!email || !token) {
//       console.log("Missing email or token in request");
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Clean input data
//     email = email.trim().toLowerCase();
//     token = token.trim();

//     console.log("Processing unsubscribe request:");
//     console.log("- Email:", email);
//     console.log("- Token:", token);

//     // First check if the email and token combination exists
//     const { data: subscribers, error: fetchError } = await supabase
//       .from("subscribers")
//       .select("id, email, subscribed")
//       .eq("email", email)
//       .eq("unsubscribe_token", token);

//     if (fetchError) {
//       console.error("Error fetching subscriber data:", fetchError);
//       return NextResponse.json(
//         { error: "Database error", details: fetchError.message },
//         { status: 500 }
//       );
//     }

//     // If no matching records found
//     if (!subscribers || subscribers.length === 0) {
//       console.log("No matching subscriber found with email and token");
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }

//     const subscriber = subscribers[0];
//     console.log("Found matching subscriber:", subscriber.id);

//     // Prepare update data
//     const updateData = {
//       subscribed: true,
//       unsubscribed_at: new Date().toISOString(),
//     };

//     console.log("Updating subscriber with data:", updateData);

//     // Update the specific record by ID for more reliability
//     const { error: updateError } = await supabase
//       .from("subscribers")
//       .update(updateData)
//       .eq("id", subscriber.id);

//     if (updateError) {
//       console.error("Error updating subscriber:", updateError);
//       return NextResponse.json(
//         {
//           error: "Failed to update subscription status",
//           details: updateError.message,
//         },
//         { status: 500 }
//       );
//     }

//     console.log("Successfully updated subscriber:", subscriber.id);

//     // Send confirmation email if Resend is initialized

//     if (resend) {
//       try {
//         const emailComponent = ResubscribeEmail({
//           email,
//         }) as React.ReactElement;

//         await resend.emails.send({
//           from: "Ethmar <no-reply@ethmar.xyz>",
//           to: email,
//           subject: "🎉 تم تأكيد اشتراكك مجددًا في إثمار!",

//           react: emailComponent,
//         });
//         console.log("Sent unsubscribe confirmation email to:", email);
//       } catch (emailError) {
//         console.error("Failed to send confirmation email:", emailError);
//       }
//     } else {
//       console.warn(
//         "Resend API key not configured. Skipping confirmation email."
//       );
//     }

//     // Return success response
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Unsubscribe error:", {
//       message: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : "",
//     });

//     return NextResponse.json(
//       { error: "An error occurred during unsubscription" },
//       { status: 500 }
//     );
//   }
// }
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
      console.log("No matching subscriber found with email and token");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const subscriber = subscribers[0];
    console.log("Found matching subscriber:", subscriber.id);

    // Check if already subscribed
    if (subscriber.subscribed) {
      console.log("Subscriber is already active:", subscriber.id);
      return NextResponse.json({
        success: true,
        message: "أنت مشترك بالفعل في نشرة إثمار الإخبارية.",
      });
    }

    // Prepare update data for resubscribing
    const updateData = {
      subscribed: true,
      unsubscribed_at: null, // Clear the unsubscribe timestamp
      resubscribed_at: new Date().toISOString(),
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

    console.log("Successfully resubscribed subscriber:", subscriber.id);

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
      message: "تم إعادة تفعيل اشتراكك بنجاح!",
    });
  } catch (error) {
    console.error("Resubscribe error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "",
    });

    return NextResponse.json(
      { error: "حدث خطأ أثناء إعادة الاشتراك" },
      { status: 500 }
    );
  }
}
