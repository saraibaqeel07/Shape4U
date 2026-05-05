"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const programmes = [
  {
    title: "Healthy eating education",
    image: "/assets/programme1.png",
    border: "border-green",
  },
  {
    title: "Physical activity guidance",
    image: "/assets/img2.png",
    border: "border-red",
  },
  {
    title: "Behaviour change strategies",
    image: "/assets/img1.png",
    border: "border-primary",
  },

  // Duplicate set
  {
    title: "Healthy eating education",
    image: "/assets/programme1.png",
    border: "border-green",
  },
  {
    title: "Physical activity guidance",
    image: "/assets/img2.png",
    border: "border-red",
  },
  {
    title: "Mindfulness change strategies",
    image: "/assets/img1.png",
    border: "border-primary",
  },
];

const ProgrammeInfoSection = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index + 3 < programmes.length) {
      setIndex(index + 3);
    }
  };

  const prevSlide = () => {
    if (index - 3 >= 0) {
      setIndex(index - 3);
    }
  };

  const current = programmes.slice(index, index + 3);

  return (
    <div className="flex flex-col w-full px-[5%] items-center text-center">
      
      {/* Heading */}
      <div>
        <h3
          className="text-[30px] md:text-[46px]"
          style={{ fontFamily: "ArialRounded" }}
        >
          About the Programme
        </h3>
        <p className="text-[12px] md:text-[16px] max-w-md">
          Commissioned locally and delivered by experienced professionals, the
          programme combines:
        </p>
      </div>

      {/* Cards */}
      <div className="w-full lg:w-fit mt-16 grid grid-cols-1 md:grid-cols-3 gap-6  lg:gap-10">

        {/* Card 1 */}
        {current[0] && (
          <div className="space-y-3 w-full  w-fit text-center flex flex-col items-center">
            <div
              className={`w-full   lg:w-full h-[300px] lg:h-[354px] overflow-hidden rounded-[56px] border-[13px] ${current[0].border}`}
            >
              <Image
                src={current[0].image}
                alt="programme"
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h4
              className=" text-[26px] max-w-5/6 md:text-[32px]"
              style={{ fontFamily: "ArialRounded" }}
            >
              {current[0].title}
            </h4>
          </div>
        )}

        {/* Card 2 (with margin-top) */}
        {current[1] && (
          <div className="space-y-3 w-full mt-0 md:mt-40 w-fit text-center flex flex-col items-center">
            <div
              className={`w-full  lg:w-full h-[300px] lg:h-[354px] overflow-hidden rounded-[56px] border-[13px] ${current[1].border}`}
            >
              <Image
                src={current[1].image}
                alt="programme"
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h4
              className="text-[26px] max-w-5/6 md:text-[32px]"
              style={{ fontFamily: "ArialRounded" }}
            >
              {current[1].title}
            </h4>
          </div>
        )}

        {/* Card 3 */}
        {current[2] && (
          <div className="space-y-3 w-full w-fit  text-center flex flex-col items-center">
            <div
              className={`w-full   lg:w-full h-[300px] lg:h-[354px] overflow-hidden rounded-[56px] border-[13px] ${current[2].border}`}
            >
              <Image
                src={current[2].image}
                alt="programme"
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h4
              className="text-[26px] max-w-5/6 md:text-[32px]"
              style={{ fontFamily: "ArialRounded" }}
            >
              {current[2].title}
            </h4>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={prevSlide}
          disabled={index === 0}
          className="w-[40px] h-[40px] md:w-[79px] md:h-[79px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000] disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5 md:w-9 md:h-9 text-white" />
        </button>

        <button
          onClick={nextSlide}
          disabled={index + 3 >= programmes.length}
          className="w-[40px] h-[40px] md:w-[79px] md:h-[79px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000] disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5 md:w-9 md:h-9 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProgrammeInfoSection;