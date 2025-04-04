"use client"; // Needed in Next.js App Router
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type SectionTitleProps = {
  title: string;
  path?: string; // Path for the section
};

export default function SectionTitle({ title, path }: SectionTitleProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path || ""}>
      <div className="text-center relative group">
        <motion.h2
          className={`text-2xl font-bold relative inline-block transition-colors duration-300 mb-1 ${
            isActive ? "text-white" : "text-gray-300"
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
        </motion.h2>

        {/* Animated underline for active state */}
        {isActive && (
          <motion.div
            className="h-[2px] absolute bottom-0 left-0 right-0 bg-white"
            layoutId="underline"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
          />
        )}

        {/* Hover underline effect */}
        <motion.div
          className="h-[2px] absolute bottom-0 left-0 right-0 bg-white opacity-0 group-hover:opacity-100"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
}
