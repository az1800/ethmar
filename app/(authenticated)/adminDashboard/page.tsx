// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Book,
//   Award,
//   Users,
//   Briefcase,
//   Star,
//   Upload,
//   Camera,
//   Plus,
//   Save,
//   Trash2,
//   Edit,
//   Calendar,
//   ArrowLeft,
//   LineChart,
//   BookOpen,
//   UserPlus,
//   TrendingUp,
//   BarChart2,
//   Layout,
//   Trophy,
//   Check,
//   ArrowUp,
//   LucideIcon,
// } from "lucide-react";
// import {
//   getNumberOfArticles,
//   getNumberOfFeaturedArticles,
//   getNumberOfPartners,
//   getNumberOfMembers,
//   getNumberOfAchievements,
//   getPostCountsByCategory,
// } from "@/Services/dashboard";
// import getAcheivements from "@/Services/acheivementsAPI";
// import getMembers from "@/Services/membersAPI";
// import getPartners from "@/Services/partnersAPI";
// import { getPosts } from "@/Services/postsAPI";
// import { useForm } from "react-hook-form";
// import Footer from "@/components/Footer";
// import Members from "@/components/Members";
// import Companies from "@/components/Companies";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Stats {
//   totalPosts: number;
//   featuredPosts: number;
//   achievements: number;
//   partners: number;
//   members: number;
// }
// interface Achievement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image_url: string;
//   icon: string;
// }
// interface Notification {
//   show: boolean;
//   message: string;
//   type: "success" | "error" | "";
// }

// interface FormData {
//   title: string;
//   description: string;
//   date: string;
//   icon: string;
// }

// interface CategoryStats {
//   sectorAnalysis: number;
//   financialResearch: number;
//   financialAnalysis: number;
//   stockStory: number;
//   financialTerms: number;
//   ithmarPicks: number;
//   featuredPost: number;
// }

// interface Member {
//   id: number;
//   full_Name: string;
//   Position: string;
//   Committee: string;
//   Gender: string;
// }

// interface Partner {
//   id: number;
//   name: string;
//   logo_url: string;
// }

// const getIconComponent = (iconName: string): LucideIcon => {
//   const iconMap: Record<string, LucideIcon> = {
//     Trophy,
//     Star,
//     Award,
//     Check,
//     ArrowUp,
//     Calendar,
//   };

//   return iconMap[iconName] || Award;
// };
// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState<string>("dashboard");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [stats, setStats] = useState<Stats>({
//     totalPosts: 0,
//     featuredPosts: 0,
//     achievements: 0,
//     partners: 0,
//     members: 0,
//   });
//   const [members, setMembers] = useState<Member[]>([]);
//   const [partners, setPartners] = useState<Partner[]>([]);
//   const [achievements, setAchievements] = useState<Achievement[]>([]);
//   const [editingAchievement, setEditingAchievement] =
//     useState<Achievement | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [iconPreview, setIconPreview] = useState<string | null>(null);
//   const [notification, setNotification] = useState<Notification>({
//     show: false,
//     message: "",
//     type: "",
//   });
//   const [categoryStats, setCategoryStats] = useState<CategoryStats>({
//     sectorAnalysis: 0, // تحليل القطاعات
//     financialResearch: 1, // البحوث المالية
//     financialAnalysis: 2, // التحليل المالي
//     stockStory: 3, // قصة سهم
//     financialTerms: 4, // المصطلحات المالية
//     ithmarPicks: 5, // مختارات إثمار المالية
//     featuredPost: 6, // منشور مميز
//   });
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>();

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchStats();
//     fetchAchievements();
//     fetchMembers();
//     fetchPartners();
//     fetchCategoryStats();
//   }, []);

//   // Reset form when switching from edit mode to add mode
//   useEffect(() => {
//     if (!editingAchievement) {
//       reset({
//         title: "",
//         description: "",
//         date: new Date().toISOString().split("T")[0],
//         icon: "",
//       });
//       setImagePreview(null);
//       setIconPreview(null);
//     }
//   }, [editingAchievement, reset]);

//   // Set form values when editing an achievement
//   useEffect(() => {
//     if (editingAchievement) {
//       setValue("title", editingAchievement.title);
//       setValue("description", editingAchievement.description);
//       setValue("date", editingAchievement.date.split("T")[0]);
//       setValue("icon", editingAchievement.icon || "");
//       setImagePreview(editingAchievement.image_url);
//       setIconPreview(null); // We don't preview icon name strings
//     }
//   }, [editingAchievement, setValue]);

