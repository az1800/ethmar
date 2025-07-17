// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Save,
//   Edit,
//   RotateCcw,
//   CheckCircle,
//   X,
//   AlertCircle,
//   Clock,
//   Loader2,
//   RefreshCw,
//   FileText,
//   Globe,
//   Sparkles,
// } from "lucide-react";

// import {
//   fetchHeroSections,
//   updateHeroSections,
// } from "@/Services/heroSectionsAPI";
// import { useNotification } from "../Notification"; // Import the notification hook
// import Loader from "../Loader";

// interface HeroSection {
//   page_title: string;
//   title: string;
//   description: string;
// }

// interface FormErrors {
//   title?: string;
//   description?: string;
// }

// const HeroTextManagement: React.FC = () => {
//   const { showNotification } = useNotification(); // Use the notification hook

//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [editingSection, setEditingSection] = useState<HeroSection | null>(
//     null
//   );
//   const [formData, setFormData] = useState<Partial<HeroSection>>({});
//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [isSaving, setIsSaving] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);

//   // Fetch hero sections on component mount
//   useEffect(() => {
//     fetchHeroSectionsData();
//   }, []);

//   const fetchHeroSectionsData = useCallback(
//     async (isRefresh = false): Promise<void> => {
//       try {
//         if (isRefresh) {
//           setIsRefreshing(true);
//         } else {
//           setIsLoading(true);
//         }

//         const data = await fetchHeroSections();
//         setHeroSections(data || []);

//         if (isRefresh) {
//           showNotification({
//             message: "تم تحديث البيانات بنجاح! 🔄",
//             type: "success",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching hero sections:", error);
//         showNotification({
//           message: "حدث خطأ أثناء تحميل البيانات",
//           type: "error",
//         });
//       } finally {
//         setIsLoading(false);
//         setIsRefreshing(false);
//       }
//     },
//     [showNotification]
//   );

//   const validateForm = useCallback((): boolean => {
//     const errors: FormErrors = {};

//     if (!formData.title?.trim()) {
//       errors.title = "العنوان مطلوب";
//     } else if (formData.title.length > 100) {
//       errors.title = "العنوان يجب أن يكون أقل من 100 حرف";
//     }

//     if (!formData.description?.trim()) {
//       errors.description = "الوصف مطلوب";
//     } else if (formData.description.length > 500) {
//       errors.description = "الوصف يجب أن يكون أقل من 500 حرف";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [formData]);

//   const handleEdit = useCallback((section: HeroSection): void => {
//     setEditingSection(section);
//     setFormData(section);
//     setFormErrors({});
//   }, []);

//   const handleSave = useCallback(async (): Promise<void> => {
//     if (!editingSection || !validateForm()) return;

//     setIsSaving(true);

//     try {
//       const updatedSection = await updateHeroSections({
//         page_title: editingSection.page_title,
//         title: formData.title || editingSection.title,
//         description: formData.description || editingSection.description,
//       });

//       const updatedSections = heroSections.map((section) =>
//         section.page_title === editingSection.page_title
//           ? updatedSection
//           : section
//       );

//       setHeroSections(updatedSections);
//       setEditingSection(null);
//       setFormData({});
//       setFormErrors({});

//       showNotification({
//         message: "تم حفظ النصوص بنجاح! ✨",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Error saving hero section:", error);
//       showNotification({
//         message: "حدث خطأ أثناء حفظ النصوص",
//         type: "error",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   }, [editingSection, formData, heroSections, validateForm, showNotification]);

//   const handleCancel = useCallback((): void => {
//     setEditingSection(null);
//     setFormData({});
//     setFormErrors({});
//   }, []);

//   const handleInputChange = useCallback(
//     (field: keyof HeroSection, value: string) => {
//       setFormData((prev) => ({ ...prev, [field]: value }));
//       // Clear error when user starts typing
//       if (formErrors[field as keyof FormErrors]) {
//         setFormErrors((prev) => ({ ...prev, [field]: undefined }));
//       }
//     },
//     [formErrors]
//   );

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (heroSections.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//           <p className="text-gray-600 dark:text-gray-400 mb-4" dir="rtl">
//             لا توجد بيانات متاحة
//           </p>
//           <button
//             onClick={() => fetchHeroSectionsData()}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             إعادة المحاولة
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       {/* Notification component is now handled by the context provider */}

//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-row-reverse items-center justify-between">
//           <div className="text-right">
//             <h1
//               className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
//               dir="rtl"
//             >
//               إدارة النصوص الرئيسية
//             </h1>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-8">
//           {heroSections.map((section) => (
//             <div
//               key={section.page_title}
//               className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-300 transform ${
//                 hoveredCard === section.page_title
//                   ? "scale-[1.02] shadow-2xl"
//                   : ""
//               }`}
//               onMouseEnter={() => setHoveredCard(section.page_title)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Card Header */}
//               <div className="p-6 pb-0">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center space-x-3 space-x-reverse">
//                     <button
//                       onClick={() => handleEdit(section)}
//                       disabled={
//                         editingSection?.page_title === section.page_title
//                       }
//                       className="group p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                       title="تعديل"
//                     >
//                       <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//                     </button>
//                   </div>

//                   <div className="flex items-center space-x-3 space-x-reverse">
//                     <h2
//                       className="text-xl font-bold text-gray-800 dark:text-white"
//                       dir="rtl"
//                     >
//                       {section.page_title}
//                     </h2>
//                   </div>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6">
//                 {editingSection?.page_title === section.page_title ? (
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 gap-6">
//                       <div className="space-y-2">
//                         <label
//                           className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
//                           dir="rtl"
//                         >
//                           العنوان الرئيسي *
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.title || ""}
//                           onChange={(e) =>
//                             handleInputChange("title", e.target.value)
//                           }
//                           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ${
//                             formErrors.title
//                               ? "border-red-500 dark:border-red-400"
//                               : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
//                           }`}
//                           dir="rtl"
//                           maxLength={100}
//                         />
//                         {formErrors.title && (
//                           <p
//                             className="text-sm text-red-500 dark:text-red-400"
//                             dir="rtl"
//                           >
//                             {formErrors.title}
//                           </p>
//                         )}
//                         <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
//                           {(formData.title || "").length}/100
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label
//                         className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
//                         dir="rtl"
//                       >
//                         الوصف *
//                       </label>
//                       <textarea
//                         value={formData.description || ""}
//                         onChange={(e) =>
//                           handleInputChange("description", e.target.value)
//                         }
//                         rows={4}
//                         className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-200 ${
//                           formErrors.description
//                             ? "border-red-500 dark:border-red-400"
//                             : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
//                         }`}
//                         dir="rtl"
//                         maxLength={500}
//                       />
//                       {formErrors.description && (
//                         <p
//                           className="text-sm text-red-500 dark:text-red-400"
//                           dir="rtl"
//                         >
//                           {formErrors.description}
//                         </p>
//                       )}
//                       <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
//                         {(formData.description || "").length}/500
//                       </div>
//                     </div>

//                     <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
//                       <button
//                         onClick={handleSave}
//                         disabled={isSaving}
//                         className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isSaving ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             <span>جاري الحفظ...</span>
//                           </>
//                         ) : (
//                           <>
//                             <Save className="w-4 h-4" />
//                             <span>حفظ التغييرات</span>
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         disabled={isSaving}
//                         className="px-6 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50"
//                       >
//                         إلغاء
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 gap-6">
//                       <div className="space-y-3">
//                         <h3
//                           className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
//                           dir="rtl"
//                         >
//                           العنوان الرئيسي
//                         </h3>
//                         <p
//                           className="text-lg font-medium text-gray-800 dark:text-white leading-relaxed"
//                           dir="rtl"
//                         >
//                           {section.title || "غير محدد"}
//                         </p>
//                       </div>

