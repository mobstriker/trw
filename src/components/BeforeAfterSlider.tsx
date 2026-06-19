import React, { useState, useRef, useEffect } from "react";
import { Move, Shield } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      // We block default behavior to prevent browser page panning while adjusting the restoration slider on mobile!
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-4xl mx-auto" id="before-after-slider-container">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-semibold tracking-wide uppercase">
          Craftsmanship Comparison
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-2">
          Interactive Restoration Showcase
        </h3>
        <p className="text-neutral-600 mt-2 max-w-xl mx-auto text-xs sm:text-sm">
          Drag the orange divider below to view weather-damaged decking and fractured shingles transition into our fully warrantied, pristine architectural shingle layer.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-[240px] xs:h-[320px] sm:h-[400px] lg:h-[460px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-200 shadow-xl"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
          }
        }}
      >
        {/* BEFORE IMAGE (weathered, mossy roof close-up / storm damage simulation) - BASE LAYER */}
        <div className="absolute inset-0 bg-neutral-900 pointer-events-none select-none">
          <img
            src="https://i.imgur.com/egrUd3F.png"
            alt="Weather damaged attic and composite shingle roof"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable="false"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-red-600/90 backdrop-blur-md text-white py-1 px-2 sm:py-1.5 sm:px-3 rounded-md text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Before<span className="hidden xs:inline">: Damaged</span>
          </div>
        </div>

        {/* AFTER IMAGE (gorgeous pristine finished architectural roof shingle close-up) - CLIPPED TOP LAYER */}
        <div
          className="absolute inset-0 bg-neutral-900 pointer-events-none select-none overflow-hidden transition-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src="https://i.imgur.com/8hQd88I.png"
            alt="Pristine completed architectural shingle roof"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable="false"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* AFTER BADGE - OVERLAID FOR PERSISTENT VISIBILITY */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-emerald-600/95 backdrop-blur-md text-white py-1 px-2 sm:py-1.5 sm:px-3 rounded-md text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1 pointer-events-none select-none">
          <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
          After<span className="hidden xs:inline">: Premium Grade</span>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-400 cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="h-20 sm:h-28 w-1 bg-white opacity-80 rounded-md"></div>
          <div className="absolute h-8 w-8 sm:h-10 sm:w-10 bg-orange-500 rounded-full border-2 border-white text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-150">
            <Move className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      {/* FOOTER CALOUT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
        <div className="text-left">
          <p className="text-xs font-bold uppercase text-neutral-400 tracking-wider">QC Standards Passed</p>
          <p className="text-sm font-medium text-neutral-800">100% full underlayer replacement, GAF starter strips, and zinc mildew-preventative caps.</p>
        </div>
        <div className="flex items-center gap-2 text-orange-600 text-sm font-semibold shrink-0">
          <span>Warranty Cert: 25-Year Premium Installation</span>
        </div>
      </div>
    </div>
  );
}