//   // Now, let's update your fetchCategoryStats function
//   const fetchCategoryStats = async (): Promise<void> => {
//     try {
//       setLoading(true);

//       // Call your API function
//       const counts = await getPostCountsByCategory();

//       if (counts) {
//         setCategoryStats(counts);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching category stats:", error);
//       setLoading(false);
//     }
//   };

//   const fetchStats = async (): Promise<void> => {
//     try {
//       setLoading(true);

//       const [totalPosts, featuredPosts, partners, members, achievements] =
//         await Promise.all([
//           getNumberOfArticles(),
//           getNumberOfFeaturedArticles(),
//           getNumberOfPartners(),
//           getNumberOfMembers(),
//           getNumberOfAchievements(),
//         ]);

//       setStats({
//         totalPosts: totalPosts || 0,
//         featuredPosts: featuredPosts || 0,
//         achievements: achievements || 0,
//         partners: partners || 0,
//         members: members || 0,
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//       setLoading(false);
//     }
//   };
//   const fetchAchievements = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const achievementsData = await getAcheivements();
//       setAchievements(achievementsData || []); // Default to an empty array if null
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching achievements:", error);
//       setLoading(false);
//     }
//   };

//   const fetchMembers = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const membersData = await getMembers();
//       setMembers((membersData ?? []) as Member[]);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//       setLoading(false);
//     }
//   };

//   // Fetch Partners list
//   const fetchPartners = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const response = await getPartners();
//       const partnersData = response.data || []; // Default to an empty array if null
//       setPartners(partnersData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching partners:", error);
//       setLoading(false);
//     }
//   };

//   // Handle image file upload
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle icon file upload
//   const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setIconPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle achievement form submission
//   const onSubmitAchievement = async (data: FormData): Promise<void> => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("date", data.date);
//       formData.append("icon", data.icon);

//       const imageFileInput = document.getElementById(
//         "image_file"
//       ) as HTMLInputElement;
//       if (imageFileInput?.files?.[0]) {
//         formData.append("image", imageFileInput.files[0]);
//       }

//       const iconFileInput = document.getElementById(
//         "icon_file"
//       ) as HTMLInputElement;
//       if (iconFileInput?.files?.[0]) {
//         formData.append("icon_image", iconFileInput.files[0]);
//       }

//       // API call would go here
//       // const response = await fetch('/api/achievements', {
//       //   method: editingAchievement ? 'PUT' : 'POST',
//       //   body: formData
//       // });

//       // Mock successful submission
//       setTimeout(() => {
//         setLoading(false);
//         setNotification({
//           show: true,
//           message: editingAchievement
//             ? "تم تحديث الإنجاز بنجاح!"
//             : "تم إضافة الإنجاز بنجاح!",
//           type: "success",
//         });

//         // Reset form and state
//         setEditingAchievement(null);
//         reset();
//         setImagePreview(null);
//         setIconPreview(null);

//         // Refresh achievements list
//         fetchAchievements();

//         // Hide notification after 3 seconds
//         setTimeout(() => {
//           setNotification({ show: false, message: "", type: "" });
//         }, 3000);
//       }, 1000);
//     } catch (error) {
//       console.error("Error submitting achievement:", error);
//       setLoading(false);
//       setNotification({
//         show: true,
//         message: "حدث خطأ أثناء حفظ الإنجاز",
//         type: "error",
//       });

//       // Hide notification after 3 seconds
//       setTimeout(() => {
//         setNotification({ show: false, message: "", type: "" });
//       }, 3000);
//     }
//   };

//   // Delete achievement handler
//   const handleDeleteAchievement = async (id: number): Promise<void> => {
//     if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
//       try {
//         setLoading(true);

//         // API call would go here
//         // await fetch(`/api/achievements/${id}`, {
//         //   method: 'DELETE'
//         // });

//         // Mock successful deletion
//         setTimeout(() => {
//           setAchievements(
//             achievements.filter((achievement) => achievement.id !== id)
//           );
//           setLoading(false);
//           setNotification({
//             show: true,
//             message: "تم حذف الإنجاز بنجاح!",
//             type: "success",
//           });

