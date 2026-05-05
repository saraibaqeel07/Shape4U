"use client";
import { CheckCircle, ChevronRight, Lock, FileText, Weight, CalendarClock } from 'lucide-react'
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
  hasWeightEntry,
  pdfAvailable,
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
      className={`rounded-[30px] overflow-hidden border-[1px] border-black/8 shadow-[0px_4px_4px_rgba(0,0,0,0.07)] flex flex-col
      ${isUnlocked ? 'cursor-pointer hover:shadow-md transition-shadow' : 'cursor-not-allowed opacity-60'}`}
    >
      {/* Image */}
      <div className='relative h-[180px] w-full border-b-[6px] border-green'>
        <Image src={"/assets/img1.png"} alt='week' fill className='object-cover' />

        {/* Current Week Badge */}
        {isCurrent && (
          <span className='absolute top-3 left-3 bg-primary text-white text-[11px] font-bold italic px-3 py-1 rounded-full'>
            Current Week
          </span>
        )}

        {/* Completed Overlay */}
        {isCompleted && (
          <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1'>
            <CheckCircle className='text-green w-10 h-10' />
            <span className='text-white text-[13px] font-bold italic'>Completed</span>
          </div>
        )}

        {/* Locked Overlay */}
        {!isUnlocked && (
          <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2'>
            <Lock className='text-white w-8 h-8' />
            <span className='text-white text-[13px] font-bold italic'>Locked</span>
            {formattedUnlockDate && (
              <span className='flex items-center gap-1 text-white/80 text-[11px]'>
                <CalendarClock className='w-3 h-3' /> Unlocks {formattedUnlockDate}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className='flex flex-col flex-1 px-4 py-3 space-y-2'>
        <div className='leading-tight'>
          <p className='text-[12px] text-gray-400 font-medium uppercase tracking-wide'>Week {weekNumber}</p>
          <h4 className='text-[18px] font-bold leading-snug'>{title}</h4>
        </div>

        <p className='italic text-[12px] text-gray-500 line-clamp-2'>{introText}</p>

        {/* Badges row */}
        <div className='flex flex-wrap gap-2 pt-1'>
          {pdfAvailable && (
            <span className='flex items-center gap-1 bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded-full'>
              <FileText className='w-3 h-3' /> PDF
            </span>
          )}
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full
            ${hasWeightEntry ? 'bg-green/10 text-green' : 'bg-gray-100 text-gray-400'}`}>
            <Weight className='w-3 h-3' />
            {hasWeightEntry ? 'Weight logged' : 'No weight entry'}
          </span>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between pt-2 mt-auto'>
          {isCompleted ? (
            <span className='flex items-center gap-1 text-green text-[12px] font-bold italic'>
              <CheckCircle className='w-4 h-4' /> Done
            </span>
          ) : (
            <span className='text-[12px] text-gray-400 italic'>
              {isUnlocked ? 'Tap to open' : 'Not available yet'}
            </span>
          )}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center
            ${isUnlocked ? 'bg-green' : 'bg-gray-300'}`}>
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyCards;
