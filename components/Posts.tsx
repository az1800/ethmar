"use client";
import React, { useEffect, useState, Suspense } from "react";
import PostCards from "./PostCards";
import PostsFilters from "./PostsFilters";
import { FaFilter } from "react-icons/fa";
import { useFilters } from "../Contexts/PostFiltersContext";
import { getPosts } from "../Services/postsAPI";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Filter from "./Filter";
import { FilterButton } from "./FilterButton";

type Post = {
  id: number;
  Category: string;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link: string;
};

// Inner component that uses hooks requiring suspense
function PostsContent() {
  const { activeFilter, setActiveFilter } = useFilters();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Pagination states
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || "1");
  const itemsPerPage = 3; // Adjust as needed

  // Mapping frontend filter IDs to Supabase `Category` values
  const categories = [
    { id: 1, name: "الجميع", supabaseCategory: null }, // Fetch all posts
    { id: 2, name: "تحليل القطاعات", supabaseCategory: "تحليل القطاعات" },
    { id: 3, name: "البحوث المالية", supabaseCategory: "البحوث المالية" },
    { id: 4, name: "التحليل المالي", supabaseCategory: "التحليل المالي" },
    { id: 5, name: "قصة سهم", supabaseCategory: "قصة سهم" },
    { id: 6, name: "المصطلحات المالية", supabaseCategory: "المصطلحات المالية" },
    {
      id: 7,
      name: "مختارات إثمار المالية",
      supabaseCategory: "مختارات إثمار المالية",
    },
  ];

  // Handler for page changes
  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object with current params
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    async function fetchAllPosts() {
      setLoading(true);
      try {
        const selectedCategory = categories.find((c) => c.id === activeFilter);

        const response = await getPosts(selectedCategory?.supabaseCategory);
        const postsData = response.data || [];

        // Ensure `allPosts` is always an array
        const allPostsData = Array.isArray(postsData) ? postsData : [];
        setAllPosts(allPostsData);
        setTotalPosts(allPostsData.length);

        // ✅ Reset pagination by updating the URL to page 1 when category changes
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPosts();
  }, [activeFilter]); // Runs when category changes

  // Separate effect for paginating posts when `currentPage` changes
  useEffect(() => {
    // Slice posts based on currentPage AFTER allPosts is updated
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    setPosts(paginatedPosts);
  }, [currentPage, allPosts]); // Runs when page or posts list changes

  if (loading) return <Loader />;

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  return (
    <div className="flex flex-col justify-end items-end m-8">
      <b className="flex flex-row justify-between w-full lg:justify-end ">
        <FilterButton
          className="inline-block lg:hidden "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <h1 className="text-4xl mb-8">جميع المنشورات</h1>
      </b>
      {isOpen && (
        <div className="flex flex-col text-center space-y-4 md:flex lg:hidden bg-white w-full py-4 shadow-md">
          {categories.map((filter) => (
            <Filter
              key={filter.id}
              name={filter.name}
              isActive={activeFilter === filter.id}
              onClick={() => {
                setIsOpen(!open);
                setActiveFilter(filter.id);
              }}
            />
          ))}
        </div>
      )}
      <div className="flex flex-row w-[100%] justify-between">
        <div className="hidden lg:flex md:hidden sm:hidden flex-col gap-6">
          <PostsFilters />
        </div>

        <div className="flex flex-col gap-8 items-end w-full">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCards key={post.id} post={post} />
              ))}
              <div className="flex-grow"></div>
              {/* Pagination Component */}
              <div className="w-[95%] mt-[-2rem]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalPosts}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  primaryColor="#164B20"
                />
              </div>
            </>
          ) : (
            <div className="w-full text-center py-10">
              <p className="text-3xl text-gray-500">لا توجد منشورات</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main component that provides the Suspense boundary
export default function Posts() {
  return (
    <Suspense fallback={<Loader />}>
      <PostsContent />
    </Suspense>
  );
}
