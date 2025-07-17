import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
} from "lucide-react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { getPosts, deletePost, getPostsDashboard } from "@/Services/postsAPI"; // Adjust the import based on your project structure
import Loader from "../Loader";
import { useNotification } from "../Notification";

// Define types for the article structure
interface Article {
  id: number;
  Category: string;
  Title: string;
  Content: string;
  post_image: string;
  created_at: string;
}

interface ApiResponse {
  data: Article[] | null;
  error: any;
}

// Mock function to replace the getPosts function from your API
const fetchPosts = async (
  category: string | null = null
): Promise<ApiResponse> => {
  try {
    const { data, error } = await getPostsDashboard(category);

    return { data, error };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { data: [], error };
  }
};

// Helper function to strip HTML tags for preview
const stripHtml = (html: string): string => {
  if (typeof window !== "undefined") {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  // Simple fallback for server-side rendering
  return html.replace(/<[^>]*>?/gm, "");
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ar-SA", options);
};

interface ArticleCardProps {
  article: Article;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

// Article card component
const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onEdit,
  onDelete,
  onView,
}) => {
  // Get a preview of the content (first 150 characters without HTML)
  const contentPreview = stripHtml(article.Content).substring(0, 150) + "...";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        {article.post_image ? (
          <img
            src={article.post_image}
            alt={article.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {article.Category}
          </span>
        </div>
      </div>

      <div className="p-4" dir="rtl">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate">
          {article.Title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {contentPreview}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>{formatDate(article.created_at)}</span>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onEdit(article.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="تعديل"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onView(article.id)}
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="عرض"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onDelete(article.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component for article management
const ArticleManagement: React.FC = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const { showNotification } = useNotification();
  // Categories based on your previous code
  const categories: string[] = [
    "الكل",
    "تحليل القطاعات",
    "البحوث المالية",
    "التحليل المالي",
    "قصة سهم",
    "المصطلحات المالية",
    "مختارات إثمار المالية",
    "منشور مميز",
  ];

  useEffect(() => {
    // Load articles when component mounts
    loadArticles();
  }, [selectedCategory]);

  const loadArticles = async (): Promise<void> => {
    setLoading(true);
    try {
      const categoryToFetch =
        selectedCategory === "الكل" ? null : selectedCategory;
      const response = await fetchPosts(categoryToFetch);

      if (response.error) {
        console.error("Error loading articles:", response.error);
      } else {
        setArticles(response.data || []);
      }
    } catch (error) {
      console.error("Failed to load articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number): void => {
    router.push(`/blog-write?edit=${id}`);
  };

  const handleView = (id: number): void => {
    router.push(`/Post?id=${id}`);
  };

  const handleDelete = (id: number): void => {
    setConfirmDelete(id);
  };

  const confirmDeleteArticle = async (): Promise<void> => {
    if (!confirmDelete) return;

    try {
      const { error } = await deletePost(confirmDelete);
      if (error) {
        console.error("Failed to delete post:", error.message);
        // Optionally show a toast or error message here
      } else {
        setArticles(articles.filter((article) => article.id !== confirmDelete));
      }
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
    } finally {
      setConfirmDelete(null);
      showNotification({
        message: "!تم حذف المقال بنجاح",
        type: "success",
      });
    }
  };

  // Filter articles based on search term
  const filteredArticles: Article[] = articles.filter(
    (article) =>
      article.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.Category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return <Loader />;
  }
  return (
    // <div className="max-w-7xl mx-auto px-4 py-8">
    <div className=" mx-auto ">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          إدارة المقالات
        </h1>
        <button
          onClick={() => router.push("/blog-write")}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} className="ml-2" />
          <span>إضافة مقال جديد</span>
        </button>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
          <BookOpen
            size={64}
            className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
          />
          <p className="text-lg text-gray-500 dark:text-gray-400" dir="rtl">
            لا توجد مقالات متاحة حالياً
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            dir="rtl"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              هل أنت متأكد من رغبتك في حذف هذا المقال؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDeleteArticle}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManagement;
