import supabase from "./supabase";

export default async function getAcheivements() {
  let { data, error } = await supabase.from("achievements").select("*");
  if (error) {
  }
  return data;
}
