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
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) throw new Error("No session found");

  // 2️⃣  Get the user linked to that session
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  if (!data) throw new Error("User object is null");

  return data?.user;
}
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("something went wrong");
}
