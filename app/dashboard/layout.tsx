"use client";

import Header from "@/components/Header";
import SidebarSkeleton from "@/components/ui/SidebarSkeleton";
import { useAuth } from "@/context/AuthContext";
import { Code, House } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const sidebarItems = [
  {
    items: [
      { label: "Dashboard", icon: House, href: "/dashboard", color: "bg-primary" },
      { label: "Programme", icon: Code, href: "/dashboard/programme" },
    ],
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (user?.needsOnboarding) {
      router.replace("/prescreen");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.needsOnboarding) return null;

  return (
    <div className="flex overflow-y-auto md:gap-4 h-screen bg-white p-2">
      <div className="sticky z-40 top-0">
        <SidebarSkeleton
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
          sidebarItems={sidebarItems}
        />
      </div>
      <div className="flex-1 pt-4">
        <Header onOpen={() => setIsSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
