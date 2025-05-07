"use client";
import React from "react";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Trophy, Star, Award, Check, ArrowUp, LucideIcon } from "lucide-react";
import { Achievement } from "./types";

interface AchievementCardProps {
  achievement: Achievement;
  onEdit: (achievement: Achievement) => void;
  onDelete: (id: number) => void;
}

// Helper function to get the right icon component
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Trophy,
    Star,
    Award,
    Check,
    ArrowUp,
    Calendar,
  };

  return iconMap[iconName] || Award;
};

// Format date to locale string
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ar-SA", options);
};

export default function AchievementCard({
  achievement,
  onEdit,
  onDelete,
}: AchievementCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img
          src={achievement.image_url || "/placeholder-image.jpg"}
          alt={achievement.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(achievement)}
            className="p-2 bg-white/70 hover:bg-white rounded-full text-green-600 hover:text-green-700 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(achievement.id)}
            className="p-2 bg-white/70 hover:bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-5" dir="rtl">
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mr-2">
            {achievement.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 font-arabic">
          {achievement.description}
        </p>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Calendar size={16} className="ml-2" />
          <span className="text-sm font-arabic">
            {formatDate(achievement.date)}
          </span>
        </div>
      </div>
    </div>
  );
}
