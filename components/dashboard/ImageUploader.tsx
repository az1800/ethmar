"use client";
import React, { useRef } from "react";
import { Camera, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  accept?: string;
  maxSizeInMB?: number;
  aspectRatio?: number;
  className?: string;
}

export default function ImageUploader({
  imagePreview,
  setImagePreview,
  accept = "image/*",
  maxSizeInMB = 5,
  aspectRatio,
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeInMB = file.size / 1024 / 1024;
    if (fileSizeInMB > maxSizeInMB) {
      alert(`حجم الصورة يجب أن يكون أقل من ${maxSizeInMB} ميجابايت`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("الرجاء إرفاق صورة فقط");
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / 1024 / 1024;
    if (fileSizeInMB > maxSizeInMB) {
      alert(`حجم الصورة يجب أن يكون أقل من ${maxSizeInMB} ميجابايت`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <div className="relative mb-4">
          <img
            src={imagePreview}
            alt="Image preview"
            className="h-48 object-contain mx-auto rounded-lg"
          />
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6">
          <Camera size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-arabic">
            اسحب وأفلت الصورة هنا أو انقر للاختيار
          </p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        id="image_file"
        className="hidden"
        accept={accept}
        onChange={handleImageChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-arabic"
      >
        اختر صورة
      </button>
    </div>
  );
}
