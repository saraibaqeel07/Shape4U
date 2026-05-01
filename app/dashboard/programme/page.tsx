"use client";
import Button from '@/components/ui/Button';
import WeeklyCards from '@/components/WeeklyCards'
import React, { useEffect, useState } from 'react'
import ApiServices from '@/services/Apis';

interface Week {
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

const ProgrammePage = () => {
  const [isProgramme, setIsProgramme] = useState(true);
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const data = await ApiServices.GetWeeks();
        console.log("Weeks data:", data);
        setWeeks(data?.weeks || []);
      } catch (err) {
        console.error("Weeks API error:", err);
      }
    };
    fetchWeeks();
  }, []);

  return (
    <div className='pt-5 space-y-3 px-2 md:px-0'>
      {isProgramme ? (
        <>
          <h3 className='heading-3 '>Weekly Programmes</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {weeks.map((week) => (
              <WeeklyCards
                key={week.id}
                id={week.id}
                weekNumber={week.weekNumber}
                title={week.title}
                introText={week.introText}
                isUnlocked={week.isUnlocked}
                isCompleted={week.isCompleted}
                isCurrent={week.isCurrent}
              />
            ))}
          </div>
        </>
      )
        :
        (
          <div className='shadow-[0_1px_23.2px_0_rgba(0,0,0,0.08)] mx-auto mt-12 border-[1px] border-[#5E5F5F33] rounded-[30px] w-[90%] h-[280px] flex items-center justify-center md:max-w-[692px]'>
              <div className='flex flex-col items-center space-y-2'>
                <h3 className='heading-3'>⚠ Reminder</h3>
                <p className='text-[12px] text-[#5E5F5F]'>You have not entered your weight for Week 3.</p>
                <Button variant='blue' className='w-full'>
                  Enter Weight
                </Button>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ProgrammePage