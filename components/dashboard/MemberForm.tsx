// "use client";
// import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { X } from "lucide-react";

// // Types
// export interface Member {
//   id?: number;
//   full_Name: string;
//   Position: string;
//   Committee: string | null;
//   Gender: string;
//   image?: string;
// }

// interface MemberFormProps {
//   editingMember?: Member | null;
//   onSubmit: (data: Member, files: { image?: File | null }) => Promise<void>;
//   onCancel: () => void;
//   loading?: boolean;
// }

// export default function MemberForm({
//   editingMember = null,
//   onSubmit,
//   onCancel,
//   loading = false,
// }: MemberFormProps) {
//   const initialFormState: Member = {
//     full_Name: "",
//     Position: "",
//     Committee: "",
//     Gender: "male",
//   };

//   const [formData, setFormData] = useState<Member>(initialFormState);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const committees: string[] = [
//     "التطوير",
//     "الموارد البشرية",
//     "العلاقات العامة",
//     "التنظيم",
//     "المحتوى المالي",
//     "الاعلامية",
//     "المشاريع",
//     "قادة الفرق",
//     "قادة النادي",
//   ];

//   // If editing a member, populate the form with their data
//   useEffect(() => {
//     if (editingMember) {
//       setFormData({
//         full_Name: editingMember.full_Name || "",
//         Position: editingMember.Position || "",
//         Committee: editingMember.Committee || "",
//         Gender: editingMember.Gender || "male",
//       });

//       if (editingMember.image) {
//         setImagePreview(editingMember.image);
//       }
//     }
//   }, [editingMember]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     // Handle special case for Position based on Gender
//     if (name === "Gender") {
//       const position = formData.Position;
//       // If position contains رئيس/رئيسة, update it according to gender
//       if (position.includes("رئيس")) {
//         const newPosition = value === "female" ? "رئيسة" : "رئيس";
//         // Replace existing position title while preserving any additional text
//         const updatedPosition = position.replace(/رئيسة|رئيس/, newPosition);

//         setFormData({
//           ...formData,
//           [name]: value as "male" | "female",
//           Position: updatedPosition,
//         });
//         return;
//       }
//     }

//     // For Committee, check if it's "قادة النادي"
//     if (name === "Committee" && value === "قادة النادي") {
//       setFormData({
//         ...formData,
//         [name]: value,
//         // When Committee is قادة النادي, automatically set Position to رئيس/رئيسة based on gender
//         Position: formData.Gender === "female" ? "رئيسة" : "رئيس",
//       });
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       const file = files[0];
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Process the committee value - if قادة النادي, set to null
//     const processedData: Member = {
//       ...formData,
//       Committee:
//         formData.Committee === "قادة النادي" ? null : formData.Committee,
//     };

//     onSubmit(processedData, { image: imageFile });
//   };

//   return (
//     <div
//       className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
//       dir="rtl"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//           {editingMember ? "تعديل العضو" : "إضافة عضو جديد"}
//         </h2>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor="full_Name"
//               className="block text-gray-700 dark:text-gray-300 mb-2"
//             >
//               الاسم الكامل
//             </label>
//             <input
//               type="text"
//               id="full_Name"
//               name="full_Name"
//               value={formData.full_Name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label
//               htmlFor="Gender"
//               className="block text-gray-700 dark:text-gray-300 mb-2"
//             >
//               الجنس
//             </label>
//             <select
//               id="Gender"
//               name="Gender"
//               value={formData.Gender}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="male">ذكر</option>
//               <option value="female">أنثى</option>
//             </select>
//           </div>

//           {/* Committee */}
//           <div>
//             <label
//               htmlFor="Committee"
//               className="block text-gray-700 dark:text-gray-300 mb-2"
//             >
//               اللجنة
//             </label>
//             <select
//               id="Committee"
//               name="Committee"
//               value={formData.Committee || ""}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="" disabled>
//                 اختر اللجنة
//               </option>
//               {committees.map((committee) => (
//                 <option key={committee} value={committee}>
//                   {committee}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Position */}
//           <div>
//             <label
//               htmlFor="Position"
//               className="block text-gray-700 dark:text-gray-300 mb-2"
//             >
//               المنصب
//             </label>
//             <input
//               type="text"
//               id="Position"
//               name="Position"
//               value={formData.Position}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-4 space-x-reverse">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-6 py-2 bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//             disabled={loading}
//           >
//             إلغاء
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 جارٍ الحفظ...
//               </span>
//             ) : editingMember ? (
//               "تحديث"
//             ) : (
//               "إضافة"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";

