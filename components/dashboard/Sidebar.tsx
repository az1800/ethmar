import React from "react";
import {
  BarChart2,
  Award,
  BookOpen,
  Briefcase,
  Users,
  Home,
} from "lucide-react"; // ✨ Import Home icon
import { SidebarProps } from "./types";
// import { useRouter } from "next/router"; // ✨ Import useRouter
import { useRouter } from "next/navigation"; // ✅ for App Router

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter(); // ✨ Initialize router

  const menuItems = [
    {
      id: "home",
      icon: <Home size={20} className="ml-3" style={{ color: "#2C953F" }} />,
      label: "الرئيسية",
    },
    {
      id: "dashboard",
      icon: (
        <BarChart2 size={20} className="ml-3" style={{ color: "#2C953F" }} />
      ),
      label: "الإحصائيات",
    },
    {
      id: "achievements",
      icon: <Award size={20} className="ml-3" style={{ color: "#2C953F" }} />,
      label: "الإنجازات",
    },
    {
      id: "articles",
      icon: (
        <BookOpen size={20} className="ml-3" style={{ color: "#2C953F" }} />
      ),
      label: "المقالات",
    },
    {
      id: "partners",
      icon: (
        <Briefcase size={20} className="ml-3" style={{ color: "#2C953F" }} />
      ),
      label: "الشركاء",
    },
    {
      id: "members",
      icon: <Users size={20} className="ml-3" style={{ color: "#2C953F" }} />,
      label: "الأعضاء",
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2
          className="text-xl font-bold text-gray-800 dark:text-white text-center"
          dir="rtl"
        >
          لوحة التحكم
        </h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.id === "home") {
                    router.push("/"); // ✨ Navigate to Home if clicked
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  activeTab === item.id
                    ? "bg-green-50 dark:bg-green-900/20 border-r-4 border-green-600"
                    : ""
                }`}
                dir="rtl"
              >
                {item.icon}
                <span className="font-arabic">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