//                       <div className="space-y-3">
//                         <h3
//                           className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
//                           dir="rtl"
//                         >
//                           الوصف
//                         </h3>
//                         <p
//                           className="text-gray-700 dark:text-gray-300 leading-relaxed"
//                           dir="rtl"
//                         >
//                           {section.description || "غير محدد"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroTextManagement;
import React, { useState, useEffect, useCallback } from "react";
import {
  Save,
  Edit,
  RotateCcw,
  CheckCircle,
  X,
  AlertCircle,
  Clock,
  Loader2,
  RefreshCw,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";

import {
  fetchHeroSections,
  updateHeroSections,
} from "@/Services/heroSectionsAPI";
import { useNotification } from "../Notification"; // Import the notification hook
import Loader from "../Loader";

interface HeroSection {
  page_title: string;
  title: string;
  description: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

const HeroTextManagement: React.FC = () => {
  const { showNotification } = useNotification(); // Use the notification hook

  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [editingSection, setEditingSection] = useState<HeroSection | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<HeroSection>>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Fetch hero sections on component mount
  useEffect(() => {
    fetchHeroSectionsData();
  }, []);

  const fetchHeroSectionsData = useCallback(
    async (isRefresh = false): Promise<void> => {
      try {
        if (isRefresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        const data = await fetchHeroSections();
        setHeroSections(data || []);

        if (isRefresh) {
          showNotification({
            message: "تم تحديث البيانات بنجاح! 🔄",
            type: "success",
          });
        }
      } catch (error) {
        console.error("Error fetching hero sections:", error);
        showNotification({
          message: "حدث خطأ أثناء تحميل البيانات",
          type: "error",
        });
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [showNotification]
  );

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    // Allow empty title - remove the required validation
    if (formData.title && formData.title.length > 100) {
      errors.title = "العنوان يجب أن يكون أقل من 100 حرف";
    }

    // Allow empty description - remove the required validation
    if (formData.description && formData.description.length > 500) {
      errors.description = "الوصف يجب أن يكون أقل من 500 حرف";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleEdit = useCallback((section: HeroSection): void => {
    setEditingSection(section);
    setFormData(section);
    setFormErrors({});
  }, []);

  const handleSave = useCallback(async (): Promise<void> => {
    if (!editingSection || !validateForm()) return;

    setIsSaving(true);

    try {
      const updatedSection = await updateHeroSections({
        page_title: editingSection.page_title,
        title: formData.title || "", // Allow empty string
        description: formData.description || "", // Allow empty string
      });

      const updatedSections = heroSections.map((section) =>
        section.page_title === editingSection.page_title
          ? updatedSection
          : section
      );

      setHeroSections(updatedSections);
      setEditingSection(null);
      setFormData({});
      setFormErrors({});

      showNotification({
        message: "تم حفظ النصوص بنجاح! ✨",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving hero section:", error);
      showNotification({
        message: "حدث خطأ أثناء حفظ النصوص",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }, [editingSection, formData, heroSections, validateForm, showNotification]);

  const handleCancel = useCallback((): void => {
    setEditingSection(null);
    setFormData({});
    setFormErrors({});
  }, []);

  const handleInputChange = useCallback(
    (field: keyof HeroSection, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (formErrors[field as keyof FormErrors]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [formErrors]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (heroSections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4" dir="rtl">
            لا توجد بيانات متاحة
          </p>
          <button
            onClick={() => fetchHeroSectionsData()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Notification component is now handled by the context provider */}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-row-reverse items-center justify-between">
          <div className="text-right">
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              dir="rtl"
            >
              إدارة النصوص الرئيسية
            </h1>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8">
          {heroSections.map((section) => (
            <div
              key={section.page_title}
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-300 transform ${
                hoveredCard === section.page_title
                  ? "scale-[1.02] shadow-2xl"
                  : ""
              }`}
              onMouseEnter={() => setHoveredCard(section.page_title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <button
                      onClick={() => handleEdit(section)}
                      disabled={
                        editingSection?.page_title === section.page_title
                      }
                      className="group p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="تعديل"
                    >
                      <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse">
                    <h2
                      className="text-xl font-bold text-gray-800 dark:text-white"
                      dir="rtl"
                    >
                      {section.page_title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {editingSection?.page_title === section.page_title ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                          dir="rtl"
                        >
                          العنوان الرئيسي
                        </label>
                        <input
                          type="text"
                          value={formData.title || ""}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            formErrors.title
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                          }`}
                          dir="rtl"
                          maxLength={100}
                          placeholder="اتركه فارغاً إذا كنت تريد عنوان فارغ"
                        />
                        {formErrors.title && (
                          <p
                            className="text-sm text-red-500 dark:text-red-400"
                            dir="rtl"
                          >
                            {formErrors.title}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                          {(formData.title || "").length}/100
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        dir="rtl"
                      >
                        الوصف
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-200 ${
                          formErrors.description
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                        }`}
                        dir="rtl"
                        maxLength={500}
                        placeholder="اتركه فارغاً إذا كنت تريد وصف فارغ"
                      />
                      {formErrors.description && (
                        <p
                          className="text-sm text-red-500 dark:text-red-400"
                          dir="rtl"
                        >
                          {formErrors.description}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        {(formData.description || "").length}/500
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>جاري الحفظ...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>حفظ التغييرات</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-6 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <h3
                          className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                          dir="rtl"
                        >
                          العنوان الرئيسي
                        </h3>
                        <p
                          className="text-lg font-medium text-gray-800 dark:text-white leading-relaxed"
                          dir="rtl"
                        >
                          {section.title || "غير محدد"}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3
                          className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                          dir="rtl"
                        >
                          الوصف
                        </h3>
                        <p
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                          dir="rtl"
                        >
                          {section.description || "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTextManagement;