//           // Hide notification after 3 seconds
//           setTimeout(() => {
//             setNotification({ show: false, message: "", type: "" });
//           }, 3000);
//         }, 800);
//       } catch (error) {
//         console.error("Error deleting achievement:", error);
//         setLoading(false);
//         setNotification({
//           show: true,
//           message: "حدث خطأ أثناء حذف الإنجاز",
//           type: "error",
//         });

//         // Hide notification after 3 seconds
//         setTimeout(() => {
//           setNotification({ show: false, message: "", type: "" });
//         }, 3000);
//       }
//     }
//   };

//   // Handle edit achievement click
//   const handleEditAchievement = (achievement: Achievement): void => {
//     setEditingAchievement(achievement);
//     setActiveTab("add-achievement");
//   };

//   // Format date to locale string
//   const formatDate = (dateString: string): string => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return new Date(dateString).toLocaleDateString("ar-SA", options);
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         {/* Header would go here */}
//         {/* <Header /> */}

//         {/* Notification component */}
//         {notification.show && (
//           <div
//             className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
//               notification.type === "success"
//                 ? "bg-green-600 text-white"
//                 : "bg-red-600 text-white"
//             } transition-all`}
//             dir="rtl"
//           >
//             <p className="font-arabic">{notification.message}</p>
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row h-full">
//           {/* Sidebar */}
//           <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <h2
//                 className="text-xl font-bold text-gray-800 dark:text-white text-center"
//                 dir="rtl"
//               >
//                 لوحة التحكم
//               </h2>
//             </div>
//             <nav className="mt-6">
//               <ul>
//                 <li>
//                   <button
//                     onClick={() => setActiveTab("dashboard")}
//                     className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                       activeTab === "dashboard"
//                         ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
//                         : ""
//                     }`}
//                     dir="rtl"
//                   >
//                     <BarChart2
//                       size={20}
//                       className="ml-3"
//                       style={{ color: "#2C953F" }}
//                     />
//                     <span className="font-arabic">الإحصائيات</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       setActiveTab("achievements");
//                       setEditingAchievement(null);
//                     }}
//                     className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                       activeTab === "achievements"
//                         ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
//                         : ""
//                     }`}
//                     dir="rtl"
//                   >
//                     <Award
//                       size={20}
//                       className="ml-3"
//                       style={{ color: "#2C953F" }}
//                     />
//                     <span className="font-arabic">الإنجازات</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setActiveTab("articles")}
//                     className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                       activeTab === "articles"
//                         ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
//                         : ""
//                     }`}
//                     dir="rtl"
//                   >
//                     <BookOpen
//                       size={20}
//                       className="ml-3"
//                       style={{ color: "#2C953F" }}
//                     />
//                     <span className="font-arabic">المقالات</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setActiveTab("partners")}
//                     className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                       activeTab === "partners"
//                         ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
//                         : ""
//                     }`}
//                     dir="rtl"
//                   >
//                     <Briefcase
//                       size={20}
//                       className="ml-3"
//                       style={{ color: "#2C953F" }}
//                     />
//                     <span className="font-arabic">الشركاء</span>
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setActiveTab("members")}
//                     className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                       activeTab === "members"
//                         ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
//                         : ""
//                     }`}
//                     dir="rtl"
//                   >
//                     <Users
//                       size={20}
//                       className="ml-3"
//                       style={{ color: "#2C953F" }}
//                     />
//                     <span className="font-arabic">الأعضاء</span>
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </aside>

//           {/* Main content */}
//           <main className="flex-1 p-6">
//             {loading && (
//               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//                   {/* <Loader /> */}
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 border-4 border-t-green-600 border-r-green-600 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
//                     <p className="text-lg font-arabic" dir="rtl">
//                       جاري التحميل...
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Dashboard Stats */}
//             {activeTab === "dashboard" && (
//               <div className="space-y-6">
//                 <h1
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
//                   dir="rtl"
//                 >
//                   لوحة الإحصائيات
//                 </h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//                   {/* Total Posts */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className="w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #2C953F, #1F682C)",
//                         }}
//                       >
//                         <Book className="text-white" size={24} />
//                       </div>
//                       <div className="text-right" dir="rtl">
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
//                           إجمالي المقالات
//                         </p>
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                           {stats.totalPosts}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-end" dir="rtl">
//                       <TrendingUp size={16} className="text-green-600 ml-1" />
//                       <span className="text-xs text-green-600 font-arabic">
//                         زيادة 12% من الشهر الماضي
//                       </span>
//                     </div>
//                   </div>

