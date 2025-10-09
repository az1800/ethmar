import supabase from "./supabase";
import { uploadPdfAndGetUrlAndPath, storagePathFromPublicUrl, deleteByPath } from "./storage";

/** Fetch posts (with special handling for the newest featured). */
export async function getPosts(category: string | null = null) {
  try {
    let query = supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (category === "منشور مميز") {
      const { data, error } = await query.eq("Category", "منشور مميز").limit(1);
      if (error) {
        console.error("Error fetching featured post:", error.message, error.details, error.hint);
        return { data: [], error };
      }
      return { data, error: null };
    }

    if (category) {
      const { data, error } = await query.eq("Category", category);
      if (error) {
        console.error(`Error fetching posts for '${category}':`, error.message, error.details, error.hint);
        return { data: [], error };
      }
      return { data, error: null };
    }

    const { data: featuredPost, error: featuredError } = await supabase
      .from("Posts")
      .select("id")
      .eq("Category", "منشور مميز")
      .order("created_at", { ascending: false })
      .limit(1);

    if (featuredError) {
      console.error("Error fetching featured post ID:", featuredError.message, featuredError.details, featuredError.hint);
      return { data: [], error: featuredError };
    }

    if (featuredPost && featuredPost.length > 0) {
      query = query.neq("id", featuredPost[0].id);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching posts:", error.message, error.details, error.hint);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getPosts:", error);
    return { data: [], error };
  }
}

export async function getPostsDashboard(category: string | null = null) {
  try {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error.message, error.details, error.hint);
      return { data: [], error };
    }
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getPostsDashboard:", error);
    return { data: [], error };
  }
}

export async function getPostById(id: number) {
  try {
    const { data, error } = await supabase.from("Posts").select("*").eq("id", id);
    if (error) {
      console.error("Error fetching posts by id:", error.message, error.details, error.hint);
      return { data: [], error };
    }
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getPostById:", error);
    return { data: [], error };
  }
}



export async function postArticle(
  category: string,
  content: string,
  title: string,
  postImage?: string,
  postPdfUrl?: string,
  pdfFile?: File
) {
  try {
    let Post_Link: string | null = null;
    let Post_Path: string | null = null;

    if (pdfFile) {
      const { publicUrl, path } = await uploadPdfAndGetUrlAndPath(pdfFile, `${title || "post"}.pdf`);
      Post_Link = publicUrl;
      Post_Path = path; 
    } else if (postPdfUrl) {
      Post_Link = postPdfUrl;
      Post_Path = storagePathFromPublicUrl(postPdfUrl); // null if not our bucket
    }

    const { data, error } = await supabase
      .from("Posts")
      .insert([{
        Category: category,
        Title: title,
        Content: content,
        post_image:
          postImage ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        Post_Link,
        Post_Path,
      }])
      .select();

    if (error) {
      console.error("Error inserting post:", error.message, error.details, error.hint);
      return { data: [], error };
    }

    // quick sanity log (remove later)
    console.log("Created post with PDF:", {
      id: data?.[0]?.id,
      Post_Link: data?.[0]?.Post_Link,
      Post_Path: data?.[0]?.Post_Path,
    });

    return { data, error: null };
  } catch (e: any) {
    console.error("Unexpected error in postArticle:", e?.message || e);
    return { data: [], error: e };
  }
}


/**
 * Update an existing post.
 * Behavior:
 * - If pdfFile is provided: delete old file (if any) → upload new → set Post_Link & Post_Path.
 * - Else if pdfData is defined:
 *     - truthy string: set Post_Link to that URL, Post_Path parsed if from our bucket
 *     - "" or null: delete old file (if any) and clear both Post_Link & Post_Path
 * - Else (pdfData undefined): leave PDF fields unchanged.
 */
export async function updateArticle(
  id: number,
  category: string,
  content: string,
  title: string,
  imageData: string,
  pdfData?: string | null,  // explicit keep/set/clear
  pdfFile?: File            // new file to upload
) {
  try {
    const { data: existingPost, error: fetchError } = await supabase
      .from("Posts")
      .select("id, Post_Link, Post_Path")
      .eq("id", id)
      .single();
    if (fetchError || !existingPost) {
      return { data: null, error: { message: "Post not found or access denied" } };
    }

    const updateData: any = {
      Category: category,
      Content: content,
      Title: title,
      post_image: imageData,
      updated_at: new Date().toISOString(),
    };

    const currentPath =
      existingPost.Post_Path || storagePathFromPublicUrl(existingPost.Post_Link || "");

    if (pdfFile) {
      // delete old file (best effort)
     if (currentPath) {
  try {
    await deleteByPath(currentPath);
  } catch (e: any) {
    console.warn("Old PDF delete failed:", e?.message || e);
  }
}
      // upload fresh
      const { publicUrl, path } = await uploadPdfAndGetUrlAndPath(pdfFile, `${title || "post"}.pdf`);
      updateData.Post_Link = publicUrl;
      updateData.Post_Path = path;
    } else if (typeof pdfData !== "undefined") {
      if (pdfData) {
        // set to provided URL (must be a Supabase public URL to derive path)
        updateData.Post_Link = pdfData;
        updateData.Post_Path = storagePathFromPublicUrl(pdfData) || null;
      } else {
        // clear PDF: delete then null out
        if (currentPath) {
  try {
    await deleteByPath(currentPath);
  } catch (e: any) {
    console.warn("Old PDF delete failed:", e?.message || e);
  }
}
        updateData.Post_Link = null;
        updateData.Post_Path = null;
      }
    }

    const { data, error } = await supabase
      .from("Posts")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating article:", error.message, error.details, error.hint);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (e: any) {
    console.error("Unexpected error in updateArticle:", e?.message || e);
    return { data: null, error: e };
  }
}

export async function deletePost(id: number) {
  try {
    const { data: post, error: getErr } = await supabase
      .from("Posts")
      .select("Post_Link, Post_Path")
      .eq("id", id)
      .single();

    if (getErr) {
      console.error("deletePost: fetch row failed:", getErr.message || getErr);
      return { data: null, error: getErr };
    }

    const path =
      post?.Post_Path || storagePathFromPublicUrl(post?.Post_Link || "");

    console.log("deletePost: about to delete storage object", {
      Post_Link: post?.Post_Link,
      Post_Path: post?.Post_Path,
      derivedPath: path,
    });

    if (path) {
      try {
        const delRes = await deleteByPath(path);
        console.log("deletePost: storage delete result:", delRes);
      } catch (e: any) {
        // Keep going (don’t block DB delete), but log loudly
        console.error("deletePost: storage delete error:", e?.message || e);
      }
    } else {
      console.warn("deletePost: no path derived (nothing to delete in storage)");
    }

    const { data, error } = await supabase.from("Posts").delete().eq("id", id);
    if (error) {
      console.error("deletePost: DB delete error:", error.message, error.details, error.hint);
    }
    return { data, error };
  } catch (e: any) {
    console.error("Unexpected error in deletePost:", e?.message || e);
    return { data: null, error: e };
  }
}

