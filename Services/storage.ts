// Services/storage.ts
import supabase from "./supabase";

const BUCKET = "post-pdfs";


function assertEnv(name: string, val: any) {
  if (!val) throw new Error(`Missing env: ${name}`);
}

/**
 * Upload a PDF file to Supabase Storage and return both:
 *  - publicUrl → public link (for viewing)
 *  - path      → internal key (for deletion)
 */
export async function uploadPdfAndGetUrlAndPath(
  file: File,
  fileNameHint = "post.pdf"
): Promise<{ publicUrl: string; path: string }> {
  try {
    if (!file) throw new Error("No file provided");
    if (file.type !== "application/pdf") throw new Error("Only PDF files are allowed");

    // Sanity check for client-safe NEXT_PUBLIC keys
    assertEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
    assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Sanitize filename
    const safeName = (fileNameHint || "post.pdf")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    // Unique key: timestamp + random suffix
    const uniquePrefix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const objectKey = `pdfs/${uniquePrefix}-${safeName}`;

    // Upload file — no overwrites allowed
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(objectKey, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Supabase upload failed: ${uploadError.message || JSON.stringify(uploadError)}`);
    }


    // Get the public URL
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectKey);
    const publicUrl = data?.publicUrl;
    if (!publicUrl) throw new Error("Could not obtain public URL from Supabase");

    return { publicUrl, path: objectKey };
  } catch (e: any) {
    const msg = e?.message || e?.error_description || e?.error || JSON.stringify(e);
    throw new Error(msg);
  }
}

/**
 * Delete a file by path from Supabase Storage
 */
export async function deleteByPath(path?: string | null) {
  if (!path) throw new Error("deleteByPath: empty path");

  // robust normalization
  const normalized = decodeURIComponent(path).trim().replace(/^\/+/, ""); // no leading slash

  // attempt #1
  let { data, error } = await supabase.storage.from("post-pdfs").remove([normalized]);
  if (!error && data && data.length > 0) return data;

  // (Optional) attempt #2: in case a stray "public/" or bucket prefix slipped in
  // e.g., someone stored "storage/v1/object/public/post-pdfs/posts/..." by mistake
  const maybeKeyOnly = normalized
    .replace(/^storage\/v1\/object\/public\/post-pdfs\//, "")
    .replace(/^post-pdfs\//, "");

  if (maybeKeyOnly !== normalized) {
    const res = await supabase.storage.from("post-pdfs").remove([maybeKeyOnly]);
    if (!res.error && res.data && res.data.length > 0) return res.data;
  }

  // If we reach here, nothing was deleted — surface it for debugging
  throw new Error(`Storage delete found no object at: "${normalized}"`);
}


/**
 * Convert a Supabase public URL to its internal storage path.
 * Example:
 *   https://xyz.supabase.co/storage/v1/object/public/post-pdfs/posts/1234-myfile.pdf
 * → posts/1234-myfile.pdf
 */
export function storagePathFromPublicUrl(publicUrl: string, bucket = BUCKET): string | null {
  if (!publicUrl) return null;
  try {
    const trimmed = publicUrl.trim();
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = trimmed.indexOf(marker);
    if (idx === -1) return null; // not a valid URL for this bucket
    return trimmed.slice(idx + marker.length);
  } catch {
    return null;
  }
}
