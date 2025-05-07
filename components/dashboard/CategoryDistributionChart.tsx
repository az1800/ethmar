// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { ChartsProps } from "./types";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CategoryDistributionChart: React.FC<ChartsProps> = ({
//   categoryStats,
// }) => {
//   const chartData = {
//     labels: [
//       "تحليل القطاعات",
//       "البحوث المالية",
//       "التحليل المالي",
//       "قصة سهم",
//       "المصطلحات المالية",
//       "مختارات إثمار المالية",
//       "منشور مميز",
//     ],
//     datasets: [
//       {
//         label: "عدد المقالات",
//         data: [
//           categoryStats.sectorAnalysis,
//           categoryStats.financialResearch,
//           categoryStats.financialAnalysis,
//           categoryStats.stockStory,
//           categoryStats.financialTerms,
//           categoryStats.ithmarPicks,
//           categoryStats.featuredPost,
//         ],
//         backgroundColor: [
//           "#0AAF08", // Light Green
//           "#6BB579", // Light Green Secondary
//           "#2C953F", // Primary Green
//           "#1F682C", // Dark Green
//           "#164B20", // Darker Green
//           "#A5704A", // Dark Brown
//           "#B33030", // Dark Red for featured posts
//         ],
//         borderColor: [
//           "#0AAF08",
//           "#6BB579",
//           "#2C953F",
//           "#1F682C",
//           "#164B20",
//           "#A5704A",
//           "#B33030",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     indexAxis: "y" as const, // Horizontal bar chart
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
//       <h3
//         className="text-lg font-bold text-gray-800 dark:text-white mb-4"
//         dir="rtl"
//       >
//         توزيع المحتوى
//       </h3>
//       <div className="h-80">
//         <Bar data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default CategoryDistributionChart;
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartsProps } from "./types";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistributionChart: React.FC<ChartsProps> = ({
  categoryStats,
}) => {
  const chartData = {
    labels: [
      "تحليل القطاعات",
      "البحوث المالية",
      "التحليل المالي",
      "قصة سهم",
      "المصطلحات المالية",
      "مختارات إثمار المالية",
      "منشور مميز",
    ],
    datasets: [
      {
        data: [
          categoryStats.sectorAnalysis,
          categoryStats.financialResearch,
          categoryStats.financialAnalysis,
          categoryStats.stockStory,
          categoryStats.financialTerms,
          categoryStats.ithmarPicks,
          categoryStats.featuredPost,
        ],
        backgroundColor: [
          "#0AAF08", // Light Green
          "#6BB579", // Light Green Secondary
          "#2C953F", // Primary Green
          "#1F682C", // Dark Green
          "#164B20", // Darker Green
          "#A5704A", // Dark Brown
          "#B33030", // Dark Red for featured posts
        ],
        borderColor: [
          "#0AAF08",
          "#6BB579",
          "#2C953F",
          "#1F682C",
          "#164B20",
          "#A5704A",
          "#B33030",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        rtl: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <h3
        className="text-lg font-bold text-gray-800 dark:text-white mb-4"
        dir="rtl"
      >
        توزيع المحتوى
      </h3>
      <div className="h-80">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
