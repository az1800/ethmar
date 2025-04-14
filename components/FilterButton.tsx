import React, { useState } from "react";
import { MotionConfig, motion } from "framer-motion";

interface FilterButtonProps {
  className?: string;
  onClick?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  className = "",
  onClick,
}) => {
  return (
    <div className={className}>
      <AnimatedHamburgerButton onClick={onClick} />
    </div>
  );
};

interface AnimatedHamburgerButtonProps {
  className?: string;
  onClick?: () => void;
}

const AnimatedHamburgerButton: React.FC<AnimatedHamburgerButtonProps> = ({
  className = "",
  onClick,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive((prev) => !prev);
    if (onClick) onClick(); // Call external onClick if provided
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={handleClick}
        className={`relative h-20 w-20 mt-[-1rem] rounded-full bg-white/0 transition-colors hover:bg-white/20 ${className} `}
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-black rounded-sm"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-7 bg-black rounded-sm"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-black rounded-sm"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "50%",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
      width: "2.5rem",
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "50%",
    },
  },
};

export default FilterButton;
