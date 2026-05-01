"use client";

import { useRouter } from 'next/navigation';
import Button from './ui/Button'
import Image from 'next/image'


const HomeHeroSection = () => {
  const router = useRouter();
  return (
    <div className='h-full relative overflow-hidden space-y-10 pt-30 md:pt-10 py-10 md:py-0 md:space-y-0 md:h-[956px] px-[5%] bg-gradient-to-r from-[#FDF3F300] to-[#FDF4F4] rounded-b-[45px] md:rounded-b-[98px] flex flex-col md:flex-row items-start md:items-center justify-between'>
        <div className="absolute -top-32 -left-32 w-60 h-60 bg-red rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 left-10 w-60 h-60 bg-primary rounded-full z-2 blur-3xl opacity-40"></div>
        <div className="absolute -bottom-32 right-10 w-60 h-60 bg-green rounded-full z-2 blur-3xl opacity-40"></div>

        <div className='w-full  md:max-w-1/2 space-y-6'>
          <h4 className='text-[30px] md:text-[40px] lg:text-[54px] leading-tight' style={{fontFamily:"ArialRounded"}}>
            <p className='text-green'>ShapeUp4Life –</p> 
            <p className='text-primary'>A 12-Week Structured Weight Management Programme</p>
          </h4>
          <p className='text-[14px] md:text-[18px] font-semibold text-green'>Locally commissioned support to help you lose weight safely and build habits that last — delivered both in-person and online.</p>
          <p className='text-[12px] md:text-[14px] leading-loose'>ShapeUp4Life is a structured 12-week programme designed to support adults who want to improve their health, manage their weight, and build sustainable lifestyle habits.</p>
          <div className='flex items-center gap-3'>
            <Button onClick={()=>router.push("/signup")} variant='primary' className='w-[150px] md:w-[180px]'>
              Create Account
            </Button>

            <Button onClick={()=>router.push("/login")} variant='blue' className='w-[150px] md:w-[180px]'>
              Log In
            </Button>
          </div>
        </div>

        <div className='w-full md:w-[400px] lg:w-[690px] z-10'>
          <Image src={"/assets/mainImg2.png"} alt="image" width={600} height={500} className='w-full h-full '/>
        </div>
    </div>
  )
}

export default HomeHeroSection