// // "use client";
// // import React, { useState, useEffect } from "react";
// // import {
// //   getNumberOfArticles,
// //   getNumberOfFeaturedArticles,
// //   getNumberOfPartners,
// //   getNumberOfMembers,
// //   getNumberOfAchievements,
// //   getPostCountsByCategory,
// // } from "@/Services/dashboard";
// // import getAcheivements from "@/Services/acheivementsAPI";
// // import getMembers from "@/Services/membersAPI";
// // import getPartners from "@/Services/partnersAPI";
// // import Footer from "@/components/Footer";
// // import Members from "@/components/Members";
// // import Companies from "@/components/Companies";
// // import Sidebar from "./Sidebar";
// // import DashboardStats from "./DashboardStats";
// // import AchievementsList from "./AchievementsList";
// // import AchievementForm from "./AchievementForm";
// // import Charts from "./Charts";
// // import Notification from "./Notification";
// // import { useRouter } from "next/navigation";

// // import { BookOpen, Plus } from "lucide-react";

// // // Types
// // import {
// //   Stats,
// //   Achievement,
// //   Notification as NotificationType,
// //   CategoryStats,
// //   Member,
// //   Partner,
// //   FormData as AchievementFormData,
// // } from "./types";
// // import Loader from "../Loader";

// // export default function AdminDashboard() {
// //   const router = useRouter();

