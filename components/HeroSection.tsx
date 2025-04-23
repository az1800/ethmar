"use client";
import React from "react";
import Header from "./Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../Services/postsAPI";

// Types
type Post = {
  id: number;
  Category: string | null;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link: string;
};

type HeroProps = {
  type: "post" | "title";
  title?: string;
  content?: string;
  fetchPostCategory?: string;
  defaultImage?: string;
  categoryLabel?: string;
  readMoreLabel?: string;
};

export default function HeroSection({
  type = "title",
  title,
  content,
  fetchPostCategory = "منشور مميز",
  defaultImage = "/placeholder.png",
  categoryLabel,
  readMoreLabel = "اقرأ المزيد",
}: HeroProps) {
  const [featuredPost, setFeaturedPost] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch posts if type is "post"
    if (type === "post") {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await getPosts(fetchPostCategory);
          if (error) {
            console.error(error + " this is error");
          } else {
            setFeaturedPost(data);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [type, fetchPostCategory]);

  // Helper functions for post content
  function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

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

  // For post type: extract current post
  const displayPost =
    type === "post" && featuredPost.length > 0 ? featuredPost[0] : null;

  // For post type: process the content
  const displayContent = displayPost?.Content
    ? truncateContent(stripHtml(displayPost.Content), 300)
    : "No content available";

  return (
    <div className="flex flex-col bg-gradient-to-r from-emerald-700 to-green-900 overflow-hidden min-h-[60vh] lg:h-[60vh] md:h-[60vh] sm:min-h-[60vh]">
      <Header />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjEwem0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMC02aC0yVjZoMnYxMHoiLz48L2c+PC9zdmc+')]"></div>

      {type === "post" ? (
        <div className=" container m-auto px-6  flex items-center">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full">
            {/* If a direct post object is provided, use it, otherwise use the fetched post */}
            {displayPost && (
              <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-12">
                {/* Image part - shown on the left in desktop */}
                <div className="lg:w-1/3">
                  <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105">
                    <img
                      src={displayPost.post_image || defaultImage}
                      alt={displayPost.Title || "صورة المنشور"}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="lg:w-1/2 text-right space-y-5">
                  {/* Category */}
                  <p className="text-sm text-emerald-200 tracking-wider uppercase">
                    {displayPost.Category || categoryLabel || "منشور مميز"}
                  </p>

                  {/* Title */}
                  <h1
                    className="text-4xl font-bold font-arabic text-white leading-snug"
                    dir="rtl"
                  >
                    {displayPost.Title || "عنوان المنشور"}
                  </h1>

                  {/* Content */}
                  <p
                    className="text-lg text-white/90 leading-relaxed font-arabic"
                    dir="rtl"
                  >
                    {displayContent}
                  </p>

                  {/* Read more button */}
                  <Link href={`/Post?id=${displayPost.id}`}>
                    <button
                      type="button"
                      className="px-6 py-2 my-9 bg-white text-green-900 rounded-md font-semibold hover:bg-emerald-100 transition-all duration-300 shadow-md"
                    >
                      {readMoreLabel}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container m-auto px-6 flex items-center">
          <div className="max-w-3xl m-auto text-center ">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-8 font-arabic"
              dir="rtl"
            >
              {title}
            </h1>
            <p
              className="text-xl md:text-2xl text-white/90 leading-relaxed font-arabic"
              dir="rtl"
            >
              {content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
