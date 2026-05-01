"use client";

import { useAuth } from '@/context/AuthContext';
import { Menu } from 'lucide-react'
import Image from 'next/image'

const Header = ({ onOpen }: { onOpen: () => void }) => {
    const { user } = useAuth();

    return (
        <div className="flex items-center justify-between border-[1px] border-[#5E5F5F33] rounded-[30px] px-3 py-2">
            <div className="flex items-center gap-3">
                <div onClick={onOpen} className="w-7 h-7 md:w-10 flex-shrink-0 md:h-10 flex md:hidden items-center border-[1px] rounded-full justify-center">
                    <Menu className='w-4 h-4' color="#1F7FB6" />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                    <Image src={"/assets/person.jpg"} alt="image" width={100} height={100} className="object-cover" />
                </div>
                <p className="text-[18px] md:text-[25px] font-bold text-[#262525]">
                    Welcome back, {user?.firstName || user?.name || "User"}
                </p>
            </div>
        </div>
    )
}

export default Header
