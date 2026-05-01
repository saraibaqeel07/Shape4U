"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LogoutModal from "./LogoutModal";

interface SidebarSkeletonProps {
  isOpen: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  sidebarItems?: any[];
}

export default function SidebarSkeleton({ isOpen, onClose,onOpen, sidebarItems }: SidebarSkeletonProps) {

  const pathname = usePathname()
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  console.log("pathname: ", pathname)

  const handleLogoutConfirm = () => {
    logout();
    router.replace("/login");
  };

  const checkCurrent = (href: string) => {
    if (pathname === href) return true;

    const pathSegments = pathname.split("/").filter(Boolean);
    const hrefSegments = href.split("/").filter(Boolean);

    if (hrefSegments.length >= pathSegments.length) return false;

    return (
      hrefSegments.length > 1 &&
      hrefSegments.every((seg, index) => seg === pathSegments[index])
    );
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  return (
    <div className="max-h-[calc(100vh-16px)]  overflow-hidden h-screen overflow-y-auto sticky  top-0 z-50">
      {/* OVERLAY (Mobile) */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0  bg-black/40 md:hidden md:bg-transparent z-40 transition-opacity ",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* SIDEBAR */}
      <aside
        className={clsx(
          "fixed top-0 left-0  h-full z-50  flex flex-col bg-[#F5F5F5] rounded-r-[14px] md:rounded-[21px] border-r border-black/10",
          "transition-all duration-300 ease-in-out",
          "md:static md:translate-x-0",
          isOpen
            ? "w-[260px] translate-x-0"
            : "w-[80px] -translate-x-full lg:w-[80px] lg:translate-x-0 duration-600"
        )}
      >
        <div className="absolute top-3 right-3.5">
          {
            isOpen && <X className="text-green" onClick={onClose}/>
          }
        </div>
        {/* HEADER */}
        <div className="flex flex-col  items-center space-y-6  px-4 py-6 ">
          {!isOpen && 
          <Menu onClick={onOpen} className="text-green"/>
          }
          <Image
            onClick={()=>router.push("/")}
            src="/assets/logo.png"
            alt="RentaLink"
            width={140}
            height={24}
          />
        </div>

        {/* NAV */}
        <nav className="px-3 py-4 ">
          {sidebarItems?.map((group) => {
            return (
              <div key={group.section} className={`flex flex-col ${isOpen ? 'items-left' : 'items-center'}`}>
                <p className=" mb-2 text-[12px] leading-4 text-muted ">
                  {group.section}
                </p>

                <div className="space-y-3">
                  {group?.items?.map((item: any) => {

                    const isCurrent = checkCurrent(item.href);
                    const Icon = item.icon;
                    return (
                      <Link

                        key={item.label}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={clsx(
                          "flex items-center transition-all duration-400 rounded-[60px] text-[14px] leading-5 px-2 py-2.5 ",
                          isCurrent ? `bg-green text-white hover:bg-dark-green` : "text-gray-700 border-[1px] border-[#7FB33B] hover:bg-gray-100",
                          isOpen ? "gap-3 justify-start" : "gap-0 justify-center"
                        )}
                      >
                        <div className={`${isOpen && "border-[1px]"} w-8 h-8 ${isCurrent ? "border-white" : "border-[#262525]"} rounded-full p-1 flex items-center justify-center`}>
                          <Icon className={`w-4.5 h-4.5`} />
                        </div>
                        <span className={clsx(
                          "transition-all duration-400 ease-in-out overflow-hidden whitespace-nowrap italic",
                          isOpen
                            ? "opacity-100 max-w-[200px] ml-0"
                            : "opacity-0 max-w-0 md:opacity-0 md:max-w-0"
                        )}>
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )
          })}
        </nav>
        <div className="px-3 py-4 mt-auto">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={clsx(
              "w-full flex items-center transition-all duration-400 rounded-[60px] text-[14px] leading-5 px-2 py-2.5 text-gray-700 border-[1px] border-[#7FB33B] hover:bg-gray-100",
              isOpen ? "gap-3 justify-start" : "gap-0 justify-center"
            )}
          >
            <div className="border-[1px] w-8 h-8 border-[#262525] rounded-full p-1 flex items-center justify-center">
              <LogOut className="w-4.5 h-4.5" />
            </div>
            <span
              className={clsx(
                "transition-all duration-400 ease-in-out overflow-hidden whitespace-nowrap italic",
                isOpen
                  ? "opacity-100 max-w-[200px] ml-0"
                  : "opacity-0 max-w-0 md:opacity-0 md:max-w-0"
              )}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
