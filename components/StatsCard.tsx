import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface StatsProps {
    title: string,
    value: string,
    link?: string,
    icon?: IconType | string
}

const StatsCard = ({ title, value, link, icon }: StatsProps) => {
  const isImage = typeof icon === "string";

  return (
    <div className="shadow-[0_1px_23.2px_0_rgba(0,0,0,0.08)] bg-white rounded-[30px] flex items-center justify-between h-[100px] md:h-[119px] px-4">
      <div className="flex items-center gap-4">
        
        {icon && isImage && (
          <Image
            src={icon}
            alt={title}
            height={24}
            width={24}
            className="flex-shrink-0 w-6 h-6"
          />
        )}

        {icon && !isImage && (
          (() => {
            const Icon = icon as IconType;
            return <Icon className="w-6 h-6 flex-shrink-0" />;
          })()
        )}

        <div>
          <p className="text-[12px] md:text-[14px] font-bold">{title}</p>
          <p className="text-[18px] md:text-[23px]">{value}</p>
        </div>
      </div>

      {link && (
        <Link
          href={link}
          className="bg-[#1F7FB6] w-6.5 h-6.5 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </Link>
      )}
    </div>
  );
};

export default StatsCard;