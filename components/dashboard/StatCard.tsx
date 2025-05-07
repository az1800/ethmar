import React from "react";
import { TrendingUp } from "lucide-react";
import { StatCardProps } from "./types";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(to right, #2C953F, #1F682C)",
          }}
        >
          <Icon className="text-white" size={24} />
        </div>
        <div className="text-right" dir="rtl">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-arabic">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-end" dir="rtl">
        <TrendingUp size={16} className="text-green-600 ml-1" />
        <span className="text-xs text-green-600 font-arabic">{trend}</span>
      </div>
    </div>
  );
};

export default StatCard;
