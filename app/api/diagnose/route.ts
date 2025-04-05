// app/api/diagnose/route.ts
import { NextResponse } from "next/server";
import supabase from "../../../Services/supabase";

// Define types for subscriber check to avoid TypeScript errors
type SubscriberCheckResult =
  | { status: "not_attempted" }
  | { status: "error"; error: string }
  | { status: "not_found"; message: string }
  | { status: "found"; subscriberId: string; currentlySubscribed: boolean }
  | { status: "exception"; error: string };

// Add a basic health check endpoint that can be used to test API functionality
export async function GET(request: Request) {
  try {
    // Basic environment information
    const environmentInfo = {
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      url: request.url,
    };

    // Test Supabase connection
    let supabaseStatus = "unknown";
    let supabaseError = null;
    let databaseConnection = false;

    try {
      // Simple query to test database connectivity
      const { data, error } = await supabase
        .from("subscribers")
        .select("count()", { count: "exact" });

      if (error) {
        supabaseStatus = "error";
        supabaseError = error.message;
      } else {
        supabaseStatus = "connected";
        databaseConnection = true;
      }
    } catch (e) {
      supabaseStatus = "exception";
      supabaseError = e instanceof Error ? e.message : String(e);
    }

    // Check environment variables (safely without revealing values)
    const envVarCheck = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };

    return NextResponse.json({
      status: "API routes working",
      environment: environmentInfo,
      database: {
        status: supabaseStatus,
        error: supabaseError,
        connected: databaseConnection,
      },
      environmentVariables: envVarCheck,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "API error",
        errorMessage: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Add a POST endpoint for more detailed testing
export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      body = { parseError: "Could not parse JSON body" };
    }

    const { email, token } = body;

    // First test - just echo parameters
    const echoTest = {
      receivedEmail: email,
      receivedToken: token,
      emailProvided: !!email,
      tokenProvided: !!token,
    };

    // Second test - check if subscriber exists without making changes
    let subscriberCheck: SubscriberCheckResult = { status: "not_attempted" };

    if (email && token) {
      try {
        const { data, error } = await supabase
          .from("subscribers")
          .select("id, email, subscribed")
          .eq("email", email)
          .eq("unsubscribe_token", token);

        if (error) {
          subscriberCheck = {
            status: "error",
            error: error.message,
          };
        } else if (!data || data.length === 0) {
          subscriberCheck = {
            status: "not_found",
            message: "No matching subscriber found",
          };
        } else {
          subscriberCheck = {
            status: "found",
            subscriberId: data[0].id,
            currentlySubscribed: data[0].subscribed,
          };
        }
      } catch (e) {
        subscriberCheck = {
          status: "exception",
          error: e instanceof Error ? e.message : String(e),
        };
      }
    }

    return NextResponse.json({
      diagnosticMode: true,
      timestamp: new Date().toISOString(),
      receivedData: echoTest,
      subscriberCheck,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        errorMessage: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
