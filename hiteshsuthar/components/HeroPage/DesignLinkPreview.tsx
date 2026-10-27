"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export default function DesignLinkPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for following cursor
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  });

  const updatePosition = (
    clientX: number,
    clientY: number,
    isInitial = false,
  ) => {
    const cardWidth = 340;
    const cardHeight = 160;
    const padding = 16;

    // Center card horizontally around cursor and clamp within viewport
    let targetX = clientX - cardWidth / 2;
    if (typeof window !== "undefined") {
      targetX = Math.min(
        Math.max(targetX, padding),
        window.innerWidth - cardWidth - padding,
      );
    }

    // Place preview above cursor; if too close to viewport top, flip below
    let targetY = clientY - cardHeight - 20;
    if (clientY < cardHeight + 30) {
      targetY = clientY + 24;
    }

    if (isInitial) {
      (mouseX as any).jump?.(targetX) ?? mouseX.set(targetX);
      (mouseY as any).jump?.(targetY) ?? mouseY.set(targetY);
      if (typeof (springX as any).jump === "function") {
        (springX as any).jump(targetX);
        (springY as any).jump(targetY);
      }
    } else {
      mouseX.set(targetX);
      mouseY.set(targetY);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY, true);
    setIsOpen(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY, false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Link */}
      <Link
        href="/design"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center gap-0.5 text-neutral-900 dark:text-neutral-100 font-medium hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors cursor-pointer"
      >
        <span>Designs</span>
      </Link>

      {mounted &&
        createPortal(
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: springX,
              y: springY,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.94,
                    filter: "blur(4px)",
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, scale: 0.94, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-[330px] sm:w-[350px] rounded-lg border border-neutral-100 dark:border-neutral-800 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md p-3.5 shadow-xs"
                >
                  {/* Mini 2-Column Showcase Snapshot */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Showcase Item 1: Umami Hero */}
                    <div className="flex flex-col">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src="/Designs/hero.png"
                          alt="Hero section"
                          width={300}
                          height={190}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] mt-1 px-0.5">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
                          Hero section
                        </span>
                      </div>
                    </div>

                    {/* Showcase Item 2: Problem section */}
                    <div className="flex flex-col">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src="/Designs/hero2.png"
                          alt="Problem section"
                          width={300}
                          height={190}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] mt-1 px-0.5">
                        <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
                          Hero section
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
