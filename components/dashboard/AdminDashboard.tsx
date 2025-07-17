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
import { useNotification } from "../Notification"; // Import the hook
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import {
  deleteAchievement,
  updateAchievement,
  addAchievement,
} from "@/Services/acheivementsAPI";
import { BookOpen, Plus } from "lucide-react";
// Import unified types
import { Achievement, Stats, CategoryStats, FormData } from "./types";
import { Member } from "./MemberForm";
import ArticleManagement from "./ArticleManagement";
import HeroTextManagement from "./HeroTextManagement";

interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { showNotification } = useNotification(); // Use the notification hook
  const [achievementsLoading, setAchievementsLoading] = useState<boolean>(true);
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

  // Remove the old notification state as we're using the context now
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
      showNotification({
        message: "حدث خطأ أثناء تحميل إحصائيات الفئات",
        type: "error",
      });
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
      showNotification({
        message: "حدث خطأ أثناء تحميل الإحصائيات",
        type: "error",
      });
      setLoading(false);
    }
  };

  // const fetchAchievements = async (): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     const achievementsData = await getAcheivements();
  //     setAchievements(achievementsData || []);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching achievements:", error);
  //     showNotification({
  //       message: "حدث خطأ أثناء تحميل الإنجازات",
  //       type: "error",
  //     });
  //     setLoading(false);
  //   }
  // };
  const fetchAchievements = async (): Promise<void> => {
    try {
      setAchievementsLoading(true);
      const achievementsData = await getAcheivements();
      setAchievements(achievementsData || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      showNotification({
        message: "حدث خطأ أثناء تحميل الإنجازات",
        type: "error",
      });
    } finally {
      setAchievementsLoading(false);
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
      showNotification({
        message: "حدث خطأ أثناء تحميل الأعضاء",
        type: "error",
      });
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
      showNotification({
        message: "حدث خطأ أثناء تحميل الشركاء",
        type: "error",
      });
      setLoading(false);
    }
  };

  const handleDeleteAchievement = async (id: number): Promise<void> => {
    if (window.confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
      try {
        setLoading(true);
        await deleteAchievement(id);
        // Update local state
        setAchievements(
          achievements.filter((achievement) => achievement.id !== id)
        );
        showNotification({
          message: "تم حذف الإنجاز بنجاح!",
          type: "success",
        });
      } catch (error) {
        console.error("Error deleting achievement:", error);
        showNotification({
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

  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {
      setLoading(true);
      if (editingAchievement) {
        await updateAchievement(editingAchievement.id, formData);
        showNotification({
          message: "تم تحديث الإنجاز بنجاح!",
          type: "success",
        });
      } else {
        await addAchievement(formData);
        showNotification({
          message: "تم إضافة الإنجاز بنجاح!",
          type: "success",
        });
      }
      await fetchAchievements();
      setEditingAchievement(null);
      setActiveTab("achievements");
    } catch (error) {
      console.error("Error saving achievement:", error);
      showNotification({
        message: "حدث خطأ أثناء حفظ الإنجاز",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Remove the old notification component */}
        <div className="flex flex-col md:flex-row h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {loading ? (
            <Loader />
          ) : (
            <main className="flex-1 p-6">
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
              {/* {activeTab === "achievements" && ( 
                <AchievementsList
                  achievements={achievements}
                  onEdit={handleEditAchievement}
                  onDelete={handleDeleteAchievement}
                  onAddNew={() => {
                    setActiveTab("add-achievement");
                    setEditingAchievement(null);
                  }}
                  loading={loading}
                />
              )} */}
              {activeTab === "achievements" && (
                <AchievementsList
                  achievements={achievements}
                  onEdit={handleEditAchievement}
                  onDelete={handleDeleteAchievement}
                  onAddNew={() => {
                    setActiveTab("add-achievement");
                    setEditingAchievement(null);
                  }}
                  loading={achievementsLoading} // Use specific loading state
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
              {activeTab === "hero-texts" && <HeroTextManagement />}
            </main>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
