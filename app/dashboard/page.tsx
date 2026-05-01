"use client";
import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import TargetCard from "@/components/TargetCard";
import { MdOutlineHeight } from "react-icons/md";
import ApiServices from "@/services/Apis";

interface DashboardData {
    startingWeight: number;
    currentWeight: number;
    targetWeight: number;
    remainingWeight: number;
    currentWeek: number;
    completedWeeks: number;
    needsOnboarding: boolean;
    needsWeightEntry: boolean;
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

    return (
        <div className="w-full px-3">
            <div className="flex items-center mt-2.5 md:ml-5 gap-4">
                <span className="text-[12px] text-[#5E5F5F]">
                    <b>Current Week: </b>
                    Week {dashboardData?.currentWeek ?? "—"}
                </span>
                <span className="text-[12px] text-[#5E5F5F]">
                    <b>Completed Weeks: </b>
                    {dashboardData?.completedWeeks ?? "—"}
                </span>
            </div>

            <div className="mt-12 space-y-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    <StatsCard
                        title="Current Weight"
                        value={dashboardData ? `${dashboardData.currentWeight} kg` : "—"}
                        link="/"
                        icon={"/assets/weightscale.png"}
                    />
                    <StatsCard
                        title="Remaining Weight"
                        value={dashboardData ? `${dashboardData.remainingWeight} kg` : "—"}
                        link="/"
                        icon={MdOutlineHeight}
                    />
                </div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-4 lg:gap-2 gap-3">
                    <TargetCard
                        link="/"
                        title="Starting Weight"
                        value={dashboardData ? String(dashboardData.startingWeight) : "—"}
                        term="kg"
                        description="Your weight when you started the programme"
                        bgColor="bg-primary"
                    />
                    <TargetCard
                        link="/"
                        title="Current Weight"
                        value={dashboardData ? String(dashboardData.currentWeight) : "—"}
                        term="kg"
                        description="Your latest recorded weight"
                        bgColor="bg-green"
                    />
                    <TargetCard
                        link="/"
                        title="Remaining"
                        value={dashboardData ? String(dashboardData.remainingWeight) : "—"}
                        term="kg"
                        description="Weight left to reach your target"
                        bgColor="bg-red"
                    />
                    <TargetCard
                        link="/"
                        title="Target Weight"
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
