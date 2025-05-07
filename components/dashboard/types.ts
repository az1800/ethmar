// // import { LucideIcon } from "lucide-react";

// // export interface Stats {
// //   totalPosts: number;
// //   featuredPosts: number;
// //   achievements: number;
// //   partners: number;
// //   members: number;
// // }

// // export interface Achievement {
// //   id: number;
// //   title: string;
// //   description: string;
// //   date: string;
// //   image_url: string;
// //   icon: string;
// // }

// // export interface Notification {
// //   show: boolean;
// //   message: string;
// //   type: "success" | "error" | "";
// // }

// // export interface FormData {
// //   title: string;
// //   description: string;
// //   date: string;
// //   icon: string;
// // }

// // export interface CategoryStats {
// //   sectorAnalysis: number;
// //   financialResearch: number;
// //   financialAnalysis: number;
// //   stockStory: number;
// //   financialTerms: number;
// //   ithmarPicks: number;
// //   featuredPost: number;
// // }

// // export interface Member {
// //   id: number;
// //   full_Name: string;
// //   Position: string;
// //   Committee: string;
// //   Gender: string;
// // }

// // export interface Partner {
// //   id: number;
// //   name: string;
// //   logo_url: string;
// // }

// // export interface StatCardProps {
// //   title: string;
// //   value: number;
// //   icon: LucideIcon;
// //   trend: string;
// // }

// // export interface SidebarProps {
// //   activeTab: string;
// //   setActiveTab: (tab: string) => void;
// // }

// // export interface DashboardStatsProps {
// //   stats: Stats;
// // }

// // export interface ChartsProps {
// //   categoryStats: CategoryStats;
// // }

// // export interface AchievementsListProps {
// //   achievements: Achievement[];
// //   onEdit: (achievement: Achievement) => void;
// //   onDelete: (id: number) => void;
// //   onAddNew: () => void;
// // }

// // export interface AchievementCardProps {
// //   achievement: Achievement;
// //   onEdit: (achievement: Achievement) => void;
// //   onDelete: (id: number) => void;
// // }

// // export interface AchievementFormProps {
// //   achievement: Achievement | null;
// //   onSave: (
// //     formData: any,
// //     files: { image?: File; icon?: File }
// //   ) => Promise<void>;
// //   onCancel: () => void;
// // }

// // export interface NotificationProps {
// //   message: string;
// //   type: string;
// // }

// // export interface ImageUploaderProps {
// //   initialImage?: string | null;
// //   onImageChange: (file: File | null) => void;
// //   label: string;
// // }
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
//   image_url: string;
//   icon: string;
// }

// export interface Notification {
//   show: boolean;
//   message: string;
//   type: "success" | "error" | "";
// }

// export interface FormData {
//   title: string;
//   description: string;
//   date: string;
//   icon: string;
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

// export interface AchievementsListProps {
//   achievements: Achievement[];
//   onEdit: (achievement: Achievement) => void;
//   onDelete: (id: number) => void;
//   onAddNew: () => void;
// }

// export interface AchievementCardProps {
//   achievement: Achievement;
//   onEdit: (achievement: Achievement) => void;
//   onDelete: (id: number) => void;
// }

// // export interface AchievementFormProps {
// //   achievement: Achievement | null;
// //   onSave: (
// //     formData: FormData,
// //     files: { image?: File; icon?: File }
// //   ) => Promise<void>;
// //   onCancel: () => void;
// // }
// interface AchievementFormProps {
//   achievement: Achievement | null; // Changed from editingAchievement to match AdminDashboard
//   onSave: (
//     data: FormData,
//     files: {
//       image?: File;
//       icon?: File;
//     }
//   ) => Promise<void>; // Updated to match AdminDashboard's handleSaveAchievement
//   onCancel: () => void;
//   loading?: boolean; // Made optional since it might not always be provided
// }
// export interface NotificationProps {
//   message: string;
//   type: "success" | "error" | "";
//   show?: boolean;
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

// export interface Achievement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   image_url: string;
//   icon: string;
// }
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
}

export interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

// Unified FormData interface to be used across components
// export interface FormData {
//   title: string;
//   description: string;
//   date: string;
//   image_url?: string | null;
//   icon?: string;
// }
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

// Updated AchievementFormProps to match the implementation
export interface AchievementFormProps {
  editingAchievement: Achievement | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export interface NotificationProps {
  message: string;
  type: "success" | "error" | "";
  show?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export interface ImageUploaderProps {
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}
