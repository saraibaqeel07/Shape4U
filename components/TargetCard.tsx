interface TargetProps {
    title: string;
    value: string;
    term: string;
    link?: string;
    description: string;
    bgColor?: string;
}

const TargetCard = (item: TargetProps) => {
    return (
        <div className="rounded-[20px] bg-white shadow-[0_1px_23.2px_0_rgba(0,0,0,0.08)] overflow-hidden flex flex-col h-full">
            {/* Body */}
            <div className="flex-1 px-4 pt-5 pb-3">
                <p className="text-[12px] md:text-[14px] text-gray-500">{item.title}</p>
                <div className="flex items-end gap-1 mt-1">
                    <p className="font-bold text-[32px] md:text-[40px] text-[#262525] leading-none">
                        {item.value}
                    </p>
                    <p className="text-[15px] md:text-[17px] text-gray-500 mb-1">
                        {item.term}
                    </p>
                </div>
            </div>

            {/* Coloured footer strip */}
            <div className={`py-2 px-3 ${item.bgColor ?? 'bg-[#262525]'}`}>
                <p className="text-white text-[10px] md:text-[11px] text-center">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

export default TargetCard;
