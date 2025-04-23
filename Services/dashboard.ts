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

  // Count posts per category
  data.forEach((post) => {
    const categoryKey = categoryMapping[post.Category];
    if (categoryKey) {
      counts[categoryKey]++;
    }
  });

  return counts;
}