// Types
export interface Member {
  id?: number;
  full_Name: string;
  Position: string;
  Committee: string | null;
  Gender: string;
  image?: string;
}

interface MemberFormProps {
  editingMember?: Member | null;
  onSubmit: (data: Member, files: { image?: File | null }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function MemberForm({
  editingMember = null,
  onSubmit,
  onCancel,
  loading = false,
}: MemberFormProps) {
  const initialFormState: Member = {
    full_Name: "",
    Position: "",
    Committee: "",
    Gender: "male",
  };

  const [formData, setFormData] = useState<Member>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customPosition, setCustomPosition] = useState<string>("");
  const [positionType, setPositionType] = useState<string>("رئيس");

  const committees: string[] = [
    "التطوير",
    "الموارد البشرية",
    "العلاقات العامة",
    "التنظيم",
    "المحتوى المالي",
    "الاعلامية",
    "المشاريع",
    "قادة الفرق",
    "قادة النادي",
  ];

  // Get gender-specific position title
  const getGenderedPosition = (posType: string, gender: string): string => {
    if (posType === "رئيس" || posType === "رئيسة") {
      return gender === "female" ? "رئيسة" : "رئيس";
    } else if (posType === "نائب" || posType === "نائبة") {
      return gender === "female" ? "نائبة" : "نائب";
    }
    return posType;
  };

  // If editing a member, populate the form with their data
  useEffect(() => {
    if (editingMember) {
      setFormData({
        full_Name: editingMember.full_Name || "",
        Position: editingMember.Position || "",
        Committee: editingMember.Committee || "",
        Gender: editingMember.Gender || "male",
      });

      // Determine position type from existing position
      if (
        editingMember.Position.includes("رئيس") ||
        editingMember.Position.includes("رئيسة")
      ) {
        setPositionType("رئيس");
      } else if (
        editingMember.Position.includes("نائب") ||
        editingMember.Position.includes("نائبة")
      ) {
        setPositionType("نائب");
      } else {
        setPositionType("other");
        setCustomPosition(editingMember.Position);
      }

      if (editingMember.image) {
        setImagePreview(editingMember.image);
      }
    }
  }, [editingMember]);

  // Update position when gender or position type changes
  useEffect(() => {
    if (positionType === "other") {
      setFormData((prev) => ({
        ...prev,
        Position: customPosition,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        Position: getGenderedPosition(positionType, formData.Gender),
      }));
    }
  }, [formData.Gender, positionType, customPosition]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "positionType") {
      setPositionType(value);
      return;
    }

    if (name === "customPosition") {
      setCustomPosition(value);
      return;
    }

    // For Committee, check if it's "قادة النادي"
    if (name === "Committee" && value === "قادة النادي") {
      setFormData({
        ...formData,
        [name]: value,
      });
      // When Committee is قادة النادي, automatically set Position to رئيس/رئيسة based on gender
      setPositionType("رئيس");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Process the committee value - if قادة النادي, set to null
    const processedData: Member = {
      ...formData,
      Committee:
        formData.Committee === "قادة النادي" ? null : formData.Committee,
    };

    onSubmit(processedData, { image: imageFile });
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {editingMember ? "تعديل العضو" : "إضافة عضو جديد"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_Name"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              الاسم الكامل
            </label>
            <input
              type="text"
              id="full_Name"
              name="full_Name"
              value={formData.full_Name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="Gender"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              الجنس
            </label>
            <select
              id="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>

          {/* Committee */}
          <div>
            <label
              htmlFor="Committee"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              اللجنة
            </label>
            <select
              id="Committee"
              name="Committee"
              value={formData.Committee || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>
                اختر اللجنة
              </option>
              {committees.map((committee) => (
                <option key={committee} value={committee}>
                  {committee}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label
              htmlFor="positionType"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              المنصب
            </label>
            <div className="space-y-2">
              <select
                id="positionType"
                name="positionType"
                value={positionType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="رئيس">
                  {formData.Gender === "female" ? "رئيسة" : "رئيس"}
                </option>
                <option value="نائب">
                  {formData.Gender === "female" ? "نائبة" : "نائب"}
                </option>
                <option value="other">آخر</option>
              </select>

              {positionType === "other" && (
                <input
                  type="text"
                  id="customPosition"
                  name="customPosition"
                  value={customPosition}
                  onChange={handleChange}
                  placeholder="أدخل المنصب"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            disabled={loading}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جارٍ الحفظ...
              </span>
            ) : editingMember ? (
              "تحديث"
            ) : (
              "إضافة"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
