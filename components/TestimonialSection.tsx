"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "James L.",
    text: `"ShapeUp4Life helped me understand my body and build habits I can stick to. I lost 6 kg in 12 weeks and feel more confident than ever!"`,
  },
  {
    name: "Sarah M.",
    text: `"This programme changed my daily routine completely. I feel more energetic and in control of my health."`,
  },
  {
    name: "Ali R.",
    text: `"Simple, practical, and effective. I finally found something that actually works long-term."`,
  },
];

const TestimonialSection = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [animate, setAnimate] = useState(false);

  const changeSlide = (newIndex:any, dir:any) => {
    setDirection(dir);
    setAnimate(true);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimate(false);
    }, 200); // exit animation time
  };

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    changeSlide(newIndex, "right");
  };

  const prevSlide = () => {
    const newIndex =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    changeSlide(newIndex, "left");
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="max-w-fit flex flex-col md:flex-row items-center md:items-start gap-4">

        {/* LEFT */}
        <div className="flex flex-col items-center">
          <div className="w-[240px] z-10 h-[240px] overflow-hidden rounded-full border-[13px] border-green">
            <Image
              src={"/assets/person1.jpg"}
              alt="person"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-[22px] -mt-8 pt-10 rounded-[22px] font-bold bg-green p-3">
            {testimonials[activeIndex].name}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[90%] flex-wrap lg:w-[610px] flex flex-col items-center md:items-start space-y-6">

          {/* ✨ Animated Text */}
          <p
            className={`text-[20px] md:text-[24px] lg:text-[30px] italic transition-all duration-300 ${
              animate
                ? direction === "right"
                  ? "-translate-x-10 opacity-0"
                  : "translate-x-10 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {testimonials[activeIndex].text}
          </p>

          {/* DOTS */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  changeSlide(
                    index,
                    index > activeIndex ? "right" : "left"
                  )
                }
                className={`rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-5 h-2 bg-[#2F80ED]"
                    : "w-2 h-2 bg-[#AFCBFF]"
                }`}
              />
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3">
            <Button onClick={()=>router.push("/signup")} variant="primary" className="w-[180px]">
              Create Account
            </Button>

            <Button onClick={()=>router.push("/login")} variant="blue" className="w-[180px]">
              Log In
            </Button>
          </div>

          {/* ARROWS */}
          {/* <div className="flex items-center gap-4 mt-4">
            <button
              onClick={prevSlide}
              className="w-[40px] h-[40px] md:w-[59px] md:h-[59px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000]"
            >
              <ArrowLeft className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="w-[40px] h-[40px] md:w-[59px] md:h-[59px] rounded-full bg-[#1F7FB6] flex items-center justify-center shadow-[5px_4px_0px_#000]"
            >
              <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;