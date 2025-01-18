import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip: React.FC<{
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
  children: React.ReactNode;
  positionOffset?: { right?: number; left?: number }; // Add a positionOffset prop
}> = ({ items, children, positionOffset }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHoveredIndex(items[0].id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence mode="popLayout">
        {hoveredIndex === items[0].id && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
              ...positionOffset, // Dynamically apply left or right offsets
            }}
            className="absolute -top-16 flex text-xs flex-col items-end justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
          >
            <div className="font-bold text-white relative z-30 text-base">
              {items[0].name}
            </div>
            <div className="text-white text-xs">{items[0].designation}</div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
