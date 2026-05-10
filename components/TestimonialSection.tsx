"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

const testimonials = [
  {
    name: "James L.",
    image: "/assets/person1.jpg",
    text: `"ShapeUp4Life helped me understand my body and build habits I can stick to. I lost 6 kg in 12 weeks and feel more confident than ever!"`,
  },
  {
    name: "Sarah M.",
    image: "/assets/person1.jpg",
    text: `"This programme changed my daily routine completely. I feel more energetic and in control of my health."`,
  },
  {
    name: "Ali R.",
    image: "/assets/person.jpg",
    text: `"Simple, practical, and effective. I finally found something that actually works long-term."`,
  },
];

const TestimonialSection = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setAnimate(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimate(false);
    }, 200);
  };

  const { name, image, text } = testimonials[activeIndex];

  return (
    <section className="relative w-full py-12 md:py-16 px-[5%] bg-white overflow-hidden">

      {/* Heading */}
      <h3
        className="text-center text-[30px] md:text-[42px] mb-10"
        style={{ fontFamily: "ArialRounded" }}
      >
        Testimonials
      </h3>

      {/* Quote area */}
      <div className="relative max-w-2xl mx-auto">

        {/* Opening decorative quote — top left */}
        <Image
          src="/assets/leftComa.png"
          alt=""
          width={80}
          height={80}
          className="absolute -top-4 -left-2 md:-left-6 w-14 md:w-20 select-none"
          aria-hidden
        />

        {/* Centered testimonial content */}
        <div
          className={`flex flex-col items-center text-center gap-4 px-10 md:px-16 transition-opacity duration-200 ${
            animate ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <p
            className="text-[#1F7FB6] font-bold text-[15px] md:text-[16px]"
            style={{ fontFamily: "ArialRounded" }}
          >
            {name}
          </p>

          {/* Quote text */}
          <p className="italic text-[15px] md:text-[18px] text-gray-700 leading-relaxed">
            {text}
          </p>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 mt-1">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => changeSlide(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-5 h-2 bg-[#2F80ED]"
                    : "w-2 h-2 bg-[#AFCBFF]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Closing decorative quote — bottom right */}
        <Image
          src="/assets/rightComa.png"
          alt=""
          width={80}
          height={80}
          className="absolute -bottom-8 -right-2 md:-right-6 w-14 md:w-20 select-none"
          aria-hidden
        />
      </div>

     

    </section>
  );
};

export default TestimonialSection;
