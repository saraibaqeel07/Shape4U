import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface TargetProps {
    title: string,
    value: string,
    term: string,
    link?: string,
    description: string,
    bgColor?: string,
}
const TargetCard = (item: TargetProps) => {
    return (
        <div className={`rounded-[30px] text-white pl-3 md:pl-2 xl:pl-3 pr-3 md:pl-6 pt-6 pb-6 w-full h-full ${item.bgColor ?? "bg-black"} relative`}>
            {item?.link && (
                <Link
                    href={item.link}
                    className="bg-white absolute top-3 right-3 w-5 h-5 md:w-6.5 md:h-6.5 rounded-full flex items-center justify-center"
                >
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
                </Link>
            )}
            <div className='mb-2'>
                <p className='text-[13px] md:text-[15px]'>{item.title}</p>
                <span className='flex items-end gap-1'>
                    <p className='font-bold text-[30px] md:text-[38px]' >{item.value}</p>
                    <p className='text-[16px] md:text-[18px] mb-1.5 md:mb-2'>{item.term}</p>
                </span>
            </div>

            <div className='p-1.5 md:p-2.5 max-w-full rounded-full bg-white text-[7px] md:text-[8px]'>
                <p className='text-black text-[10px]'>{item.description}</p>
            </div>
        </div>
    )
}

export default TargetCard