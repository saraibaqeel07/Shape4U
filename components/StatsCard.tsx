import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface StatsProps {
    title: string;
    value: string;
    link?: string;
    icon?: IconType | string;
    bgColor?: 'green' | 'lightBlue';
}

const StatsCard = ({ title, value, link, icon, bgColor }: StatsProps) => {
    const isImage = typeof icon === 'string';

    const solidColor = bgColor === 'green'     ? '#7FB33B'
                     : bgColor === 'lightBlue' ? '#1F7FB6'
                     : '#1F7FB6';

    const paleColor  = bgColor === 'green'     ? '#E8F5D9'
                     : bgColor === 'lightBlue' ? '#D6EDF8'
                     : '#ffffff';

    const btnColor   = solidColor;

    return (
        <div
            className="rounded-[20px] overflow-hidden flex h-[100px] md:h-[110px] shadow-[0_1px_23.2px_0_rgba(0,0,0,0.08)]"
        >
            {/* Left solid-colour panel with icon */}
            <div
                style={{ backgroundColor: solidColor }}
                className="w-16 flex items-center justify-center shrink-0"
            >
                {icon && (
                    isImage ? (
                        <Image
                            src={icon as string}
                            alt={title}
                            width={30}
                            height={30}
                            className="w-8 h-8 object-contain brightness-0 invert"
                        />
                    ) : (
                        (() => {
                            const Icon = icon as IconType;
                            return <Icon className="w-8 h-8 text-white" />;
                        })()
                    )
                )}
            </div>

            {/* Right pale section */}
            <div
                style={{ backgroundColor: paleColor }}
                className="flex-1 flex items-center justify-between px-4 gap-3"
            >
                <div className="min-w-0">
                    <p className="text-[12px] md:text-[14px] font-bold text-[#262525]">{title}</p>
                    <p className="text-[20px] md:text-[24px] font-semibold text-[#262525]">{value}</p>
                </div>

                {link && (
                    <Link
                        href={link}
                        style={{ backgroundColor: btnColor }}
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
