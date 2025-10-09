import supabase from "@/Services/supabase";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { useRouter, useSearchParams } from "next/navigation";
import MenuBar from "./MenuBar";
import AnimatedCategoryDropdown from "../AnimatedCategoryDropdown";
// ⬇️ use relative import to avoid alias issues
import { uploadPdfAndGetUrlAndPath } from "../../Services/storage";
import {
  postArticle,
  updateArticle,
  getPostById,
} from "../../Services/postsAPI";
import { useNotification } from "../Notification";

// Types
interface Category {
  id: number;
  name: string;
}

interface Article {
  id: number;
  Category: string;
  Title: string;
  Content: string;
  post_image: string;
  Post_Link?: string | null;
  created_at: string;
}

const TipTapEditor: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>({ id: 1, name: "اختر الفئة" });
  const [message, setMessage] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postImagePreview, setPostImagePreview] = useState("");
  const [postPdf, setPostPdf] = useState<File | null>(null);
  const [postPdfData, setPostPdfData] = useState("");
  const [postPdfName, setPostPdfName] = useState("");
  const [fetchingArticle, setFetchingArticle] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Underline,
      Superscript,
      Subscript,
      Image,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  // Load article for edit mode
  useEffect(() => {
    if (isEditMode && editId) {
      fetchArticleData(parseInt(editId, 10));
    }
  }, [isEditMode, editId, editor]);

  const fetchArticleData = async (id: number) => {
    setFetchingArticle(true);
    try {
      const { data, error } = await getPostById(id);
      if (error || !data || data.length === 0) {
        showNotification({ type: "error", message: "❌ فشل في جلب بيانات المقال" });
        console.error("Error fetching article:", error);
        return;
      }
      const article = data[0] as Article;

      setTitle(article.Title);
      setCategory({ id: getCategoryId(article.Category), name: article.Category });

      if (editor) editor.commands.setContent(article.Content);
      if (article.post_image) setPostImagePreview(article.post_image);

      if (article.Post_Link) {
        setPostPdfData(article.Post_Link);
        setPostPdfName("الملف الحالي.pdf");
        setPostPdf(null);
        if (pdfInputRef.current) pdfInputRef.current.value = "";
      } else {
        setPostPdfData("");
        setPostPdfName("");
        setPostPdf(null);
        if (pdfInputRef.current) pdfInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error in fetchArticleData:", err);
      showNotification({ type: "error", message: "❌ فشل في جلب بيانات المقال" });
    } finally {
      setFetchingArticle(false);
    }
  };

  const getCategoryId = (name: string): number => {
    const map: Record<string, number> = {
      "تحليل القطاعات": 2,
      "البحوث المالية": 3,
      "التحليل المالي": 4,
      "قصة سهم": 5,
      "المصطلحات المالية": 6,
      "مختارات إثراء المالية": 7,
      "منشور مميز": 8,
    };
    return map[name] ?? 1;
  };

  // Image preview (keep base64 for images only)
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
    });

  // ✅ Properly closed image handler
  const handlePostImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setPostImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); // required for image preview
    }
  }; // ← closes here

  const handlePostPdfChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const file = files[0];

  // basic validation
  if (file.type !== "application/pdf") {
    showNotification({
      type: "warning",
      message: "⚠️ يرجى إرفاق ملف بصيغة PDF فقط.",
    });
    // clear the input
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    return;
  }

  try {
    // optional: see which role is used (null = anon, uuid = authenticated)
    const { data } = await supabase.auth.getUser();
    console.log("Upload user:", data?.user?.id || null);

    // upload and get both url + path (we only need publicUrl here)
    const { publicUrl } = await uploadPdfAndGetUrlAndPath(file, file.name);

    // update UI state (store URL; backend will derive path if needed)
    setPostPdf(null);
    setPostPdfName(file.name);
    setPostPdfData(publicUrl);

    showNotification({ type: "success", message: "✅ تم رفع ملف PDF بنجاح." });
  } catch (err) {
    console.error("PDF upload failed:", err);
    showNotification({ type: "error", message: "❌ فشل رفع ملف PDF." });

    // reset UI
    setPostPdf(null);
    setPostPdfName("");
    setPostPdfData("");
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  }
};

  const addImageToEditor = () => fileInputRef.current?.click();

  const handleEditorImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && editor) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          editor.chain().focus().setImage({ src: reader.result as string, alt: file.name }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    if (!editor) return false;
    if (!title.trim()) {
      showNotification({ type: "warning", message: "⚠️ يرجى كتابة العنوان قبل الإرسال." });
      return false;
    }
    if (!editor.getHTML().trim()) {
      showNotification({ type: "warning", message: "⚠️ يرجى كتابة المحتوى قبل الإرسال." });
      return false;
    }
    if (category.name === "اختر الفئة") {
      showNotification({ type: "warning", message: "⚠️ يرجى اختيار فئة للمقال." });
      return false;
    }
    if (!isEditMode && !postImage && !postImagePreview) {
      showNotification({ type: "warning", message: "⚠️ يرجى إضافة صورة للمقال." });
      return false;
    }
    return true;
  };

  async function handleSubmit() {
    if (!editor || !validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const content = editor.getHTML();
      let imageData = postImagePreview;
      let pdfData = postPdfData;

      if (postImage) {
        imageData = await fileToBase64(postImage); // images only
      }

      if (isEditMode && editId) {
        const response = await updateArticle(
          parseInt(editId, 10),
          category.name,
          content,
          title,
          imageData,
          pdfData
        );
        if (response.error) {
          showNotification({ type: "error", message: "❌ فشل التحديث، يرجى المحاولة لاحقًا." });
          console.error("Update error:", response.error);
        } else {
          showNotification({ type: "success", message: "✅ تم تحديث المقال بنجاح!" });
          setTimeout(() => router.push("/adminDashboard"), 1500);
        }
      } else {
        const response = await postArticle(category.name, content, title, imageData, pdfData);
        if (response.error) {
          showNotification({ type: "error", message: "❌ فشل الإرسال، يرجى المحاولة لاحقًا." });
          console.error("Create error:", response.error);
        } else {
          showNotification({ type: "success", message: "✅ تم نشر المقال بنجاح!" });
          setTitle("");
          editor.commands.clearContent(true);
          setCategory({ id: 1, name: "اختر الفئة" });
          setPostImage(null);
          setPostImagePreview("");
          setPostPdf(null);
          setPostPdfData("");
          if (pdfInputRef.current) pdfInputRef.current.value = "";
          setPostPdfName("");
          setTimeout(() => router.push("/blog"), 1500);
        }
      }
    } catch (err) {
      console.error("Error submitting post:", err);
      showNotification({ type: "error", message: "❌ حدث خطأ أثناء الإرسال." });
    }

    setLoading(false);
  }

  const EnhancedMenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    if (!editor) return null;
    return (
      <div className="flex flex-wrap gap-2 p-2 mb-4 bg-gray-100 rounded-lg" dir="rtl">
        <MenuBar editor={editor} />
        <button
          onClick={addImageToEditor}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded"
          title="إضافة صورة"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleEditorImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    );
  };

  if (fetchingArticle) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-xl flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#164B20]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-44 mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-right text-[#164B20]" dir="rtl">
        {isEditMode ? "تعديل المقال" : "إنشاء مقال جديد"}
      </h1>

      <EnhancedMenuBar editor={editor} />

      <div dir="rtl" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="اكتب العنوان"
          className="border border-gray-300 text-xl rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#164B20]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="border border-dashed border-gray-300 rounded-md p-3">
          <label className="block text-gray-700 mb-2">صورة المقال الرئيسية</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handlePostImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#164B20] file:text-white hover:file:bg-[#126018]"
            />
            {postImagePreview && (
              <div className="w-16 h-16 relative">
                <img src={postImagePreview} alt="معاينة صورة المقال" className="w-full h-full object-cover rounded" />
                <button
                  type="button"
                  onClick={() => setPostImagePreview("")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="حذف الصورة"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border border-dashed border-gray-300 rounded-md p-3">
          <label className="block text-gray-700 mb-2">ملف PDF مرفق (اختياري)</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#164B20] rounded-md transition-colors hover:bg-[#126018]"
            >
              إرفاق PDF
            </button>
            {(postPdfName || postPdfData) && (
              <div className="flex items-center gap-2 max-w-[16rem]">
                <span className="text-sm text-gray-600 truncate" title={postPdfName || "الملف الحالي.pdf"}>
                  {postPdfName || "الملف الحالي.pdf"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPostPdf(null);
                    setPostPdfData("");
                    setPostPdfName("");
                    if (pdfInputRef.current) pdfInputRef.current.value = "";
                  }}
                  className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  title="حذف الملف"
                >
                  ×
                </button>
              </div>
            )}
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePostPdfChange}
              className="hidden"
            />
          </div>
        </div>

        <EditorContent
          editor={editor}
          className="p-4 min-h-[300px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164B20] transition-all duration-200"
        />
      </div>

      <div className="flex flex-row-reverse items-center gap-3 mt-4 w-full">
        <div className="w-[30%]">
          <AnimatedCategoryDropdown selectedCategory={category} setCategory={setCategory} />
        </div>

        <button
          className="bg-[#164B20] rounded-md w-[70%] h-[2rem] text-white font-semibold transition-all hover:bg-[#126018] disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={loading}
          type="button"
        >
          {loading ? "جاري الإرسال..." : isEditMode ? "تحديث المقال" : "نشر المقال"}
        </button>
      </div>

      {isEditMode && (
        <div className="mt-3 text-center">
          <button
            className="text-gray-600 hover:text-gray-800 underline"
            onClick={() => router.push("/article-management")}
            type="button"
          >
            إلغاء التعديل والعودة
          </button>
        </div>
      )}

      {message && (
        <p dir="rtl" className={`text-center mt-3 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default TipTapEditor;
