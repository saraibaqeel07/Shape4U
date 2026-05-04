"use client";
import { CheckCircle, ChevronRight, Lock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface WeeklyCardProps {
  id: string;
  weekNumber: number;
  title: string;
  introText: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
}

const WeeklyCards = ({
  weekNumber,
  title,
  introText,
  isCompleted,
  isUnlocked
}: WeeklyCardProps) => {

  const router = useRouter();

  const handleClick = () => {
    if (!isUnlocked) return; // 🚫 block if locked
    router.push('/dashboard/programme/' + weekNumber);
  };

  return (
    <div
      onClick={handleClick}
      className={`px-3 rounded-[30px] md:px-3 py-2 space-y-2 border-[1px] border-black/8 shadow-[0px_4px_4px_rgba(0,0,0,0.07)]
      ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
    >
      <div className='relative h-[204px] rounded-[40px] overflow-hidden w-full border-[10px] border-green'>
        <Image src={"/assets/img1.png"} alt='week' width={200} height={200} className='w-full h-full object-cover'/>

        {/* ✅ Completed Overlay */}
        {isCompleted && (
          <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1'>
            <CheckCircle className='text-green w-10 h-10' />
            <span className='text-white text-[13px] font-bold italic'>Completed</span>
          </div>
        )}

        {/* 🔒 Locked Overlay */}
        {!isUnlocked && (
          <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1'>
            <Lock className='text-white w-8 h-8' />
            <span className='text-white text-[13px] font-bold italic'>Locked</span>
          </div>
        )}
      </div>

      <div className='leading-tight'>
        <h2 className='text-[26px] font-bold'>Week {weekNumber}</h2>
        <h4 className='text-[26px]'>{title}</h4>
      </div>

      <p className='italic text-[12px]'>{introText}</p>

      <div className='flex justify-center'>
        <div className={`mt-1 w-6.5 h-6.5 rounded-full flex items-center justify-center 
          ${isUnlocked ? 'bg-green' : 'bg-gray-400'}`}>
          <ChevronRight className="w-4 h-4 text-black" />
        </div>
      </div>
    </div>
  )
}

export default WeeklyCards;