import supabase from "./supabase";
import { HeroSectionData } from "../components/dashboard/types";
export async function fetchHeroSections(): Promise<HeroSectionData[]> {
  try {
    const { data, error } = await supabase.from("Herosections").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    throw error;
  }
}
export async function fetchHeroSectiondata(
  page_title: string
): Promise<HeroSectionData> {
  try {
    const { data, error } = await supabase
      .from("Herosections")
      .select("*")
      .eq("page_title", page_title)

      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    throw error;
  }
}
export async function updateHeroSections({
  page_title,
  title,
  description,
}: HeroSectionData): Promise<HeroSectionData> {
  try {
    const { data, error } = await supabase
      .from("Herosections")
      .update({
        title,
        description,
      })
      .eq("page_title", page_title)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error updating hero section:", error);
    throw error;
  }
}

export async function deleteHeroSections(page_title: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("Herosections")
      .delete()
      .eq("page_title", page_title);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting hero section:", error);
    throw error;
  }
}
