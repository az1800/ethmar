import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Optional: Add a warning if the environment variables are missing
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Make sure to set the environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
