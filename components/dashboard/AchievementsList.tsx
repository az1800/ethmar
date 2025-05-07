import React from "react";
import { Plus, Award } from "lucide-react";
import { AchievementsListProps } from "./types";
import AchievementCard from "./AchievementCard";

const AchievementsList: React.FC<AchievementsListProps> = ({
  achievements,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          الإنجازات
        </h1>
        <button
          onClick={onAddNew}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} className="ml-2" />
          <span className="font-arabic">إضافة إنجاز جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements && achievements.length > 0 ? (
          achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-xl">
            <Award
              size={64}
              className="text-gray-300 dark:text-gray-600 mb-4"
            />
            <p
              className="text-lg text-gray-500 dark:text-gray-400 font-arabic"
              dir="rtl"
            >
              لا توجد إنجازات مضافة حالياً
            </p>
            <button
              onClick={onAddNew}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-arabic"
              dir="rtl"
            >
              إضافة إنجاز جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsList;
