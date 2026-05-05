"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { User, Menu, X } from "lucide-react";
import { nav_list } from "@/constants/generic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const handleScroll = (id:any) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Scroll spy
  useEffect(() => {
    const sections = nav_list.map((item) =>
      document.querySelector(item.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
return (
  <div className="w-full fixed top-0 left-0 z-50">
    
    {/* NAVBAR */}
    <div className="mx-auto w-[95%] pl-5 md:pl-10 pr-5 md:pr-8 py-2.5 mt-5 rounded-full bg-[#F5F5F5]/90 backdrop-blur-md flex items-center justify-between">

      {/* LOGO */}
      <Image
        onClick={()=>router.push("/")}
        src="/assets/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="w-[50px] md:w-[80px]"
      />

      {/* DESKTOP NAV */}
      <ul className="hidden md:flex items-center gap-10">
        {nav_list.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleScroll(item.href)}
              className={`text-[14px] transition ${
                active === item.href.replace("#", "")
                  ? "font-bold text-black"
                  : "text-gray-600 hover:opacity-70"
              }`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")} variant="primary">
              <p>Go to Dashboard</p>
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} variant="primary">
              <div className="w-8 h-8 border rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <p>Login / Sign Up</p>
            </Button>
          )}
        </div>

        {/* MENU BUTTON */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>

    {/* MOBILE DROPDOWN (NOW IN FLOW) */}
    <div
      className={`w-[90%] rounded-[14px] mx-auto bg-[#F5F5F5] shadow-md overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96  opacity-100 mt-1" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center py-4 gap-4">
        {nav_list.map((item, index) => (
          <button
            key={index}
            onClick={() => handleScroll(item.href)}
            className={`text-[16px] transition ${
              active === item.href.replace("#", "")
                ? "font-bold text-black"
                : "text-gray-600 hover:opacity-70"
            }`}
          >
            {item.title}
          </button>
        ))}

        <div className="mt-2">
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")} variant="primary">
              <p>Go to Dashboard</p>
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} variant="primary">
              <div className="w-8 h-8 border rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <p>Login / Sign Up</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default Navbar;