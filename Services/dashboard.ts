import supabase from "./supabase";
//fetch the stats
export async function getNumberOfArticles() {
  const { count, error } = await supabase
    .from("Posts") // replace with your table name
    .select("*", { count: "exact", head: true });
  if (error) {
  }
  return count;
}
export async function getNumberOfFeaturedArticles() {
  const { count, error } = await supabase
    .from("Posts")
    .select("*", { count: "exact", head: true })
    .eq("Category", "منشور مميز");

  if (error) {
  }
  return count;
}
export async function getNumberOfPartners() {
  const { count, error } = await supabase
    .from("Partners") // replace with your table name
    .select("*", { count: "exact", head: true });
  if (error) {
  }
  return count;
}
export async function getNumberOfMembers() {
  const { count, error } = await supabase
    .from("Members") // replace with your table name
    .select("*", { count: "exact", head: true });
  if (error) {
  }
  return count;
}
export async function getNumberOfAchievements() {
  const { count, error } = await supabase
    .from("achievements") // replace with your table name
    .select("*", { count: "exact", head: true });
  if (error) {
  }
  return count;
}
// charts data
// First, let's fix the getPostCountsByCategory function to match your target categories
export async function getPostCountsByCategory() {
  const { data, error } = await supabase.from("Posts").select("Category");

  if (error) {
    console.error("Error fetching categories:", error);
    return null;
  }

  // Define your target categories with their exact names in the database
  const categoryMapping = {
    "تحليل القطاعات": "sectorAnalysis",
    "البحوث المالية": "financialResearch",
    "التحليل المالي": "financialAnalysis",
    "قصة سهم": "stockStory",
    "المصطلحات المالية": "financialTerms",
    "مختارات إثمار المالية": "ithmarPicks",
    "منشور مميز": "featuredPost",
  };

  // Initialize counts
  const counts = {
    sectorAnalysis: 0,
    financialResearch: 0,
    financialAnalysis: 0,
    stockStory: 0,
    financialTerms: 0,
    ithmarPicks: 0,
    featuredPost: 0,
  };
  type CategoryName =
    | "تحليل القطاعات"
    | "البحوث المالية"
    | "التحليل المالي"
    | "قصة سهم"
    | "المصطلحات المالية"
    | "مختارات إثمار المالية"
    | "منشور مميز";

  data.forEach((post: { Category: CategoryName }) => {
    const categoryKey = categoryMapping[post.Category];
    if (categoryKey) {
      counts[categoryKey as keyof typeof counts]++;
    }
  });

  return counts;
}

/**
 * Add to the database
 */
export async function addMember(
  name: string,
  position: string,
  gender: string,
  committee?: string
) {
  const { data, error } = await supabase
    .from("Members")
    .insert([
      {
        full_Name: name,
        Position: position,
        Committee: committee,
        Gender: gender,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding member:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update in the database
 */
export async function updateMember(
  id: number,
  name: string,
  position: string,
  gender: string,
  committee?: string
) {
  const { data, error } = await supabase
    .from("Members")
    .update({
      full_Name: name,
      Position: position,
      Committee: committee,
      Gender: gender,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating member:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete a from the database
 */
export async function deleteMember(id: number) {
  const { data, error } = await supabase.from("Members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting member:", error);
    throw new Error(error.message);
  }

  return data;
}
