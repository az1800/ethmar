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
// import supabase from "./supabase";

// interface HeroSection {
//   page_title: string;
//   title: string;
//   description: string;
// }

// export async function fetchHeroSections(): Promise<HeroSection[]> {
//   try {
//     console.log("Fetching hero sections from Supabase...");

//     // Check if supabase client is properly initialized
//     if (!supabase) {
//       throw new Error("Supabase client is not initialized");
//     }

//     const { data, error } = await supabase
//       .from("Herosections")
//       .select("*")
//       .order("created_at", { ascending: false });

//     console.log("Supabase response:", { data, error });

//     if (error) {
//       console.error("Supabase error:", error);
//       throw new Error(`Database error: ${error.message}`);
//     }

//     if (!data) {
//       console.warn("No data returned from Supabase");
//       return [];
//     }

//     console.log(`Successfully fetched ${data.length} hero sections`);
//     return data;
//   } catch (error) {
//     console.error("Error in fetchHeroSections:", error);
//     // Re-throw with more context
//     throw new Error(`Failed to fetch hero sections: ${error.message}`);
//   }
// }

// export async function updateHeroSections({
//   page_title,
//   title,
//   description,
// }: HeroSection): Promise<HeroSection> {
//   try {
//     console.log("Updating hero section:", { page_title, title, description });

//     if (!supabase) {
//       throw new Error("Supabase client is not initialized");
//     }

//     const { data, error } = await supabase
//       .from("Herosections")
//       .update({
//         title,
//         description,
//       })
//       .eq("page_title", page_title)
//       .select()
//       .single();

//     console.log("Update response:", { data, error });

//     if (error) {
//       console.error("Update error:", error);
//       throw new Error(`Update failed: ${error.message}`);
//     }

//     if (!data) {
//       throw new Error("No data returned after update");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in updateHeroSections:", error);
//     throw new Error(`Failed to update hero section: ${error.message}`);
//   }
// }

// export async function deleteHeroSections(page_title: string): Promise<void> {
//   try {
//     console.log("Deleting hero section:", page_title);

//     if (!supabase) {
//       throw new Error("Supabase client is not initialized");
//     }

//     const { error } = await supabase
//       .from("Herosections")
//       .delete()
//       .eq("page_title", page_title);

//     console.log("Delete response:", { error });

//     if (error) {
//       console.error("Delete error:", error);
//       throw new Error(`Delete failed: ${error.message}`);
//     }

//     console.log("Successfully deleted hero section");
//   } catch (error) {
//     console.error("Error in deleteHeroSections:", error);
//     throw new Error(`Failed to delete hero section: ${error.message}`);
//   }
// }

// // Helper function to test connection
// export async function testSupabaseConnection(): Promise<boolean> {
//   try {
//     console.log("Testing Supabase connection...");

//     const { data, error } = await supabase
//       .from("Herosections")
//       .select("count", { count: "exact", head: true });

//     if (error) {
//       console.error("Connection test failed:", error);
//       return false;
//     }

//     console.log("Connection test successful, table exists");
//     return true;
//   } catch (error) {
//     console.error("Connection test error:", error);
//     return false;
//   }
// }
