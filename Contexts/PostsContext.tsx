"use client";

import React, { createContext, useContext, useState } from "react";
// Define the type for the context state
interface PostsContextType {
  postsLength: number | null;
  setPostsLength: (length: number | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
  setPostsPerPage: (count: number) => void;
}

// Create the context with default values
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Provider component
export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [postsLength, setPostsLength] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(4);

  return (
    <PostsContext.Provider
      value={{
        postsLength,
        setPostsLength,
        currentPage,
        setCurrentPage,
        postsPerPage,
        setPostsPerPage,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the context
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
