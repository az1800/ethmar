import Image from "next/image";
import React from "react";
import Link from "next/link";

type PostProps = {
  id: number;
  Category: string;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link: string;
};

export default function PostCards({ post }: { post: PostProps }) {
  // Enhanced HTML stripper
  function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

  // Truncate by character count instead of words
  function truncateContent(text: string, maxLength: number): string {
    if (!text) return "";

    // Clean up any excessive whitespace
    const cleanText = text.replace(/\s+/g, " ").trim();

    if (cleanText.length <= maxLength) return cleanText;

    // Cut at maxLength and try to find a space to break at
    const truncated = cleanText.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > maxLength * 0.8) {
      // If we can find a space in the last 20% of the text, break there
      return truncated.substring(0, lastSpaceIndex) + "...";
    }

    // Otherwise just break at maxLength
    return truncated + "...";
  }

  // Process the content - use a longer length to accommodate multiple lines
  const displayContent = post.Content
    ? truncateContent(stripHtml(post.Content), 300)
    : "No content available";

  return (
    <div className="flex flex-col-reverse md:flex-row w-full md:w-[80%] gap-4 md:gap-8 items-center md:justify-end">
      <div className="flex flex-col text-center md:text-right w-[60%] md:w-[55%] gap-2">
        <p className="text-sm md:text-base" dir="rtl">
          {post.Category}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold" dir="rtl">
          {post.Title}
        </h1>
        <p
          className="text-sm md:text-base line-clamp-3"
          dir="rtl"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            whiteSpace: "pre-line",
          }}
        >
          {displayContent}
        </p>
        <Link
          href={`/Post?id=${post.id}`}
          className="text-[#0000EE] text-sm md:text-base"
        >
          اقرأ المزيد
        </Link>
      </div>
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <img
          src={post.post_image}
          className="w-[16rem] h-[12rem] sm:w-[20rem] sm:h-[15rem] object-cover"
          alt={post.Title || "Post image"}
          height={200}
          width={250}
        />
      </div>
    </div>
  );
}
