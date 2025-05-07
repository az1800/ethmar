// // import supabase from "./supabase";

// // export default async function getPartners() {
// //   let { data, error } = await supabase.from("Partners").select("*");

// //   if (error) {
// //     return { error };
// //   }
// //   return { data };
// // }
// import supabase from "./supabase";

// /**
//  * Fetch all partners from the database
//  */
// export default async function getPartners() {
//   const { data, error } = await supabase
//     .from("Partners")
//     .select("*")
//     .order("id", { ascending: true });

//   if (error) {
//     console.error("Error fetching partners:", error);
//     throw new Error(error.message);
//   }

//   return { data };
// }

// /**
//  * Add a new partner to the database
//  */
// export async function addPartner(companyName: string, companyLogo: string) {
//   const { data, error } = await supabase
//     .from("Partners")
//     .insert([
//       {
//         Company_name: companyName,
//         Company_Logo: companyLogo,
//       },
//     ])
//     .select();

//   if (error) {
//     console.error("Error adding partner:", error);
//     throw new Error(error.message);
//   }

//   return data;
// }

// /**
//  * Update an existing partner in the database
//  */
// export async function updatePartner(
//   id: number,
//   companyName: string,
//   companyLogo: string
// ) {
//   const { data, error } = await supabase
//     .from("Partners")
//     .update({
//       Company_name: companyName,
//       Company_Logo: companyLogo,
//     })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Error updating partner:", error);
//     throw new Error(error.message);
//   }

//   return data;
// }

// /**
//  * Delete a partner from the database
//  */
// export async function deletePartner(id: number) {
//   const { data, error } = await supabase.from("Partners").delete().eq("id", id);

//   if (error) {
//     console.error("Error deleting partner:", error);
//     throw new Error(error.message);
//   }

//   return data;
// }

// /**
//  * Get a single partner by ID
//  */
// export async function getPartnerById(id: number) {
//   const { data, error } = await supabase
//     .from("Partners")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error("Error fetching partner:", error);
//     throw new Error(error.message);
//   }

//   return data;
// }
import supabase from "./supabase";

export interface Partner {
  id: number;
  Company_name: string;
  Company_Logo: string;
}

/**
 * Fetch all partners from the database
 */
export default async function getPartners() {
  try {
    const { data, error } = await supabase
      .from("Partners")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching partners:", error);
      throw new Error(error.message);
    }

    return { data };
  } catch (error) {
    console.error("Error in getPartners:", error);
    throw error;
  }
}

/**
 * Add a new partner to the database
 */
export async function addPartner(companyName: string, companyLogo: string) {
  try {
    const { data, error } = await supabase
      .from("Partners")
      .insert([
        {
          Company_name: companyName,
          Company_Logo: companyLogo,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding partner:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in addPartner:", error);
    throw error;
  }
}

/**
 * Update an existing partner in the database
 */
export async function updatePartner(
  id: number,
  companyName: string,
  companyLogo: string
) {
  try {
    const { data, error } = await supabase
      .from("Partners")
      .update({
        Company_name: companyName,
        Company_Logo: companyLogo,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating partner:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in updatePartner:", error);
    throw error;
  }
}

/**
 * Delete a partner from the database
 */
export async function deletePartner(id: number) {
  try {
    const { data, error } = await supabase
      .from("Partners")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting partner:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in deletePartner:", error);
    throw error;
  }
}

/**
 * Get a single partner by ID
 */
export async function getPartnerById(id: number) {
  try {
    const { data, error } = await supabase
      .from("Partners")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching partner:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in getPartnerById:", error);
    throw error;
  }
}
