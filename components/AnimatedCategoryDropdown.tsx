import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  FileText,
  LineChart,
  TrendingUp,
  BookOpenCheck,
  Sparkles,
  Bookmark,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// BarChart,
// FileSearch,
// LineChart,
// TrendingUp,
// BookOpen,
// Star,
// ChevronDown,

interface Category {
  id: number;
  name: string;
  icon?: LucideIcon;
}

interface AnimatedCategoryDropdownProps {
  selectedCategory: Category;
  setCategory: (category: Category) => void;
}

const AnimatedCategoryDropdown: React.FC<AnimatedCategoryDropdownProps> = ({
  selectedCategory,
  setCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const categories: Category[] = [
    { id: 1, name: "تحليل القطاعات", icon: PieChart },
    { id: 2, name: "البحوث المالية", icon: FileText },
    { id: 3, name: "التحليل المالي", icon: LineChart },
    { id: 4, name: "قصة سهم", icon: TrendingUp },
    { id: 5, name: "المصطلحات المالية", icon: BookOpenCheck },
    { id: 6, name: "مختارات إثمار المالية", icon: Sparkles },
    { id: 7, name: "منشور مميز", icon: Bookmark },
  ];

  const handleSelect = (category: Category) => {
    setCategory(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center " dir="rtl">
      <div
        className="relative w-full"
        ref={dropdownRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between rounded-lg border border-neutral-600 px-4 py-2 text-sm transition-all h-[2rem] ${
            isOpen
              ? "bg-neutral-800 text-neutral-100"
              : "bg-neutral-900 text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {selectedCategory.icon && <selectedCategory.icon size={18} />}
            <span>{selectedCategory.name}</span>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute mt-2 w-full border border-neutral-600 rounded-lg bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-3 text-neutral-200"
            >
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-1"
              >
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleSelect(category)}
                      className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors ${
                        selectedCategory.id === category.id
                          ? "bg-indigo-900/30 text-indigo-200"
                          : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                      }`}
                    >
                      <span>{category.name}</span>
                      {category.icon && <category.icon size={16} />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedCategoryDropdown;