//                   {/* Featured Posts */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className="w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #2C953F, #1F682C)",
//                         }}
//                       >
//                         <Star className="text-white" size={24} />
//                       </div>
//                       <div className="text-right" dir="rtl">
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
//                           المقالات المميزة
//                         </p>
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                           {stats.featuredPosts}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-end" dir="rtl">
//                       <TrendingUp size={16} className="text-green-600 ml-1" />
//                       <span className="text-xs text-green-600 font-arabic">
//                         زيادة 3% من الشهر الماضي
//                       </span>
//                     </div>
//                   </div>

//                   {/* Achievements */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className="w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #2C953F, #1F682C)",
//                         }}
//                       >
//                         <Award className="text-white" size={24} />
//                       </div>
//                       <div className="text-right" dir="rtl">
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
//                           الإنجازات
//                         </p>
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                           {stats.achievements}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-end" dir="rtl">
//                       <TrendingUp size={16} className="text-green-600 ml-1" />
//                       <span className="text-xs text-green-600 font-arabic">
//                         إنجاز جديد هذا الشهر
//                       </span>
//                     </div>
//                   </div>

//                   {/* Partners */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className="w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #2C953F, #1F682C)",
//                         }}
//                       >
//                         <Briefcase className="text-white" size={24} />
//                       </div>
//                       <div className="text-right" dir="rtl">
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
//                           الشركاء
//                         </p>
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                           {stats.partners}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-end" dir="rtl">
//                       <TrendingUp size={16} className="text-green-600 ml-1" />
//                       <span className="text-xs text-green-600 font-arabic">
//                         شريكين جدد هذا الشهر
//                       </span>
//                     </div>
//                   </div>

