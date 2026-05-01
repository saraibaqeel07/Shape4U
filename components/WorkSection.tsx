import Image from 'next/image'

const WorkSection = () => {
  return (
    <div className='w-full overflow-hidden relative py-10 bg-[#F5F2F2] flex flex-col items-center space-y-8 md:space-y-14'>
         <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-60 h-60 bg-primary rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-60 h-60 bg-green rounded-full blur-3xl opacity-40"></div>

        <h3 className='text-[30px] md:text-[46px]' style={{fontFamily:"ArialRounded"}}>How It Work</h3>
        <Image src={"/assets/work_img.png"} alt='work' width={1200} height={300} className='w-[90%] h-full md:h-[60px] md:h-[220px] lg:w-[1198px] lg:h-[338px] '/>
    </div>
  )
}

export default WorkSection