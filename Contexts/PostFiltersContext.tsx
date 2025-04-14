"use client";
import { createContext, useContext, useState } from "react";

type PostFiltersContextType = {
  activeFilter: number | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<number | null>>;
};

const PostFiltersContext = createContext<PostFiltersContextType | undefined>(
  undefined
);

export function PostFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  return (
    <PostFiltersContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </PostFiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(PostFiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a PostFiltersProvider");
  }
  return context;
}
