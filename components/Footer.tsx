"use client";

import Image from "next/image";
import Link from "next/link";
import { nav_list } from "@/constants/generic";
import { useRouter } from "next/navigation";

const Footer = () => {
  
  const router = useRouter();
    const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center space-y-8 py-10 bg-green/10">
        <Image
          onClick={()=>router.push("/")}  
          src="/assets/logo.png"
          alt="image"
          width={300}
          height={300}
          className="h-[146px] w-[177px]"
        />

        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10">
          {nav_list.map((item, index) => (
            <li key={index} className="text-[14px]">
             
                <button
                  onClick={() => handleScroll(item.href)}
                  className="transition hover:opacity-70 cursor-pointer"
                >
                  {item.title}
                </button>
             
            </li>
          ))}
        </ul>
      </div>

      <div className="px-[5%] bg-green flex flex-col md:flex-row py-3 md:py-0 items-center justify-between h-auto md:h-[57px] text-[10px] md:text-[14px] text-white font-semibold">
        <p>©2025 ShapeUp-4Life. All rights reserved.</p>
        <Link href="/privacy-policy" className="hover:opacity-80 transition">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;