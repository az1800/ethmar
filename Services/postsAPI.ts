// import supabase from "./supabase";

// export async function getPosts(category: string | null = null) {
//   try {
//     // Start with the base query
//     let query = supabase
//       .from("Posts")
//       .select("*")
//       .order("created_at", { ascending: false }); // 👈 newest to oldest

//     // Special case: if category is 'منشور مميز', fetch only newest post with that category
//     if (category === "منشور مميز") {
//       const { data, error } = await query.eq("Category", "منشور مميز").limit(1); // Get only the newest post (since we're already ordering by created_at desc)

//       if (error) {
//         console.error("Error fetching featured post:", error.message);
//         return { data: [], error };
//       }

//       return { data, error: null };
//     }

//     // Normal case: exclude 'منشور مميز' posts and filter by category if provided
//     query = query.neq("Category", "منشور مميز");

//     const { data, error } = category
//       ? await query.eq("Category", category)
//       : await query;

//     if (error) {
//       console.error("Error fetching posts:", error.message);
//       return { data: [], error };
//     }

//     return { data, error: null };
//   } catch (error) {
//     console.error("Unexpected error in getPosts:", error);
//     return { data: [], error };
//   }
// }
// export async function getPostById(id: number) {
//   try {
//     const { data, error } = await supabase
//       .from("Posts")
//       .select("*")
//       .eq("id", id);

//     if (error) {
//       console.error("Error fetching posts:", error.message);
//       return { data: [], error };
//     }

//     return { data, error: null };
//   } catch (error) {
//     console.error("Unexpected error in getPosts:", error);
//     return { data: [], error };
//   }
// }

// export async function postArticle(
//   category: string,
//   content: string,
//   title: string,
//   postImage?: string
// ) {
//   try {
//     // First insert with temporary link
//     const { data, error } = await supabase
//       .from("Posts")
//       .insert([
//         {
//           Category: category,
//           Title: title,
//           Content: content,
//           post_image:
//             postImage ||
//             "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u76/w8bM0NPHzM/T2Nu8wMPh5ejc4eTm6+61ubzFyczN0dTk6ezZ3eCrc+moAAAC50lEQVR4nO3c7W6CMBSAYThVUBDl/q92A/wAWtRKG9LD+/xZssxlvGlZi0iWAQAAAAAAAAAAAAAAAAAAAAAAAACwLxLH1oe1grTHQwRNWadaRaqTyaMw5ppmFCkvcYr0VQ5JRqkiJvmP0iQYRWIW6aK0Wx+hvzbSueQpvdkjxfCXn4rgmqH2pd76GH3JYUgSY3VS9lFMtfUx+pJT3+QYY4CfaWKhiY0mNlVNAm3gFDWRuiyapli/gVPTROrCDMdiipVVtDSRarSuNdWqKFqaTHeE66IoaVLPdj9mzcJcR5PH7udlzVZfR5P5MPnfwd1+/90qmtx3bZPJU/4+UHQ0sabOp8kj5zfjSEeTg93k7SUhuZl8+Sy8yyZdknw5io4mfnNnSLIcRUcTr3PsI8liFBVNspvH/2IZ/bA7io4m0nw9dWTSzxlFRxN7bb80TGQ2pFxRlDSRdroHbBeGiZzns8wRRUmT2bWCxST2iccRRUuTTOrmcU2puXkkcURR06Q74rLpbh5ZKuKYOO4oipp8ukbtHiWOKKqavH/Fwiixo+ymybsksyh7afI+yTTKTpp8SjKJso8mn5OMo6hsIrNN8TdJRlE0NpHrpRh//7skrygKm8jV5GYU5dskzzeF9DXpkuSjKF8neUZR12RI8orikSQ35/4l2po8kjyi+CRR2uSVZLgV2iuJzibjJH0UryQqm0yTdFH8brZW2GSexJu+JquT6GuyPom6JgGSaGsSIomyJnIM8XEeVU2CjBJdTQIl0dXEcU8OTWiS0cSFJjaa2Ghio4mNJrZZExPERVOTMhBV72UE+lT+8MuUNAmKJjaa2BJvUtDk5bEkqQOdXceK8WIlIXK8L7PCrNYmK7f7l60P0V8VocZEgg/eCrWeX5Le1MlcnykOmiTJJ/l53jPg55Jkkk5hTIxzrDGndQ/G2JLU7fUY3LU8J1ukF2F5kvTjYwEAAAAAAAAAAAAAAAAAAAAAAAAA+MEflIYuWPo6q+0AAAAASUVORK5CYII=",
//         },
//       ])
//       .select();

