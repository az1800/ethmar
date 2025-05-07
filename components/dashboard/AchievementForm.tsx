"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2, Camera } from "lucide-react";
import ImageUploader from "./ImageUploader";
// import { Achievement } from "./types";
import { Achievement, FormData, AchievementFormProps } from "./types";

// Unify the FormData interface to be consistent across components
// export interface FormData {
//   title: string;
//   description: string;
//   date: string;
//   image_url?: string | null;
//   icon?: string;
// }

// interface AchievementFormProps {
//   editingAchievement: Achievement | null;
//   onSubmit: (data: FormData) => Promise<void>;
//   onCancel: () => void;
//   loading: boolean;
// }

export default function AchievementForm({
  editingAchievement,
  onSubmit,
  onCancel,
  loading,
}: AchievementFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Reset form when switching from edit mode to add mode
  useEffect(() => {
    if (!editingAchievement) {
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setImagePreview(null);
      setIsDirty(false);
    }
  }, [editingAchievement]);

  // Set form values when editing an achievement
  useEffect(() => {
    if (editingAchievement) {
      setFormData({
        title: editingAchievement.title,
        description: editingAchievement.description || "",
        date:
          editingAchievement.date?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        icon: editingAchievement.icon,
      });
      setImagePreview(editingAchievement.image_url || null);
      setIsDirty(false);
    }
  }, [editingAchievement]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "هذا الحقل مطلوب";
    } else if (formData.title.length > 100) {
      newErrors.title = "العنوان طويل جدًا (الحد الأقصى 100 حرف)";
    }

    if (!formData.description.trim()) {
      newErrors.description = "هذا الحقل مطلوب";
    }

    if (!formData.date) {
      newErrors.date = "هذا الحقل مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const dataToSubmit: FormData = {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          image_url: imagePreview || undefined,
          icon: formData.icon,
        };

        await onSubmit(dataToSubmit);
      } catch (err) {
        console.error("Error submitting form:", err);
        setErrors((prev) => ({
          ...prev,
          submit: "حدث خطأ أثناء حفظ الإنجاز. يرجى المحاولة مرة أخرى.",
        }));
      }
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (
        window.confirm(
          "هل أنت متأكد من رغبتك في الإلغاء؟ ستفقد جميع التغييرات."
        )
      ) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6" dir="rtl">
        <button
          onClick={handleCancel}
          className="p-2 mr-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="العودة"
          type="button"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {editingAchievement ? "تعديل الإنجاز" : "إضافة إنجاز جديد"}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all">
        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
            >
              عنوان الإنجاز<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-green-600"
              } rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
              placeholder="أدخل عنوان الإنجاز"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <span
                id="title-error"
                className="text-red-500 text-sm block mt-1"
              >
                {errors.title}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
            >
              وصف الإنجاز<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-green-600"
              } rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
              placeholder="أدخل وصف الإنجاز"
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <span
                id="description-error"
                className="text-red-500 text-sm block mt-1"
              >
                {errors.description}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
            >
              تاريخ الإنجاز<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.date
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-green-600"
              } rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors`}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <span id="date-error" className="text-red-500 text-sm block mt-1">
                {errors.date}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="image_file"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
            >
              صورة الإنجاز
            </label>
            <ImageUploader
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>

          {errors.submit && (
            <div
              className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg"
              role="alert"
            >
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end pt-4 gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-arabic flex items-center"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center font-arabic"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin ml-2"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save size={18} className="ml-2" />
                  {editingAchievement ? "تحديث الإنجاز" : "حفظ الإنجاز"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
