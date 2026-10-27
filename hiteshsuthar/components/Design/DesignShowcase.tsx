"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import NAVBAR from "@/components/NAVBAR";
import { designItems, DesignItem } from "@/data/designs/data";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export default function DesignShowcase() {
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number | null>(
    null,
  );

  const activeDesign: DesignItem | null =
    selectedDesignIndex !== null
      ? (designItems[selectedDesignIndex] ?? null)
      : null;

  const handleNext = useCallback(() => {
    if (selectedDesignIndex === null) return;
    setSelectedDesignIndex((prev) =>
      prev !== null ? (prev + 1) % designItems.length : 0,
    );
  }, [selectedDesignIndex]);

  const handlePrev = useCallback(() => {
    if (selectedDesignIndex === null) return;
    setSelectedDesignIndex((prev) =>
      prev !== null ? (prev - 1 + designItems.length) % designItems.length : 0,
    );
  }, [selectedDesignIndex]);

  const handleClose = useCallback(() => {
    setSelectedDesignIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedDesignIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDesignIndex, handleNext, handlePrev, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedDesignIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDesignIndex]);

  // Distribute items into 2 columns for a natural reading flow (left-right-left-right)
  const [col1, col2] = useMemo(() => {
    const left: { item: DesignItem; originalIndex: number }[] = [];
    const right: { item: DesignItem; originalIndex: number }[] = [];
    designItems.forEach((item, idx) => {
      if (idx % 2 === 0) {
        left.push({ item, originalIndex: idx });
      } else {
        right.push({ item, originalIndex: idx });
      }
    });
    return [left, right];
  }, []);

  const renderItem = ({
    item,
    originalIndex,
  }: {
    item: DesignItem;
    originalIndex: number;
  }) => (
    <div
      key={item.id}
      onClick={() => setSelectedDesignIndex(originalIndex)}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image container without card wrapping */}
      <div className="relative overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800/90 bg-neutral-100 dark:bg-neutral-900/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:border-neutral-300 dark:group-hover:border-neutral-700">
        <Image
          src={item.image}
          alt={item.title}
          width={item.width}
          height={item.height}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-auto object-cover block group-hover:scale-[1.015] transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Meta caption line directly under image */}
      <div className="flex items-center justify-between text-sm mt-2.5 px-0.5">
        <span className="font-sans font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {item.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.client}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/60">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col font-sans">
      <NAVBAR />

      {/* Subtle header */}
      <header className="mt-10 mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans">
            Designs
          </h1>
        </div>
        <p className="font-sans text-sm mt-1 text-neutral-500 dark:text-neutral-400">
          A showcase of visual explorations, interfaces, and redesigns.
        </p>
      </header>

      {/* 2-column showcase without card borders */}
      <div className="w-full pb-16 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start">
        <div className="flex flex-col gap-8">
          {col1.map((entry) => renderItem(entry))}
        </div>
        <div className="flex flex-col gap-8">
          {col2.map((entry) => renderItem(entry))}
        </div>
      </div>

      {/* Lightbox Modal on Image Click */}
      {activeDesign && selectedDesignIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative flex flex-col w-full max-w-5xl max-h-[92vh] bg-neutral-900/95 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/80 bg-neutral-950/40">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-neutral-100">
                  {activeDesign.title}
                </span>
                <span className="text-xs text-neutral-400">
                  {activeDesign.client}
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {activeDesign.tag}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400">
                  {selectedDesignIndex + 1} / {designItems.length}
                </span>

                <a
                  href={activeDesign.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                  title="Open original image"
                >
                  <ExternalLink size={16} />
                </a>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Area */}
            <div className="relative flex-1 flex items-center justify-center overflow-auto p-2 sm:p-4 bg-neutral-950/60 min-h-[300px]">
              <Image
                src={activeDesign.image}
                alt={activeDesign.title}
                width={activeDesign.width}
                height={activeDesign.height}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-xl"
                priority
              />

              {designItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous design"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/60 shadow-lg backdrop-blur-xs transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next design"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/60 shadow-lg backdrop-blur-xs transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
