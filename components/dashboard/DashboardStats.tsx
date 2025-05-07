import React from "react";
import { Book, Star, Award, Briefcase, Users, TrendingUp } from "lucide-react";
import { DashboardStatsProps } from "./types";
import StatCard from "./StatCard";

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "إجمالي المقالات",
      value: stats.totalPosts,
      icon: Book,
      trend: "زيادة 12% من الشهر الماضي",
    },
    {
      title: "المقالات المميزة",
      value: stats.featuredPosts,
      icon: Star,
      trend: "زيادة 3% من الشهر الماضي",
    },
    {
      title: "الإنجازات",
      value: stats.achievements,
      icon: Award,
      trend: "إنجاز جديد هذا الشهر",
    },
    {
      title: "الشركاء",
      value: stats.partners,
      icon: Briefcase,
      trend: "شريكين جدد هذا الشهر",
    },
    {
      title: "الأعضاء",
      value: stats.members,
      icon: Users,
      trend: "زيادة 8% من الشهر الماضي",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
