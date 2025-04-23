import supabase from "./supabase";

export async function login({
  password,
  email,
}: {
  password: string;
  email: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  ("getCurrentUser called");

  try {
    // First check if we have a session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    // "Session check result:",
    //   {
    //     hasSession: Boolean(sessionData?.session),
    //     sessionError: sessionError?.message,
    //   };

    if (sessionError) {
      console.error("Session error:", sessionError.message);
      return null;
    }

    if (!sessionData?.session) {
      ("No active session found");
      return null;
    }

    // If we have a session, get the user data
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Get user error:", error.message);
      return null;
    }

    if (!data?.user) {
      ("No user found");
      return null;
    }

    // Return the user with an explicit authenticated property
    return data.user;
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return null;
  }
}

export async function logOut() {
  ("Logout attempt");

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      throw new Error(error.message);
    }

    ("Logout successful");
  } catch (error) {
    console.error("Unexpected error in logOut:", error);
    throw new Error("Something went wrong during logout");
  }
}
