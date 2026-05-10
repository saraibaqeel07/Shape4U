"use client";
import { CheckCircle, ChevronRight, Lock, CalendarClock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface WeeklyCardProps {
  id: string;
  weekNumber: number;
  title: string;
  introText: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  hasWeightEntry: boolean;
  pdfAvailable: boolean;
  unlockDate: string;
}

const WeeklyCards = ({
  weekNumber,
  title,
  introText,
  isCompleted,
  isUnlocked,
  isCurrent,
  unlockDate,
}: WeeklyCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!isUnlocked) return;
    router.push('/dashboard/programme/' + weekNumber);
  };

  const formattedUnlockDate = unlockDate
    ? new Date(unlockDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col gap-2 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
    >
      {/* Image with thick green rounded border */}
      <div className="relative h-[160px] md:h-[175px] rounded-[20px] border-[5px] border-green overflow-hidden">
        <Image
          src="/assets/img1.png"
          alt={title}
          fill
          className="object-cover"
        />

        {/* Current Week badge */}
        {isCurrent && !isCompleted && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold italic px-3 py-1 rounded-full">
            Current Week
          </span>
        )}

        {/* Completed overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
            <CheckCircle className="text-green w-10 h-10" />
            <span className="text-white text-[13px] font-bold italic">Completed</span>
          </div>
        )}

        {/* Locked overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <Lock className="text-white w-8 h-8" />
            <span className="text-white text-[13px] font-bold italic">Locked</span>
            {formattedUnlockDate && (
              <span className="flex items-center gap-1 text-white/80 text-[11px]">
                <CalendarClock className="w-3 h-3" /> Unlocks {formattedUnlockDate}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Text body */}
      <div className="px-1 pb-1">
        <p className="text-[13px] text-gray-500">Week {weekNumber}</p>
        <h4 className="text-[18px] md:text-[20px] font-bold leading-snug text-[#262525]">
          {title}
        </h4>
        <p className="italic text-[12px] text-gray-500 mt-1 line-clamp-3 leading-snug">
          {introText}
        </p>

        {/* Arrow button */}
        <div className="flex justify-end mt-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isUnlocked ? 'bg-green' : 'bg-gray-300'
            }`}
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCards;
