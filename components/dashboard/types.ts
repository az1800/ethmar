// import { LucideIcon } from "lucide-react";

// export interface Stats {
//   totalPosts: number;
//   featuredPosts: number;
//   achievements: number;
//   partners: number;
//   members: number;
// }

// export interface Achievement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image_url?: string;
//   icon?: string;
//   created_at?: string;
// }

// export interface AchievementsListProps {
//   achievements: Achievement[];
//   onEdit: (achievement: Achievement) => void;
//   onDelete: (id: number) => void;
//   onAddNew: () => void;
//   loading: boolean;
// }

// export interface Notification {
//   show: boolean;
//   message: string;
//   type: "success" | "error" | "";
// }
// export interface HeroSectionData {
//   page_title: string;
//   title: string;
//   description: string;
// }
// export interface FormData {
//   title: string;
//   description: string;
//   date: string;
//   image_url?: string;
//   icon?: string;
// }
// export interface CategoryStats {
//   sectorAnalysis: number;
//   financialResearch: number;
//   financialAnalysis: number;
//   stockStory: number;
//   financialTerms: number;
//   ithmarPicks: number;
//   featuredPost: number;
// }

// export interface Member {
//   id: number;
//   full_Name: string;
//   Position: string;
//   Committee: string;
//   Gender: string;
// }

// export interface Partner {
//   id: number;
//   name: string;
//   logo_url: string;
// }

// export interface StatCardProps {
//   title: string;
//   value: number;
//   icon: LucideIcon;
//   trend: string;
// }

// export interface SidebarProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// export interface DashboardStatsProps {
//   stats: Stats;
// }

// export interface ChartsProps {
//   categoryStats: CategoryStats;
// }

// export interface AchievementCardProps {
//   achievement: Achievement;
//   onEdit: (achievement: Achievement) => void;
//   onDelete: (id: number) => void;
// }

// // Updated AchievementFormProps to match the implementation
// export interface AchievementFormProps {
//   editingAchievement: Achievement | null;
//   onSubmit: (data: FormData) => Promise<void>;
//   onCancel: () => void;
//   loading: boolean;
// }

// export interface NotificationProps {
//   message: string;
//   type: "success" | "error" | "";
//   show: boolean;
//   onClose?: () => void;
//   autoClose?: boolean;
//   duration?: number;
// }

// export interface ImageUploaderProps {
//   imagePreview: string | null;
//   setImagePreview: (preview: string | null) => void;
// }
import { LucideIcon } from "lucide-react";

export interface Stats {
  totalPosts: number;
  featuredPosts: number;
  achievements: number;
  partners: number;
  members: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image_url?: string;
  icon?: string;
  created_at?: string;
}

export interface AchievementsListProps {
  achievements: Achievement[];
  onEdit: (achievement: Achievement) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
  loading: boolean;
}

// Updated Notification interface to match component usage
// export interface NotificationProps {
//   show: boolean;
//   message: string;
//   type: "success" | "error";
//   onClose?: () => void;
//   autoClose?: boolean;
//   duration?: number;
// }
export interface NotificationProps {
  show: boolean;
  message: string;
  type: "success" | "error";
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}
// Legacy notification interface (keeping for backward compatibility)
export interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

export interface HeroSectionData {
  page_title: string;
  title: string;
  description: string;
}

export interface FormData {
  title: string;
  description: string;
  date: string;
  image_url?: string;
  icon?: string;
}

export interface CategoryStats {
  sectorAnalysis: number;
  financialResearch: number;
  financialAnalysis: number;
  stockStory: number;
  financialTerms: number;
  ithmarPicks: number;
  featuredPost: number;
}

export interface Member {
  id: number;
  full_Name: string;
  Position: string;
  Committee: string;
  Gender: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: string;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface DashboardStatsProps {
  stats: Stats;
}

export interface ChartsProps {
  categoryStats: CategoryStats;
}

export interface AchievementCardProps {
  achievement: Achievement;
  onEdit: (achievement: Achievement) => void;
  onDelete: (id: number) => void;
}

export interface AchievementFormProps {
  editingAchievement: Achievement | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export interface ImageUploaderProps {
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}

// Additional types for Hero Text Management
export interface HeroTextFormErrors {
  title?: string;
  description?: string;
}

export interface HeroTextNotificationState {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}