// //   const [activeTab, setActiveTab] = useState<string>("dashboard");
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [stats, setStats] = useState<Stats>({
// //     totalPosts: 0,
// //     featuredPosts: 0,
// //     achievements: 0,
// //     partners: 0,
// //     members: 0,
// //   });
// //   const [members, setMembers] = useState<Member[]>([]);
// //   const [partners, setPartners] = useState<Partner[]>([]);
// //   const [achievements, setAchievements] = useState<Achievement[]>([]);
// //   const [editingAchievement, setEditingAchievement] =
// //     useState<Achievement | null>(null);
// //   const [notification, setNotification] = useState<NotificationType>({
// //     show: false,
// //     message: "",
// //     type: "",
// //   });
// //   const [categoryStats, setCategoryStats] = useState<CategoryStats>({
// //     sectorAnalysis: 0,
// //     financialResearch: 1,
// //     financialAnalysis: 2,
// //     stockStory: 3,
// //     financialTerms: 4,
// //     ithmarPicks: 5,
// //     featuredPost: 6,
// //   });

// //   // Fetch data on component mount
// //   useEffect(() => {
// //     fetchStats();
// //     fetchAchievements();
// //     fetchMembers();
// //     fetchPartners();
// //     fetchCategoryStats();
// //   }, []);

// //   const fetchCategoryStats = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       const counts = await getPostCountsByCategory();
// //       if (counts) {
// //         setCategoryStats(counts);
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching category stats:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchStats = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       const [totalPosts, featuredPosts, partners, members, achievements] =
// //         await Promise.all([
// //           getNumberOfArticles(),
// //           getNumberOfFeaturedArticles(),
// //           getNumberOfPartners(),
// //           getNumberOfMembers(),
// //           getNumberOfAchievements(),
// //         ]);

// //       setStats({
// //         totalPosts: totalPosts || 0,
// //         featuredPosts: featuredPosts || 0,
// //         achievements: achievements || 0,
// //         partners: partners || 0,
// //         members: members || 0,
// //       });
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching stats:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAchievements = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       const achievementsData = await getAcheivements();
// //       setAchievements(achievementsData || []);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching achievements:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchMembers = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       const membersData = await getMembers();
// //       setMembers((membersData ?? []) as Member[]);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching members:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPartners = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       const response = await getPartners();
// //       const partnersData = response.data || [];
// //       setPartners(partnersData);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error("Error fetching partners:", error);
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteAchievement = async (id: number): Promise<void> => {
// //     if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
// //       try {
// //         setLoading(true);
// //         // Mock successful deletion
// //         setTimeout(() => {
// //           setAchievements(
// //             achievements.filter((achievement) => achievement.id !== id)
// //           );
// //           setLoading(false);
// //           setNotification({
// //             show: true,
// //             message: "تم حذف الإنجاز بنجاح!",
// //             type: "success",
// //           });
// //           // Hide notification after 3 seconds
// //           setTimeout(() => {
// //             setNotification({ show: false, message: "", type: "" });
// //           }, 3000);
// //         }, 800);
// //       } catch (error) {
// //         console.error("Error deleting achievement:", error);
// //         setLoading(false);
// //         setNotification({
// //           show: true,
// //           message: "حدث خطأ أثناء حذف الإنجاز",
// //           type: "error",
// //         });
// //         setTimeout(() => {
// //           setNotification({ show: false, message: "", type: "" });
// //         }, 3000);
// //       }
// //     }
// //   };

// //   const handleEditAchievement = (achievement: Achievement): void => {
// //     setEditingAchievement(achievement);
// //     setActiveTab("add-achievement");
// //   };

// //   // const handleSubmit = async (
// //   //   formData: FormData,
// //   //   files: { image?: File; icon?: File }
// //   // ): Promise<void> => {
// //   //   try {
// //   //     setLoading(true);
// //   //     // Mock successful submission
// //   //     setTimeout(() => {
// //   //       setLoading(false);
// //   //       setNotification({
// //   //         show: true,
// //   //         message: editingAchievement
// //   //           ? "تم تحديث الإنجاز بنجاح!"
// //   //           : "تم إضافة الإنجاز بنجاح!",
// //   //         type: "success",
// //   //       });

// //   //       // Reset form and state
// //   //       setEditingAchievement(null);
// //   //       // Refresh achievements list
// //   //       fetchAchievements();

// //   //       // Hide notification after 3 seconds
// //   //       setTimeout(() => {
// //   //         setNotification({ show: false, message: "", type: "" });
// //   //       }, 3000);
// //   //     }, 1000);
// //   //   } catch (error) {
// //   //     console.error("Error submitting achievement:", error);
// //   //     setLoading(false);
// //   //     setNotification({
// //   //       show: true,
// //   //       message: "حدث خطأ أثناء حفظ الإنجاز",
// //   //       type: "error",
// //   //     });
// //   //     setTimeout(() => {
// //   //       setNotification({ show: false, message: "", type: "" });
// //   //     }, 3000);
// //   //   }
// //   // };
// //   const handleSubmit = async (formData: AchievementFormData): Promise<void> => {
// //     setLoading(true);
// //     try {
// //       // You can enhance this with upload logic if needed
// //       setTimeout(() => {
// //         setLoading(false);
// //         setNotification({
// //           show: true,
// //           message: editingAchievement
// //             ? "تم تحديث الإنجاز بنجاح!"
// //             : "تم إضافة الإنجاز بنجاح!",
// //           type: "success",
// //         });
// //         setEditingAchievement(null);
// //         fetchAchievements();
// //         setTimeout(() => {
// //           setNotification({ show: false, message: "", type: "" });
// //         }, 3000);
// //       }, 1000);
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setLoading(false);
// //       setNotification({
// //         show: true,
// //         message: "حدث خطأ أثناء حفظ الإنجاز",
// //         type: "error",
// //       });
// //       setTimeout(() => {
// //         setNotification({ show: false, message: "", type: "" });
// //       }, 3000);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
// //         {notification.show && (
// //           <Notification
// //             show={notification.show}
// //             message={notification.message}
// //             type={notification.type}
// //           />
// //         )}

// //         <div className="flex flex-col md:flex-row h-full">
// //           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

// //           <main className="flex-1 p-6">
// //             {loading && <Loader />}

// //             {activeTab === "dashboard" && (
// //               <div className="space-y-6">
// //                 <h1
// //                   className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
// //                   dir="rtl"
// //                 >
// //                   لوحة الإحصائيات
// //                 </h1>

// //                 <DashboardStats stats={stats} />
// //                 <Charts categoryStats={categoryStats} />
// //               </div>
// //             )}

// //             {activeTab === "achievements" && (
// //               <AchievementsList
// //                 achievements={achievements}
// //                 onEdit={handleEditAchievement}
// //                 onDelete={handleDeleteAchievement}
// //                 onAddNew={() => {
// //                   setActiveTab("add-achievement");
// //                   setEditingAchievement(null);
// //                 }}
// //               />
// //             )}

// //             {activeTab === "add-achievement" && (
// //               <AchievementForm
// //                 editingAchievement={editingAchievement}
// //                 onSubmit={handleSubmit} // ✅ This works now
// //                 onCancel={() => setActiveTab("achievements")}
// //                 loading={loading}
// //               />
// //             )}

// //             {activeTab === "partners" && (
// //               <>
// //                 <Companies type={"dashboard"} />
// //               </>
// //             )}

// //             {activeTab === "articles" && (
// //               <div>
// //                 <div
// //                   className="flex justify-between items-center mb-6"
// //                   dir="rtl"
// //                 >
// //                   <h1
// //                     className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
// //                     dir="rtl"
// //                   >
// //                     إدارة المقالات
// //                   </h1>
// //                   <button
// //                     onClick={() => router.push("/blog-write")}
// //                     className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //                   >
// //                     <Plus size={18} className="ml-2" />
// //                     <span className="font-arabic">إضافة مقال جديد</span>
// //                   </button>
// //                 </div>

// //                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
// //                   <BookOpen
// //                     size={64}
// //                     className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
// //                   />
// //                   <p
// //                     className="text-lg text-gray-500 dark:text-gray-400 font-arabic"
// //                     dir="rtl"
// //                   >
// //                     ستتمكن قريباً من إدارة المقالات من هنا
// //                   </p>
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === "members" && <Members type={"dashboard"} />}
// //           </main>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }
// "use client";
// import React, { useState, useEffect } from "react";
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
// import Footer from "@/components/Footer";
// import Companies from "@/components/Companies";
// import Sidebar from "./Sidebar";
// import DashboardStats from "./DashboardStats";
// import AchievementsList from "./AchievementsList";
// import AchievementForm from "./AchievementForm";
// import MemberManagement from "./MemberManagement"; // Import the new component
// import Charts from "./Charts";
// import Notification from "./Notification";
// import { useRouter } from "next/navigation";
// import Loader from "../Loader";

// import { BookOpen, Plus } from "lucide-react";

// // Types
// import { Member } from "./MemberForm"; // Import the Member type
// import ArticleManagement from "./ArticleManagement";

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
//   description?: string;
//   image?: string;
//   icon?: string;
//   date?: string;
// }

// interface FormData {
//   title: string;
//   description: string;
//   date?: string;
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

// interface Partner {
//   id: number;
//   name: string;
//   logo?: string;
//   website?: string;
// }

// interface Notification {
//   show: boolean;
//   message: string;
//   type: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();

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
//   const [notification, setNotification] = useState<Notification>({
//     show: false,
//     message: "",
//     type: "",
//   });
//   const [categoryStats, setCategoryStats] = useState<CategoryStats>({
//     sectorAnalysis: 0,
//     financialResearch: 1,
//     financialAnalysis: 2,
//     stockStory: 3,
//     financialTerms: 4,
//     ithmarPicks: 5,
//     featuredPost: 6,
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchStats();
//     fetchAchievements();
//     fetchMembers();
//     fetchPartners();
//     fetchCategoryStats();
//   }, []);

//   const fetchCategoryStats = async (): Promise<void> => {
//     try {
//       setLoading(true);
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
//       setAchievements(achievementsData || []);
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

//   const fetchPartners = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const response = await getPartners();
//       const partnersData = response.data || [];
//       setPartners(partnersData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching partners:", error);
//       setLoading(false);
//     }
//   };

//   const handleDeleteAchievement = async (id: number): Promise<void> => {
//     if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
//       try {
//         setLoading(true);
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
//         setTimeout(() => {
//           setNotification({ show: false, message: "", type: "" });
//         }, 3000);
//       }
//     }
//   };

//   const handleEditAchievement = (achievement: Achievement): void => {
//     setEditingAchievement(achievement);
//     setActiveTab("add-achievement");
//   };

//   const handleSubmit = async (formData: FormData): Promise<void> => {
//     setLoading(true);
//     try {
//       // You can enhance this with upload logic if needed
//       setTimeout(() => {
//         setLoading(false);
//         setNotification({
//           show: true,
//           message: editingAchievement
//             ? "تم تحديث الإنجاز بنجاح!"
//             : "تم إضافة الإنجاز بنجاح!",
//           type: "success",
//         });
//         setEditingAchievement(null);
//         fetchAchievements();
//         setTimeout(() => {
//           setNotification({ show: false, message: "", type: "" });
//         }, 3000);
//       }, 1000);
//     } catch (error) {
//       console.error("Error:", error);
//       setLoading(false);
//       setNotification({
//         show: true,
//         message: "حدث خطأ أثناء حفظ الإنجاز",
//         type: "error",
//       });
//       setTimeout(() => {
//         setNotification({ show: false, message: "", type: "" });
//       }, 3000);
//     }
//   };

//   // New function to show notification
//   const showNotification = (message: string, type: string) => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });

//     setTimeout(() => {
//       setNotification({ show: false, message: "", type: "" });
//     }, 3000);
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         {notification.show && (
//           <Notification
//             show={notification.show}
//             message={notification.message}
//             type={notification.type}
//           />
//         )}

//         <div className="flex flex-col md:flex-row h-full">
//           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//           <main className="flex-1 p-6">
//             {loading && <Loader />}

//             {activeTab === "dashboard" && (
//               <div className="space-y-6">
//                 <h1
//                   className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
//                   dir="rtl"
//                 >
//                   لوحة الإحصائيات
//                 </h1>

//                 <DashboardStats stats={stats} />
//                 <Charts categoryStats={categoryStats} />
//               </div>
//             )}

//             {activeTab === "achievements" && (
//               <AchievementsList
//                 achievements={achievements}
//                 onEdit={handleEditAchievement}
//                 onDelete={handleDeleteAchievement}
//                 onAddNew={() => {
//                   setActiveTab("add-achievement");
//                   setEditingAchievement(null);
//                 }}
//               />
//             )}

//             {activeTab === "add-achievement" && (
//               <AchievementForm
//                 editingAchievement={editingAchievement}
//                 onSubmit={handleSubmit}
//                 onCancel={() => setActiveTab("achievements")}
//                 loading={loading}
//               />
//             )}

//             {activeTab === "partners" && (
//               <>
//                 <Companies type={"dashboard"} />
//               </>
//             )}

//             {activeTab === "members" && (
//               <MemberManagement members={members} onRefresh={fetchMembers} />
//             )}

//             {activeTab === "articles" && <ArticleManagement />}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import {
  getNumberOfArticles,
  getNumberOfFeaturedArticles,
  getNumberOfPartners,
  getNumberOfMembers,
  getNumberOfAchievements,
  getPostCountsByCategory,
} from "@/Services/dashboard";
import getAcheivements from "@/Services/acheivementsAPI";
import getMembers from "@/Services/membersAPI";
import getPartners from "@/Services/partnersAPI";
import Footer from "@/components/Footer";
import Companies from "@/components/Companies";
import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";
import AchievementsList from "./AchievementsList";
import AchievementForm from "./AchievementForm";
import MemberManagement from "./MemberManagement";
import Charts from "./Charts";
import Notification from "./Notification";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import {
  deleteAchievement,
  updateAchievement,
  addAchievement,
} from "@/Services/acheivementsAPI";
import { BookOpen, Plus } from "lucide-react";

// Import unified types
import {
  Achievement,
  Stats,
  CategoryStats,
  FormData,
  Notification as NotificationType,
} from "./types";
import { Member } from "./MemberForm";
import ArticleManagement from "./ArticleManagement";

interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    featuredPosts: 0,
    achievements: 0,
    partners: 0,
    members: 0,
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);
  const [notification, setNotification] = useState<NotificationType>({
    show: false,
    message: "",
    type: "",
  });
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({
    sectorAnalysis: 0,
    financialResearch: 1,
    financialAnalysis: 2,
    stockStory: 3,
    financialTerms: 4,
    ithmarPicks: 5,
    featuredPost: 6,
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchStats();
    fetchAchievements();
    fetchMembers();
    fetchPartners();
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async (): Promise<void> => {
    try {
      setLoading(true);
      const counts = await getPostCountsByCategory();
      if (counts) {
        setCategoryStats(counts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category stats:", error);
      setLoading(false);
    }
  };

  const fetchStats = async (): Promise<void> => {
    try {
      setLoading(true);
      const [totalPosts, featuredPosts, partners, members, achievements] =
        await Promise.all([
          getNumberOfArticles(),
          getNumberOfFeaturedArticles(),
          getNumberOfPartners(),
          getNumberOfMembers(),
          getNumberOfAchievements(),
        ]);

      setStats({
        totalPosts: totalPosts || 0,
        featuredPosts: featuredPosts || 0,
        achievements: achievements || 0,
        partners: partners || 0,
        members: members || 0,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  const fetchAchievements = async (): Promise<void> => {
    try {
      setLoading(true);
      const achievementsData = await getAcheivements();
      setAchievements(achievementsData || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setLoading(false);
    }
  };

  const fetchMembers = async (): Promise<void> => {
    try {
      setLoading(true);
      const membersData = await getMembers();
      setMembers((membersData ?? []) as Member[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  const fetchPartners = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getPartners();
      const partnersData = response.data || [];
      setPartners(partnersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setLoading(false);
    }
  };

  // const handleDeleteAchievement = async (id: number): Promise<void> => {
  //   if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
  //     try {
  //       setLoading(true);
  //       // Mock successful deletion
  //       setTimeout(() => {
  //         setAchievements(
  //           achievements.filter((achievement) => achievement.id !== id)
  //         );
  //         setLoading(false);
  //         setNotification({
  //           show: true,
  //           message: "تم حذف الإنجاز بنجاح!",
  //           type: "success",
  //         });
  //         // Hide notification after 3 seconds
  //         setTimeout(() => {
  //           setNotification({ show: false, message: "", type: "" });
  //         }, 3000);
  //       }, 800);
  //     } catch (error) {
  //       console.error("Error deleting achievement:", error);
  //       setLoading(false);
  //       setNotification({
  //         show: true,
  //         message: "حدث خطأ أثناء حذف الإنجاز",
  //         type: "error",
  //       });
  //       setTimeout(() => {
  //         setNotification({ show: false, message: "", type: "" });
  //       }, 3000);
  //     }
  //   }
  // };

  const handleDeleteAchievement = async (id: number): Promise<void> => {
    if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
      try {
        setLoading(true);
        await deleteAchievement(id);

        // Update local state
        setAchievements(
          achievements.filter((achievement) => achievement.id !== id)
        );

        setNotification({
          show: true,
          message: "تم حذف الإنجاز بنجاح!",
          type: "success",
        });
      } catch (error) {
        console.error("Error deleting achievement:", error);
        setNotification({
          show: true,
          message: "حدث خطأ أثناء حذف الإنجاز",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const handleEditAchievement = (achievement: Achievement): void => {
    setEditingAchievement(achievement);
    setActiveTab("add-achievement");
  };

  // const handleSubmit = async (formData: FormData): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     // You can enhance this with upload logic if needed
  //     setTimeout(() => {
  //       setLoading(false);
  //       setNotification({
  //         show: true,
  //         message: editingAchievement
  //           ? "تم تحديث الإنجاز بنجاح!"
  //           : "تم إضافة الإنجاز بنجاح!",
  //         type: "success",
  //       });
  //       setEditingAchievement(null);
  //       fetchAchievements();
  //       setTimeout(() => {
  //         setNotification({ show: false, message: "", type: "" });
  //       }, 3000);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setLoading(false);
  //     setNotification({
  //       show: true,
  //       message: "حدث خطأ أثناء حفظ الإنجاز",
  //       type: "error",
  //     });
  //     setTimeout(() => {
  //       setNotification({ show: false, message: "", type: "" });
  //     }, 3000);
  //   }
  // };
  // …imports

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      setLoading(true);

      if (editingAchievement) {
        await updateAchievement(editingAchievement.id, formData);
        showNotification("تم تحديث الإنجاز بنجاح!", "success");
      } else {
        await addAchievement(formData);
        showNotification("تم إضافة الإنجاز بنجاح!", "success");
      }

      await fetchAchievements();
      setEditingAchievement(null);
      setActiveTab("achievements");
    } catch (error) {
      console.error("Error saving achievement:", error);
      showNotification("حدث خطأ أثناء حفظ الإنجاز", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (
    message: string,
    type: "success" | "error" | ""
  ): void => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {notification.show && (
          <Notification
            show={notification.show}
            message={notification.message}
            type={notification.type}
          />
        )}

        <div className="flex flex-col md:flex-row h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 p-6">
            {loading && <Loader />}

            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h1
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
                  dir="rtl"
                >
                  لوحة الإحصائيات
                </h1>

                <DashboardStats stats={stats} />
                <Charts categoryStats={categoryStats} />
              </div>
            )}

            {activeTab === "achievements" && (
              <AchievementsList
                achievements={achievements}
                onEdit={handleEditAchievement}
                onDelete={handleDeleteAchievement}
                onAddNew={() => {
                  setActiveTab("add-achievement");
                  setEditingAchievement(null);
                }}
              />
            )}

            {activeTab === "add-achievement" && (
              <AchievementForm
                editingAchievement={editingAchievement}
                onSubmit={handleSubmit}
                onCancel={() => setActiveTab("achievements")}
                loading={loading}
              />
            )}

            {activeTab === "partners" && (
              <>
                <Companies type={"dashboard"} />
              </>
            )}

            {activeTab === "members" && (
              <MemberManagement members={members} onRefresh={fetchMembers} />
            )}

            {activeTab === "articles" && <ArticleManagement />}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
