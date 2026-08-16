"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger position within a group. Each step adds 0.1s. */
  index?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fade-and-rise on scroll: 20px translate, 0.5s, 0.1s stagger.
 * Renders motionless (but still visible) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </MotionTag>
  );
}