//                   {/* Members */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
//                     <div className="flex items-center justify-between mb-4">
//                       <div
//                         className="w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #2C953F, #1F682C)",
//                         }}
//                       >
//                         <Users className="text-white" size={24} />
//                       </div>
//                       <div className="text-right" dir="rtl">
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
//                           الأعضاء
//                         </p>
//                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
//                           {stats.members}
//                         </h3>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-end" dir="rtl">
//                       <TrendingUp size={16} className="text-green-600 ml-1" />
//                       <span className="text-xs text-green-600 font-arabic">
//                         زيادة 8% من الشهر الماضي
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Charts Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//                   {/* Monthly Growth Chart */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
//                     <h3
//                       className="text-lg font-bold text-gray-800 dark:text-white mb-4"
//                       dir="rtl"
//                     >
//                       نمو المستخدمين الشهري
//                     </h3>
//                     <div className="h-64 flex items-center justify-center">
//                       {/* Placeholder for chart */}
//                       <div className="flex flex-col items-center justify-center">
//                         <LineChart size={64} className="text-gray-400 mb-4" />
//                         <p
//                           className="text-gray-500 dark:text-gray-400 text-center font-arabic"
//                           dir="rtl"
//                         >
//                           سيتم عرض الرسم البياني هنا
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Distribution Chart */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
//                     <h3
//                       className="text-lg font-bold text-gray-800 dark:text-white mb-4"
//                       dir="rtl"
//                     >
//                       توزيع المحتوى
//                     </h3>
//                     <div className="h-80">
//                       {/* Bar Chart */}
//                       <Bar
//                         data={{
//                           labels: [
//                             "تحليل القطاعات",
//                             "البحوث المالية",
//                             "التحليل المالي",
//                             "قصة سهم",
//                             "المصطلحات المالية",
//                             "مختارات إثمار المالية",
//                             "منشور مميز",
//                           ],
//                           datasets: [
//                             {
//                               label: "عدد المقالات",
//                               data: [
//                                 categoryStats.sectorAnalysis,
//                                 categoryStats.financialResearch,
//                                 categoryStats.financialAnalysis,
//                                 categoryStats.stockStory,
//                                 categoryStats.financialTerms,
//                                 categoryStats.ithmarPicks,
//                                 categoryStats.featuredPost,
//                               ],
//                               backgroundColor: [
//                                 "#0AAF08", // Light Green
//                                 "#6BB579", // Light Green Secondary
//                                 "#2C953F", // Primary Green
//                                 "#1F682C", // Dark Green
//                                 "#164B20", // Darker Green
//                                 "#A5704A", // Dark Brown
//                                 "#B33030", // Dark Red for featured posts
//                               ],
//                               borderColor: [
//                                 "#0AAF08",
//                                 "#6BB579",
//                                 "#2C953F",
//                                 "#1F682C",
//                                 "#164B20",
//                                 "#A5704A",
//                                 "#B33030",
//                               ],
//                               borderWidth: 1,
//                             },
//                           ],
//                         }}
//                         options={{
//                           indexAxis: "y", // Horizontal bar chart
//                           responsive: true,
//                           maintainAspectRatio: false,
//                           plugins: {
//                             legend: {
//                               display: false,
//                             },
//                             title: {
//                               display: false,
//                             },
//                           },
//                           scales: {
//                             x: {
//                               grid: {
//                                 display: false,
//                               },
//                             },
//                             y: {
//                               grid: {
//                                 display: false,
//                               },
//                             },
//                           },
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Achievements Tab */}
//             {activeTab === "achievements" && (
//               <div>
//                 <div
//                   className="flex justify-between items-center mb-6"
//                   dir="rtl"
//                 >
//                   <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                     الإنجازات
//                   </h1>
//                   <button
//                     onClick={() => {
//                       setActiveTab("add-achievement");
//                       setEditingAchievement(null);
//                     }}
//                     className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     <Plus size={18} className="ml-2" />
//                     <span className="font-arabic">إضافة إنجاز جديد</span>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {achievements && achievements.length > 0 ? (
//                     achievements.map((achievement) => (
//                       <div
//                         key={achievement.id}
//                         className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1"
//                       >
//                         <div className="relative">
//                           <img
//                             src={
//                               achievement.image_url || "/placeholder-image.jpg"
//                             }
//                             alt={achievement.title}
//                             className="w-full h-48 object-cover"
//                           />
//                           <div className="absolute top-2 right-2 flex space-x-2">
//                             <button
//                               onClick={() => handleEditAchievement(achievement)}
//                               className="p-2 bg-white/70 hover:bg-white rounded-full text-green-600 hover:text-green-700 transition-colors"
//                             >
//                               <Edit size={16} />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDeleteAchievement(achievement.id)
//                               }
//                               className="p-2 bg-white/70 hover:bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="p-5" dir="rtl">
//                           <div className="flex items-center mb-3">
//                             {(() => {
//                               const Icon = getIconComponent(achievement.icon);
//                               return (
//                                 <Icon
//                                   size={24}
//                                   className="text-green-600 mr-2"
//                                 />
//                               );
//                             })()}
//                             <h3 className="text-lg font-bold text-gray-800 dark:text-white mr-2">
//                               {achievement.title}
//                             </h3>
//                           </div>

