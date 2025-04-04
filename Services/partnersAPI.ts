import supabase from "./supabase";

export default async function getPartners() {
  let { data, error } = await supabase.from("Partners").select("*");

  if (error) {
    return { error };
  }
  return { data };
}
