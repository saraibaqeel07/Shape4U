"use client";
import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import TargetCard from "@/components/TargetCard";
import { MdOutlineHeight } from "react-icons/md";
import ApiServices from "@/services/Apis";
import Image from "next/image";
import Link from "next/link";

interface DashboardData {
    startingWeight: number;
    currentWeight: number;
    targetWeight: number;
    remainingWeight: number;
    currentWeek: number;
    completedWeeks: number;
    needsOnboarding: boolean;
    needsWeightEntry: boolean;
    startDate?: string;
}

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await ApiServices.GetDashboard();
                console.log("Dashboard data:", data);
                setDashboardData(data);
            } catch (err) {
                console.error("Dashboard API error:", err);
            }
        };
        fetchDashboard();
    }, []);

    const weekNum = dashboardData?.currentWeek ?? "—";

    return (
        <div className="w-full px-3">
            {/* Info bar */}
            <div className="flex items-center mt-2.5 md:ml-5 gap-4">
                <span className="text-[12px] text-[#5E5F5F]">
                    <b>Start Date: </b>
                    {dashboardData?.startDate ?? "—"}
                </span>
                <span className="text-[12px] text-[#5E5F5F]">
                    <b>Current Week: </b>
                    Week {weekNum}
                </span>
            </div>

            <div className="mt-4 space-y-4">

                {/* Continue Week banner */}
                <div className="rounded-[20px] bg-[#EEF7EF] flex items-center overflow-hidden">

                    {/* Calendar image */}
                    <div className="shrink-0 px-3 py-2">
                        <Image
                            src="/assets/CalendarPic.png"
                            alt="Calendar"
                            width={90}
                            height={90}
                            className="w-35 h-35 object-contain"
                        />
                    </div>

                    {/* Centre text + progress */}
                    <div className="flex-1 py-3 pr-80">
                        <p className="text-primary font-bold text-[15px] md:text-[18px] leading-tight">
                            Continue Week {dashboardData?.currentWeek ?? "—"}
                        </p>
                        <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                            You&apos;re on track! Keep going and complete this week&apos;s tasks to stay consistent.
                        </p>

                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-[4px]">
                            <div
                                className="bg-primary h-[4px] rounded-full transition-all duration-500"
                                style={{ width: `${((dashboardData?.currentWeek ?? 0) / 8) * 100}%` }}
                            />
                        </div>

                        <p className="text-[11px] text-black mt-1 text-right">
                            You&apos;re on Week {dashboardData?.currentWeek ?? "—"} of 8
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-px self-stretch bg-gray-300 shrink-0" />

                    {/* CTA button */}
                    <div className="shrink-0 px-4 flex items-center justify-center">
                        <Link
                            href={`/dashboard/programme/${dashboardData?.currentWeek ?? ""}`}
                            className="bg-[#1F7FB6] text-white text-[12px] md:text-[13px] font-semibold px-5 py-2.5 rounded-[8px] whitespace-nowrap hover:bg-[#1a6fa0] transition-colors"
                        >
                            Continue Week {dashboardData?.currentWeek ?? "—"}
                        </Link>
                    </div>
                </div>

                {/* Stats row */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    <StatsCard
                        title="Current Weight"
                        value={dashboardData ? `${dashboardData.currentWeight} kg` : "—"}
                        link="/"
                        icon="/assets/weightscale.png"
                        bgColor="green"
                    />
                    <StatsCard
                        title="Remaining Weight"
                        value={dashboardData ? `${dashboardData.remainingWeight} kg` : "—"}
                        link="/"
                        icon={MdOutlineHeight}
                        bgColor="lightBlue"
                    />
                </div>

                {/* Target cards — 2×2 grid */}
                <div className="w-full grid grid-cols-2 gap-3">
                    <TargetCard
                        title="Starting Weight"
                        value={dashboardData ? String(dashboardData.startingWeight) : "—"}
                        term="kg"
                        description="Your weight when you started the programme"
                        bgColor="bg-primary"
                    />
                    <TargetCard
                        title="Current Weight"
                        value={dashboardData ? String(dashboardData.currentWeight) : "—"}
                        term="kg"
                        description="Your latest recorded weight"
                        bgColor="bg-green"
                    />
                    <TargetCard
                        title="Remaining"
                        value={dashboardData ? String(dashboardData.remainingWeight) : "—"}
                        term="kg"
                        description="Weight left to reach your target"
                        bgColor="bg-red"
                    />
                    <TargetCard
                        title="Target weight"
                        value={dashboardData ? String(dashboardData.targetWeight) : "—"}
                        term="kg"
                        description="Your goal weight for the programme"
                        bgColor="bg-brown"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
