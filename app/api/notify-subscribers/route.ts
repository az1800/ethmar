// app/api/notify-subscribers/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";
import { Resend } from "resend";
import NewPostEmail from "@/components/email-templates/NewPostEmail";

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    ("Notification request received");

    // Parse the request body
    const { postId, category, title } = await request.json();

    if (!postId || !title) {
      ("Missing postId or title in request");
      return NextResponse.json(
        { error: "Missing required fields: postId and title are required" },
        { status: 400 }
      );
    }

    // Get the post details - we need full details for the email
    let postDetails;
    const { data: post, error: postError } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (postError) {
      console.error("Error fetching post:", postError);

      // If we can't get full details but have minimal info, use that
      if (category && title) {
        ("Using minimal post details provided in request");
        postDetails = {
          Category: category,
          Title: title,
          id: postId,
          Content: "",
          post_image: "",
        };
      } else {
        return NextResponse.json(
          { error: "Failed to fetch post details" },
          { status: 500 }
        );
      }
    } else {
      postDetails = post;
    }

    // Fetch all active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("subscribers")
      .select("*")
      .eq("subscribed", true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      return NextResponse.json(
        { error: "Failed to fetch subscribers" },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      ("No active subscribers found");
      return NextResponse.json(
        { message: "No active subscribers found" },
        { status: 200 }
      );
    }

    `Found ${subscribers.length} active subscribers`;

    // Create the post URL
    const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://ethmar.xyz"}/Post?id=${postId}`;

    // Send emails to all subscribers if Resend is initialized
    let emailsSent = 0;
    if (resend) {
      // Process subscribers in smaller batches to avoid overwhelming the email service
      const batchSize = 10;
      const batches = [];

      // Split subscribers into batches
      for (let i = 0; i < subscribers.length; i += batchSize) {
        batches.push(subscribers.slice(i, i + batchSize));
      }

      `Processing ${batches.length} batches of emails`;

      // Process each batch sequentially
      for (const batch of batches) {
        const emailPromises = batch.map(async (subscriber) => {
          try {
            // Get post image if not already provided
            let postImage = postDetails.post_image || "";

            // Get post excerpt - first 150 characters of content
            let postExcerpt = "";
            if (postDetails.Content) {
              // Strip HTML tags and get first 150 characters
              postExcerpt =
                postDetails.Content.replace(/<[^>]*>?/gm, "")
                  .slice(0, 150)
                  .trim() + "...";
            }

            `Sending email to subscriber: ${subscriber.email}`;

            const emailComponent = NewPostEmail({
              email: subscriber.email,
              postTitle: postDetails.Title,
              postCategory: postDetails.Category,
              postId: postId,
              postImageUrl: postImage,
              postExcerpt: postExcerpt,
              unsubscribeToken: subscriber.unsubscribe_token,
            }) as React.ReactElement;

            const { data, error: emailError } = await resend.emails.send({
              from: "Ethmar <newsletter@ethmar.xyz>",
              to: subscriber.email,
              subject: `مقالة جديدة: ${postDetails.Title}`,
              react: emailComponent,
            });

            if (emailError) {
              console.error(
                `Failed to send email to ${subscriber.email}:`,
                emailError
              );
              return null;
            }

            return data;
          } catch (error) {
            console.error(
              `Failed to send email to ${subscriber.email}:`,
              error
            );
            return null;
          }
        });

        // Wait for the current batch to complete before moving to the next
        const results = await Promise.all(emailPromises);

        // Count successful emails in this batch
        const successfulInBatch = results.filter(
          (result) => result !== null
        ).length;
        emailsSent += successfulInBatch;

        `Batch completed: ${successfulInBatch} emails sent`;

        // Add a small delay between batches to avoid rate limits
        if (batches.length > 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } else {
      console.warn(
        "Resend API key not configured. Skipping notification emails."
      );
    }

    // Simply log to console instead of creating a dedicated logs table
    `Notification stats: ${emailsSent} of ${subscribers.length} emails sent for post ${postId}`;

    return NextResponse.json({
      success: true,
      message: `Notification sent to ${emailsSent} of ${subscribers.length} subscribers`,
    });
  } catch (error) {
    console.error("Error in notify-subscribers API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