//     if (error) {
//       console.error("Error inserting post:", error.message);
//       return { data: [], error };
//     }

//     // Send notification to subscribers
//     if (data && data.length > 0) {
//       const postId = data[0].id;

//       try {
//         // Call the notify-subscribers API endpoint using fetch
//         // Make sure we're handling both server-side and client-side environments
//         const baseUrl =
//           typeof window !== "undefined"
//             ? "" // Empty on client-side since we're making a relative request
//             : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Base URL on server-side

//         const response = await fetch(`${baseUrl}/api/notify-subscribers`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             postId,
//             category,
//             title,
//           }),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.warn(
//             "Failed to send notification to subscribers:",
//             errorText
//           );
//         } else {
//           const result = await response.json();
//         }
//       } catch (notifyError) {
//         // Log the error but don't fail the post creation
//         console.error("Error notifying subscribers:", notifyError);
//       }
//     }

//     // Return the original data
//     return { data, error: null };
//   } catch (error) {
//     console.error("Unexpected error in postArticle:", error);
//     return { data: [], error };
//   }
// }
// // Update an existing post
// export async function updateArticle(
//   id: number,
//   category: string,
//   content: string,
//   title: string,
//   imageData: string // Can be a base64 string or URL
// ) {
//   try {
//     // Prepare the updated data
//     const updateData = {
//       Category: category,
//       Content: content,
//       Title: title,
//       post_image: imageData,
//       updated_at: new Date().toISOString(), // Add updated timestamp
//     };

//     // Update the post in the database
//     const { data, error } = await supabase
//       .from("Posts")
//       .update(updateData)
//       .eq("id", id)
//       .select();

//     if (error) {
//       console.error("Error updating article:", error.message);
//       return { data: null, error };
//     }

//     return { data, error: null };
//   } catch (error) {
//     console.error("Unexpected error in updateArticle:", error);
//     return { data: null, error };
//   }
// }

// // Delete a post
// export async function deleteArticle(id: number) {
//   try {
//     const { error } = await supabase.from("Posts").delete().eq("id", id);

//     if (error) {
//       console.error("Error deleting article:", error.message);
//       return { error };
//     }

//     return { error: null };
//   } catch (error) {
//     console.error("Unexpected error in deleteArticle:", error);
//     return { error };
//   }
// }

import supabase from "./supabase";

export async function getPosts(category: string | null = null) {
  try {
    // Start with the base query
    let query = supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false }); // 👈 newest to oldest

    // Special case: if category is 'منشور مميز', fetch only newest post with that category
    if (category === "منشور مميز") {
      const { data, error } = await query.eq("Category", "منشور مميز").limit(1); // Get only the newest post (since we're already ordering by created_at desc)

      if (error) {
        console.error("Error fetching featured post:", error.message);
        return { data: [], error };
      }

      return { data, error: null };
    }

    // Normal case: exclude 'منشور مميز' posts and filter by category if provided
    query = query.neq("Category", "منشور مميز");

    const { data, error } = category
      ? await query.eq("Category", category)
      : await query;

    if (error) {
      console.error("Error fetching posts:", error.message);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getPosts:", error);
    return { data: [], error };
  }
}
export async function getPostById(id: number) {
  try {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error("Error fetching posts:", error.message);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getPosts:", error);
    return { data: [], error };
  }
}

