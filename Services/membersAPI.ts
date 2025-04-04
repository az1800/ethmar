import supabase from "./supabase";

export default async function getMembers() {
  let { data, error } = await supabase
    .from("Members")
    .select("id,full_Name,Position,Committee,Gender");
  if (error) {
  }

  return data;
}
