"use client";
import React, { useEffect, useState, Suspense } from "react";
import { getPostById } from "../Services/postsAPI";
import { useSearchParams } from "next/navigation";
import Loader from "./Loader";

// Define a type for your post data
type PostData = {
  id: number;
  Category: string;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link: string;
};

// Create a separate component that uses useSearchParams
function PostContent() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPostById(id: number) {
      setLoading(true);
      try {
        const response = await getPostById(id);
        if (response.data && response.data.length > 0) {
          setPost(response.data[0]);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    // Only fetch if we have a valid ID
    if (postId) {
      fetchPostById(parseInt(postId));
    } else {
      setError("No post ID provided");
      setLoading(false);
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="p-8 text-xl text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="p-8 text-xl text-center">Post not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 my-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured Image */}
        {post.post_image && (
          <div className="w-full h-[400px] relative p-4 rounded-md">
            <img
              src={post.post_image}
              alt={post.Title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Card */}
        <div className="p-6 md:p-8">
          {/* Category Badge */}
          <div className="mb-4" dir="rtl">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold">
              {post.Category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            dir="rtl"
          >
            {post.Title}
          </h1>

          {/* Content */}
          <div
            className="prose max-w-none prose-lg prose-headings:text-right prose-p:text-right"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: post.Content }}
          />
        </div>
      </div>
    </div>
  );
}

// Main component that wraps PostContent in Suspense
export default function PostBody() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      }
    >
      <PostContent />
    </Suspense>
  );
}