//                           <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 font-arabic">
//                             {achievement.description}
//                           </p>
//                           <div className="flex items-center text-gray-500 dark:text-gray-400">
//                             <Calendar size={16} className="ml-2" />
//                             <span className="text-sm font-arabic">
//                               {formatDate(achievement.date)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-xl">
//                       <Award
//                         size={64}
//                         className="text-gray-300 dark:text-gray-600 mb-4"
//                       />
//                       <p
//                         className="text-lg text-gray-500 dark:text-gray-400 font-arabic"
//                         dir="rtl"
//                       >
//                         لا توجد إنجازات مضافة حالياً
//                       </p>
//                       <button
//                         onClick={() => {
//                           setActiveTab("add-achievement");
//                           setEditingAchievement(null);
//                         }}
//                         className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-arabic"
//                         dir="rtl"
//                       >
//                         إضافة إنجاز جديد
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Add/Edit Achievement Tab */}
//             {activeTab === "add-achievement" && (
//               <div>
//                 <div className="flex items-center mb-6" dir="rtl">
//                   <button
//                     onClick={() => setActiveTab("achievements")}
//                     className="p-2 mr-4 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <ArrowLeft size={18} />
//                   </button>
//                   <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                     {editingAchievement ? "تعديل الإنجاز" : "إضافة إنجاز جديد"}
//                   </h1>
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
//                   <form
//                     onSubmit={handleSubmit(onSubmitAchievement)}
//                     className="space-y-6"
//                     dir="rtl"
//                   >
//                     <div>
//                       <label
//                         htmlFor="title"
//                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
//                       >
//                         عنوان الإنجاز
//                       </label>
//                       <input
//                         type="text"
//                         id="title"
//                         {...register("title", { required: true })}
//                         className={`w-full px-4 py-2 border ${
//                           errors.title
//                             ? "border-red-500"
//                             : "border-gray-300 dark:border-gray-600"
//                         } rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                         placeholder="أدخل عنوان الإنجاز"
//                       />
//                       {errors.title && (
//                         <span className="text-red-500 text-sm">
//                           هذا الحقل مطلوب
//                         </span>
//                       )}
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="description"
//                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
//                       >
//                         وصف الإنجاز
//                       </label>
//                       <textarea
//                         id="description"
//                         rows={4}
//                         {...register("description", { required: true })}
//                         className={`w-full px-4 py-2 border ${
//                           errors.description
//                             ? "border-red-500"
//                             : "border-gray-300 dark:border-gray-600"
//                         } rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                         placeholder="أدخل وصف الإنجاز"
//                       />
//                       {errors.description && (
//                         <span className="text-red-500 text-sm">
//                           هذا الحقل مطلوب
//                         </span>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label
//                           htmlFor="date"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
//                         >
//                           تاريخ الإنجاز
//                         </label>
//                         <input
//                           type="date"
//                           id="date"
//                           {...register("date", { required: true })}
//                           className={`w-full px-4 py-2 border ${
//                             errors.date
//                               ? "border-red-500"
//                               : "border-gray-300 dark:border-gray-600"
//                           } rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                         />
//                         {errors.date && (
//                           <span className="text-red-500 text-sm">
//                             هذا الحقل مطلوب
//                           </span>
//                         )}
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="icon"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
//                         >
//                           أيقونة الإنجاز
//                         </label>
//                         <select
//                           id="icon"
//                           {...register("icon")}
//                           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                         >
//                           <option value="Trophy">Trophy</option>
//                           <option value="Star">Star</option>
//                           <option value="Award">Award</option>
//                           <option value="Check">Check</option>
//                           <option value="ArrowUp">ArrowUp</option>
//                           <option value="Calendar">Calendar</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="image_file"
//                         className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-arabic"
//                       >
//                         صورة الإنجاز
//                       </label>
//                       <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//                         {imagePreview ? (
//                           <div className="relative mb-4">
//                             <img
//                               src={imagePreview}
//                               alt="Image preview"
//                               className="h-48 object-contain mx-auto rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setImagePreview(null)}
//                               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center justify-center py-6">
//                             <Camera size={48} className="text-gray-400 mb-4" />
//                             <p className="text-gray-500 dark:text-gray-400 font-arabic">
//                               اسحب وأفلت الصورة هنا أو انقر للاختيار
//                             </p>
//                           </div>
//                         )}
//                         <input
//                           type="file"
//                           id="image_file"
//                           className="hidden"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => {
//                             document.getElementById("image_file")?.click();
//                           }}
//                           className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-arabic"
//                         >
//                           اختر صورة
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex justify-end pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab("achievements")}
//                         className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-4 font-arabic"
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center font-arabic"
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
//                             جاري الحفظ...
//                           </>
//                         ) : (
//                           <>
//                             <Save size={18} className="ml-2" />
//                             {editingAchievement
//                               ? "تحديث الإنجاز"
//                               : "حفظ الإنجاز"}
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Partners Tab */}
//             {activeTab === "partners" && <Companies type={"dashboard"} />}

//             {/* Articles Tab (Placeholder) */}
//             {activeTab === "articles" && (
//               <div>
//                 <h1
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
//                   dir="rtl"
//                 >
//                   المقالات
//                 </h1>
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
//                   <BookOpen
//                     size={64}
//                     className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
//                   />
//                   <p
//                     className="text-lg text-gray-500 dark:text-gray-400 font-arabic"
//                     dir="rtl"
//                   >
//                     ستتمكن قريباً من إدارة المقالات من هنا
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Members Tab */}
//             {activeTab === "members" && <Members type={"dashboard"} />}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import React from "react";

export default function page() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
