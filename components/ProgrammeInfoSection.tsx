"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const programmes = [
  {
    title: "Healthy eating education",
    image: "/assets/programme1.png",
    borderClass: "border-green",
  },
  {
    title: "Physical activity guidance",
    image: "/assets/img2.png",
    borderClass: "border-red",
  },
  {
    title: "Behaviour change strategies",
    image: "/assets/img1.png",
    borderClass: "border-primary",
  },
  {
    title: "Healthy eating education",
    image: "/assets/programme1.png",
    borderClass: "border-green",
  },
  {
    title: "Physical activity guidance",
    image: "/assets/img2.png",
    borderClass: "border-red",
  },
  {
    title: "Mindfulness change strategies",
    image: "/assets/img1.png",
    borderClass: "border-primary",
  },
];

const ProgrammeInfoSection = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = programmes.length - visibleCount;

  // Clamp index when screen size changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const navigate = (direction: "prev" | "next") => {
    if (fading) return;
    const step = visibleCount;
    const next =
      direction === "next"
        ? Math.min(maxIndex, index + step)
        : Math.max(0, index - step);
    if (next === index) return;

    if (isMobile) {
      // Translate-based: just update index, CSS handles the motion
      setIndex(next);
    } else {
      // Fade transition for desktop page flip
      setFading(true);
      setTimeout(() => {
        setIndex(next);
        setFading(false);
      }, 250);
    }
  };

  const visibleCards = programmes.slice(index, index + visibleCount);
  const totalPages = Math.ceil(programmes.length / visibleCount);
  const currentPage = Math.floor(index / visibleCount);

  return (
    <section className="w-full px-[5%] py-10 md:py-16">
      {/* Header: title left, description right */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 md:mb-16 gap-4">
        <h2
          className="text-[30px] md:text-[46px] leading-tight"
          style={{ fontFamily: "ArialRounded" }}
        >
          About the
          <br />
          Programme
        </h2>
        <p className="text-[12px] md:text-[16px] max-w-[280px] md:text-right mt-0 md:mt-2">
          Commissioned locally and delivered by experienced professionals, the
          programme combines:
        </p>
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Left arrow */}
        <button
          onClick={() => navigate("prev")}
          disabled={index === 0}
          className="shrink-0 w-[44px] h-[44px] md:w-[79px] md:h-[79px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000] disabled:opacity-40 transition-opacity"
          aria-label="Previous"
        >
          <ArrowLeft className="w-5 h-5 md:w-9 md:h-9 text-white" />
        </button>

        {/* Cards area */}
        <div className="flex-1 overflow-hidden">
          {isMobile ? (
            // Mobile: translate-based slide
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {programmes.map((prog, i) => (
                <div key={i} className="w-full shrink-0 flex flex-col items-center text-center">
                  <div
                    className={`w-full h-[280px] overflow-hidden rounded-[56px] border-[13px] ${prog.borderClass}`}
                  >
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4
                    className="text-[22px] mt-3"
                    style={{ fontFamily: "ArialRounded" }}
                  >
                    {prog.title}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: page flip with stagger
            <div
              className="grid grid-cols-3 gap-6 lg:gap-10 items-start transition-opacity duration-250"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {visibleCards.map((prog, i) => (
                <div
                  key={`${index}-${i}`}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-full h-[300px] lg:h-[354px] overflow-hidden rounded-[56px] border-[13px] ${prog.borderClass}`}
                  >
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      width={400}
                      height={400}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4
                    className="text-[26px] md:text-[32px] mt-3"
                    style={{ fontFamily: "ArialRounded" }}
                  >
                    {prog.title}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => navigate("next")}
          disabled={index >= maxIndex}
          className="shrink-0 w-[44px] h-[44px] md:w-[79px] md:h-[79px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000] disabled:opacity-40 transition-opacity"
          aria-label="Next"
        >
          <ArrowRight className="w-5 h-5 md:w-9 md:h-9 text-white" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!fading) setIndex(i * visibleCount);
            }}
            aria-label={`Go to page ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              currentPage === i ? "bg-[#1F7FB6]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProgrammeInfoSection;
