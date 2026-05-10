"use client";

import { useAuth } from '@/context/AuthContext';
import { Menu, Search, Bell } from 'lucide-react';
import Image from 'next/image';

const Header = ({ onOpen }: { onOpen: () => void }) => {
    const { user } = useAuth();
    const firstName = user?.firstName || user?.name?.split(" ")[0] || "User";

    return (
        <div className="flex items-center justify-between border-[1px] border-[#5E5F5F33] rounded-[30px] px-3 py-2">
            <div className="flex items-center gap-3">
                <div
                    onClick={onOpen}
                    className="w-7 h-7 md:w-10 flex-shrink-0 md:h-10 flex md:hidden items-center border-[1px] rounded-full justify-center"
                >
                    <Menu className="w-4 h-4" color="#1F7FB6" />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src="/assets/person.jpg"
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="text-[18px] md:text-[22px] font-bold text-[#262525]">
                    Welcome back,{" "}
                    <span className="text-[#DD303D]">{firstName}</span>
                </p>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2">
                <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Search className="w-4 h-4 text-gray-500" />
                </button>
                <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Bell className="w-4 h-4 text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default Header;
