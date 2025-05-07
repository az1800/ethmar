import React from "react";
import { LineChart } from "lucide-react";
import { ChartsProps } from "./types";
import CategoryDistributionChart from "./CategoryDistributionChart";

const Charts: React.FC<ChartsProps> = ({ categoryStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Monthly Growth Chart (placeholder) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h3
          className="text-lg font-bold text-gray-800 dark:text-white mb-4"
          dir="rtl"
        >
          نمو المستخدمين الشهري
        </h3>
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <LineChart size={64} className="text-gray-400 mb-4" />
            <p
              className="text-gray-500 dark:text-gray-400 text-center font-arabic"
              dir="rtl"
            >
              سيتم عرض الرسم البياني هنا
            </p>
          </div>
        </div>
      </div>

      {/* Content Distribution Chart */}
      <CategoryDistributionChart categoryStats={categoryStats} />
    </div>
  );
};

export default Charts;
