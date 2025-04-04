"use client";

import React, { useState } from "react";
import Filter from "./Filter";
import {
  BarChart,
  FileSearch,
  LineChart,
  TrendingUp,
  BookOpen,
  Star,
  Layers, // ✅ Replacing Layers with List
} from "lucide-react";
import { useFilters } from "../Contexts/PostFiltersContext";

const filters = [
  { id: 1, name: "الجميع", icon: Layers },
  { id: 2, name: "تحليل القطاعات", icon: BarChart },
  { id: 3, name: "البحوث المالية", icon: FileSearch },
  { id: 4, name: "التحليل المالي", icon: LineChart },
  { id: 5, name: "قصة سهم", icon: TrendingUp },
  { id: 6, name: "المصطلحات المالية", icon: BookOpen },
  { id: 7, name: "مختارات إثمار المالية", icon: Star },
];

export default function PostsFilters() {
  const { activeFilter, setActiveFilter } = useFilters();

  function handleFilterClick(id: number) {
    setActiveFilter((prev) => (prev === id ? null : id)); // ✅ Now TypeScript will accept this
  }

  return (
    <div className="flex flex-col gap-6 ">
      <b>
        <h1 className="text-4xl text-right">الفئات</h1>
      </b>
      {filters.map((filter) => (
        <Filter
          key={filter.id}
          name={filter.name}
          icon={filter.icon}
          isActive={activeFilter === filter.id}
          onClick={() => handleFilterClick(filter.id)}
        />
      ))}
    </div>
  );
}