export async function postArticle(
  category: string,
  content: string,
  title: string,
  postImage?: string
) {
  try {
    // First insert with temporary link
    const { data, error } = await supabase
      .from("Posts")
      .insert([
        {
          Category: category,
          Title: title,
          Content: content,
          post_image:
            postImage ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u76/w8bM0NPHzM/T2Nu8wMPh5ejc4eTm6+61ubzFyczN0dTk6ezZ3eCrc+moAAAC50lEQVR4nO3c7W6CMBSAYThVUBDl/q92A/wAWtRKG9LD+/xZssxlvGlZi0iWAQAAAAAAAAAAAAAAAAAAAAAAAACwLxLH1oe1grTHQwRNWadaRaqTyaMw5ppmFCkvcYr0VQ5JRqkiJvmP0iQYRWIW6aK0Wx+hvzbSueQpvdkjxfCXn4rgmqH2pd76GH3JYUgSY3VS9lFMtfUx+pJT3+QYY4CfaWKhiY0mNlVNAm3gFDWRuiyapli/gVPTROrCDMdiipVVtDSRarSuNdWqKFqaTHeE66IoaVLPdj9mzcJcR5PH7udlzVZfR5P5MPnfwd1+/90qmtx3bZPJU/4+UHQ0sabOp8kj5zfjSEeTg93k7SUhuZl8+Sy8yyZdknw5io4mfnNnSLIcRUcTr3PsI8liFBVNspvH/2IZ/bA7io4m0nw9dWTSzxlFRxN7bb80TGQ2pFxRlDSRdroHbBeGiZzns8wRRUmT2bWCxST2iccRRUuTTOrmcU2puXkkcURR06Q74rLpbh5ZKuKYOO4oipp8ukbtHiWOKKqavH/Fwiixo+ymybsksyh7afI+yTTKTpp8SjKJso8mn5OMo6hsIrNN8TdJRlE0NpHrpRh//7skrygKm8jV5GYU5dskzzeF9DXpkuSjKF8neUZR12RI8orikSQ35/4l2po8kjyi+CRR2uSVZLgV2iuJzibjJH0UryQqm0yTdFH8brZW2GSexJu+JquT6GuyPom6JgGSaGsSIomyJnIM8XEeVU2CjBJdTQIl0dXEcU8OTWiS0cSFJjaa2Ghio4mNJrZZExPERVOTMhBV72UE+lT+8MuUNAmKJjaa2BJvUtDk5bEkqQOdXceK8WIlIXK8L7PCrNYmK7f7l60P0V8VocZEgg/eCrWeX5Le1MlcnykOmiTJJ/l53jPg55Jkkk5hTIxzrDGndQ/G2JLU7fUY3LU8J1ukF2F5kvTjYwEAAAAAAAAAAAAAAAAAAAAAAAAA+MEflIYuWPo6q+0AAAAASUVORK5CYII=",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting post:", error.message);
      return { data: [], error };
    }

    // Send notification to subscribers
    if (data && data.length > 0) {
      const postId = data[0].id;

      try {
        // Call the notify-subscribers API endpoint using fetch
        // Make sure we're handling both server-side and client-side environments
        const baseUrl =
          typeof window !== "undefined"
            ? "" // Empty on client-side since we're making a relative request
            : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Base URL on server-side

        const response = await fetch(`${baseUrl}/api/notify-subscribers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            category,
            title,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(
            "Failed to send notification to subscribers:",
            errorText
          );
        } else {
          const result = await response.json();
        }
      } catch (notifyError) {
        // Log the error but don't fail the post creation
        console.error("Error notifying subscribers:", notifyError);
      }
    }

    // Return the original data
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in postArticle:", error);
    return { data: [], error };
  }
}
/**
 * Update an existing post
 * @param id Post ID
 * @param category Post category
 * @param content Post content (HTML)
 * @param title Post title
 * @param imageData Post image (base64 or URL)
 */
export async function updateArticle(
  id: number,
  category: string,
  content: string,
  title: string,
  imageData: string // Can be a base64 string or URL
) {
  try {
    console.log(`Attempting to update post with ID: ${id}`);

    // First, check if the post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching post to update:", fetchError.message);
      return {
        data: null,
        error: { message: "Post not found or access denied" },
      };
    }

    if (!existingPost) {
      console.error(`Post with ID ${id} not found`);
      return { data: null, error: { message: "Post not found" } };
    }

    console.log("Existing post found:", existingPost);

    // Prepare the updated data
    const updateData = {
      Category: category,
      Content: content,
      Title: title,
      post_image: imageData,
      updated_at: new Date().toISOString(), // Add updated timestamp
    };

    console.log("Update data prepared:", updateData);

    // Update the post in the database
    const { data, error } = await supabase
      .from("Posts")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating article:", error.message);
      return { data: null, error };
    }

    console.log("Update successful:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in updateArticle:", error);
    return { data: null, error };
  }
}

/**
 * Delete a post
 * @param id Post ID
 */
// export async function deletePost(id: number) {
//   // Get current user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return { data: null, error: new Error("User not authenticated") };
//   }

//   // First check if the post belongs to the current user
//   const { data: postData } = await supabase
//     .from("Posts")
//     .select("user_id")
//     .eq("id", id)
//     .single();

//   if (!postData) {
//     return { data: null, error: new Error("Post not found") };
//   }

//   if (postData.user_id !== user.id) {
//     return {
//       data: null,
//       error: new Error("Not authorized to delete this post"),
//     };
//   }

//   const { data, error } = await supabase.from("Posts").delete().eq("id", id);

//   return { data, error };
// }
export async function deletePost(id: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  // Skip the user_id check (since it doesn't exist)
  const { data, error } = await supabase.from("Posts").delete().eq("id", id);
  return { data, error };
}
