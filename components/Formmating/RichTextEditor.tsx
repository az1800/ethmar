import React, { useState, useRef, ChangeEvent } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image"; // Import Image extension
import MenuBar from "./MenuBar";
import AnimatedCategoryDropdown from "../AnimatedCategoryDropdown";
import { postArticle } from "../../Services/postsAPI";

// Define types
interface Category {
  id: number;
  name: string;
}

const TipTapEditor: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Category>({
    id: 1,
    name: "اختر الفئة",
  });
  const [message, setMessage] = useState<string>("");
  const [postImage, setPostImage] = useState<File | null>(null); // State for post image
  const [postImagePreview, setPostImagePreview] = useState<string>(""); // Preview for post image
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for file input

  // Initialize the Editor with Image extension
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Underline,
      Superscript,
      Subscript,
      Image, // Add Image extension
    ],
    content: `<h2 style="text-align:center" dir='rtl'>كيف تؤثر أسعار الفائدة على الأسواق المالية؟</h2>
  <p style="text-align:justify" dir='rtl'>
    تعد أسعار الفائدة من أهم الأدوات التي يستخدمها البنوك المركزية للتحكم في السياسة النقدية والتأثير على النمو الاقتصادي.
    عندما ترفع البنوك المركزية أسعار الفائدة، يصبح الاقتراض أكثر تكلفة مما يؤدي إلى تقليل الإنفاق الاستهلاكي والاستثماري،
    وبالتالي يؤثر ذلك على أداء الأسواق المالية.
  </p>

  <h3 style="text-align:right" dir='rtl'>💡 العلاقة بين أسعار الفائدة وسوق الأسهم</h3>
  <p style="text-align:justify" dir='rtl'>
    بشكل عام، تؤدي الزيادة في أسعار الفائدة إلى انخفاض أسعار الأسهم، حيث تصبح العوائد على الأدوات المالية ذات الدخل الثابت
    مثل السندات أكثر جاذبية، مما يدفع المستثمرين إلى تقليل استثماراتهم في الأسهم. على العكس، فإن تخفيض أسعار الفائدة
    يؤدي إلى تحفيز الاستثمارات وزيادة أسعار الأسهم.
  </p>

  <h3 style="text-align:right" dir='rtl'>📉 تأثير ارتفاع الفائدة على الشركات</h3>
  <p style="text-align:justify" dir='rtl'>
    تؤثر أسعار الفائدة المرتفعة على قدرة الشركات على تمويل مشاريعها بسبب زيادة تكلفة القروض.
    هذا يؤدي إلى انخفاض الأرباح المستقبلية، مما ينعكس على قيمة الأسهم في الأسواق.
  </p>

  <h3 style="text-align:right" dir='rtl'>📊 الأسواق المالية العالمية والاستجابة لأسعار الفائدة</h3>
  <p style="text-align:justify" dir='rtl'>
    يعتمد تأثير أسعار الفائدة على الأسواق العالمية على عدة عوامل مثل التضخم، مستويات النمو الاقتصادي، واستراتيجيات
    البنوك المركزية الأخرى. على سبيل المثال، عندما يرفع الفيدرالي الأمريكي أسعار الفائدة، فإن ذلك قد يؤدي إلى
    تقلبات حادة في الأسواق الناشئة بسبب تدفق رؤوس الأموال إلى الأصول الأمريكية ذات العوائد المرتفعة.
  </p>

  <blockquote style="text-align:center; font-style:italic; color:gray;" dir='rtl'>
    "تظل أسعار الفائدة واحدة من أقوى الأدوات الاقتصادية التي تؤثر على جميع الأسواق المالية."
  </blockquote>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  // Convert File to base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle post image selection
  const handlePostImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPostImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPostImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add image to editor
  const addImageToEditor = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image upload for the editor content
  const handleEditorImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && editor) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Insert image at current cursor position
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string, alt: file.name })
            .run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate post link
  const generatePostLink = (id: number): string => {
    return `/Post?id=${id}`;
  };

  // 📝 Handle Post Submission
  async function handleSubmit() {
    if (!editor) return;

    if (!title.trim()) {
      setMessage("⚠️ يرجى كتابة العنوان قبل الإرسال.");
      return;
    }
    if (!editor.getHTML().trim()) {
      setMessage("⚠️ يرجى كتابة المحتوى قبل الإرسال.");
      return;
    }
    if (category.name === "اختر الفئة") {
      setMessage("⚠️ يرجى اختيار فئة للمقال.");
      return;
    }
    if (!postImage) {
      setMessage("⚠️ يرجى إضافة صورة للمقال.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const content = editor.getHTML();

      // Convert image to base64 for Supabase storage
      const imageBase64 = await fileToBase64(postImage);

      // Use the existing postArticle function with the converted image
      const response = await postArticle(
        category.name,
        content,
        title,
        imageBase64
      );

      if (response.error) {
        setMessage("❌ فشل الإرسال، يرجى المحاولة لاحقًا.");
      } else {
        // Get the inserted post ID
        const insertedId =
          response.data && response.data[0] ? response.data[0].id : null;

        // If we have an ID, we could update the Post_Link with the proper link
        if (insertedId) {
          // You might want to update the post with the real link here
          // For now we just show a success message
          setMessage(`✅ تم نشر المقال بنجاح! الرابط:`);
        } else {
          setMessage("✅ تم نشر المقال بنجاح!");
        }

        // Reset form
        setTitle("");
        editor.commands.clearContent(true);
        setCategory({ id: 1, name: "اختر الفئة" });
        setPostImage(null);
        setPostImagePreview("");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setMessage("❌ حدث خطأ أثناء الإرسال.");
    }

    setLoading(false);
  }

  // Enhanced MenuBar with Image button
  const EnhancedMenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div
        className="flex flex-wrap gap-2 p-2 mb-4 bg-gray-100 rounded-lg"
        dir="rtl"
      >
        {/* Original MenuBar components */}
        <MenuBar editor={editor} />

        {/* Add Image button */}
        <button
          onClick={addImageToEditor}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded"
          title="إضافة صورة"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>

        {/* Hidden file input for editor images */}
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

  return (
    <div className="max-w-4xl mx-auto mb-44 mt-10 p-6 bg-white shadow-xl rounded-xl">
      {/* Enhanced Toolbar with Image button */}
      <EnhancedMenuBar editor={editor} />

      {/* Title & Editor Input */}
      <div dir="rtl" className="flex flex-col gap-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="اكتب العنوان"
          className="border border-gray-300 text-xl rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#164B20]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Post Featured Image Input */}
        <div className="border border-dashed border-gray-300 rounded-md p-3">
          <label className="block text-gray-700 mb-2">
            صورة المقال الرئيسية
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handlePostImageChange}
              className="text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-[#164B20] file:text-white
                hover:file:bg-[#126018]"
            />
            {postImagePreview && (
              <div className="w-16 h-16 relative">
                <img
                  src={postImagePreview}
                  alt="معاينة صورة المقال"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <EditorContent
          editor={editor}
          className="p-4 min-h-[300px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164B20] transition-all duration-200"
        />
      </div>

      {/* Category Dropdown & Submit Button */}
      <div className="flex flex-row-reverse items-center gap-3 mt-4 w-full">
        {/* Category Dropdown (1 Portion) */}
        <div className="w-[30%]">
          <AnimatedCategoryDropdown
            selectedCategory={category}
            setCategory={setCategory}
          />
        </div>

        {/* Submit Button (2 Portions) */}
        <button
          className="bg-[#164B20] rounded-md w-[70%] h-[2rem] text-white font-semibold transition-all hover:bg-[#126018] disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={loading}
          type="button"
        >
          {loading ? "جاري الإرسال..." : "ارسال"}
        </button>
      </div>

      {/* Submission Message */}
      {message && (
        <p
          dir="rtl"
          className={`text-center mt-3 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TipTapEditor;
