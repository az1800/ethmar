"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import dummypic from "../Assets/image copy.png";
import { getPosts } from "../Services/postsAPI";
import Link from "next/link";

type Post = {
  id: number;
  Category: string | null;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link: string;
};

export default function HeroSection() {
  const [featuredPost, setFeaturedPost] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await getPosts("منشور مميز");

        if (error) {
          console.error(error + " this is error");
        } else {
          setFeaturedPost(data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPost();
  }, []);

  const post = featuredPost.length > 0 ? featuredPost[0] : null;
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
  const displayContent = post?.Content
    ? truncateContent(stripHtml(post.Content), 300)
    : "No content available";
  return (
    <div className="bg-gradient-to-r from-[rgb(31,104,44,90)] to-[#164B20] text-white min-h-[70vh]">
      <Header />

      {/* Main Content */}
      {post && (
        <div className="flex flex-col lg:flex-row md:flex-col justify-between items-start py-4 px-6 md:py-7 md:px-14">
          <img
            src={post ? post.post_image : dummypic.src}
            alt="رجل يعمل على الحاسوب"
            className="w-[32.1875rem] h-[22.4375rem] object-cover rounded lg:mx-0 sm:block sm:mx-auto"
            height={200}
            width={200}
          />
          <div className="max-w-xl text-right sm:mx-auto lg:mx-0">
            <p className="mb-8">{post ? post.Category : "التصنيف غير متوفر"}</p>
            <h1 className="text-3xl font-bold mb-8">
              {post ? post.Title : "عنوان غير متوفر"}
            </h1>

            <p className="mb-8" dir="rtl">
              {post ? displayContent : "المحتوى غير متوفر"}
            </p>
            {post && (
              <Link href={`/Post?id=${post.id}`}>
                <button
                  type="button"
                  className="inline-block w-[175px] px-[45px] py-[16px] text-center rounded-lg bg-black text-white"
                >
                  &lt; اقرأ المزيد
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
