"use client";
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ApiServices from '@/services/Apis'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'

interface WeekData {
    id: string;
    weekNumber: number;
    title: string;
    introText: string;
    pdfKey: string | null;
}

interface ProgressData {
    weightKg: number | null;
    confidenceScore: number | null;
    mainGoal: string | null;
    obstacles: string | null;
    committedAction: string | null;
    isCompleted: boolean;
    completedAt: string | null;
}

const QuestionInput = ({ number, title, placeholder, value, onChange }: {
    number: string;
    title: string;
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
}) => {
    return (
        <div className=''>
            <div className='space-x-2 flex items-center'>
                <div className='w-8 h-8 md:w-11.5 md:h-11.5 rounded-full bg-primary text-white font-number flex items-center justify-center'>{number}</div>
                <p className='text-[12px] md:text-[14px] font-bold'>{title}</p>
            </div>
            <Input placeholder={placeholder} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
        </div>
    )
}

const ProgrammeIdPage = () => {
    const { id: weekNumber } = useParams();

    const [week, setWeek] = useState<WeekData | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [weightKg, setWeightKg] = useState<number | "">("");
    const [weightLoading, setWeightLoading] = useState(false);

    const [reflection, setReflection] = useState({
        confidenceScore: "",
        mainGoal: "",
        obstacles: "",
        committedAction: "",
    });
    const [reflectionLoading, setReflectionLoading] = useState(false);
    const [completeLoading, setCompleteLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    useEffect(() => {
        const fetchWeek = async () => {
            try {
                const data = await ApiServices.GetWeekByNumber(weekNumber);
                console.log("Week data:", data);
                const w: WeekData = data?.week;
                const p: ProgressData = data?.progress;
                setWeek(w);
                if (p) {
                    setIsCompleted(p.isCompleted ?? false);
                    setWeightKg(p.weightKg ?? "");
                    setReflection({
                        confidenceScore: p.confidenceScore != null ? String(p.confidenceScore) : "",
                        mainGoal: p.mainGoal ?? "",
                        obstacles: p.obstacles ?? "",
                        committedAction: p.committedAction ?? "",
                    });
                }
            } catch (err) {
                console.error("Get week API error:", err);
            }
        };
        fetchWeek();
    }, [weekNumber]);

    const handlePdfDownload = async () => {
    
        try {
            setPdfLoading(true);
            await ApiServices.GetPdf('program/' + week?.pdfKey);
        } catch (err) {
            toast.error((err as { message?: string })?.message || "Failed to download PDF.");
        } finally {
            setPdfLoading(false);
        }
    };

    const handleWeightSubmit = async () => {
        if (weightKg === "") return toast.error("Please enter your weight.");
        try {
            setWeightLoading(true);
            await ApiServices.SubmitWeight(weekNumber, Number(weightKg));
            toast.success("Weight submitted successfully.");
        } catch (err) {
            toast.error((err as { message?: string })?.message || "Failed to submit weight.");
        } finally {
            setWeightLoading(false);
        }
    };

    const handleCompleteWeek = async () => {
        try {
            setCompleteLoading(true);
            await ApiServices.CompleteWeek(weekNumber);
            setIsCompleted(true);
            toast.success("Week marked as completed!");
        } catch (err) {
            toast.error((err as { message?: string })?.message || "Failed to complete week.");
        } finally {
            setCompleteLoading(false);
        }
    };

    const handleReflectionSubmit = async () => {
        if (!reflection.confidenceScore || !reflection.mainGoal || !reflection.obstacles || !reflection.committedAction)
            return toast.error("Please fill all reflection fields.");
        try {
            setReflectionLoading(true);
            await ApiServices.SubmitReflection(weekNumber, {
                confidenceScore: Number(reflection.confidenceScore),
                mainGoal: reflection.mainGoal,
                obstacles: reflection.obstacles,
                committedAction: reflection.committedAction,
            });
            toast.success("Reflection submitted successfully.");
        } catch (err) {
            toast.error((err as { message?: string })?.message || "Failed to submit reflection.");
        } finally {
            setReflectionLoading(false);
        }
    };

    return (
        <div className='space-y-8 pb-10'>
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 mt-10 justify-between'>
                <div className='w-full md:w-3/4 pl-2 md:pl-0 space-y-4'>
                    <div className='flex items-center gap-3'>
                        <h3 className='heading-3'>Week {week?.weekNumber} {week?.title}</h3>
                        {isCompleted && (
                            <span className='flex items-center gap-1 bg-green/10 text-green text-[12px] font-bold italic px-3 py-1 rounded-full'>
                                <CheckCircle className='w-4 h-4' /> Completed
                            </span>
                        )}
                    </div>
                    <p className='descrip md:w-2/4'>{week?.introText}</p>
                    {week?.pdfKey && (
                        <Button variant="primary" className='w-full md:w-1/3' onClick={handlePdfDownload} disabled={pdfLoading}>
                            {pdfLoading ? "Downloading..." : "Download PDF"}
                        </Button>
                    )}
                </div>
                <div className='h-[204px] w-full md:w-1/3 rounded-[40px] overflow-hidden border-[10px] border-green'>
                    <Image src={"/assets/img2.png"} alt='week' width={200} height={200} className='w-full h-full object-cover' />
                </div>
            </div>

            <div className='space-y-3'>
                <Input
                    label='Enter Your Weight For This Week'
                    placeholder='Weight (kg)'
                    type='number'
                    value={weightKg === "" ? "" : String(weightKg)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setWeightKg(e.target.value === "" ? "" : Number(e.target.value))}
                />
                <div className='flex justify-end'>
                    <Button variant='blue' className='w-full md:!w-1/4' onClick={handleWeightSubmit} disabled={weightLoading || isCompleted}>
                        {weightLoading ? "Submitting..." : "Submit Weight"}
                    </Button>
                </div>
            </div>

            <div className='w-full rounded-[25px] p-6 bg-primary/10'>
                <h3 className='heading-3'>Weekly Reflection Questions</h3>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
                    <QuestionInput
                        number='01'
                        title='On a scale of 1–5, how confident do you feel this week?'
                        placeholder='1–5'
                        value={reflection.confidenceScore}
                        onChange={(val) => setReflection((p) => ({ ...p, confidenceScore: val }))}
                    />
                    <QuestionInput
                        number='03'
                        title='What might get in the way?'
                        placeholder='Obstacles...'
                        value={reflection.obstacles}
                        onChange={(val) => setReflection((p) => ({ ...p, obstacles: val }))}
                    />
                    <QuestionInput
                        number='02'
                        title='What is your main goal this week?'
                        placeholder='Main goal...'
                        value={reflection.mainGoal}
                        onChange={(val) => setReflection((p) => ({ ...p, mainGoal: val }))}
                    />
                    <QuestionInput
                        number='04'
                        title='What is one action you commit to this week?'
                        placeholder='Committed action...'
                        value={reflection.committedAction}
                        onChange={(val) => setReflection((p) => ({ ...p, committedAction: val }))}
                    />
                </div>
                <div className='w-full flex flex-col items-end mt-6 gap-3'>
                    <Button variant='primary' className='w-full md:!w-1/4' onClick={handleReflectionSubmit} disabled={reflectionLoading || isCompleted}>
                        {reflectionLoading ? "Submitting..." : "Submit Reflection"}
                    </Button>
                    <Button variant='red' className='w-full md:!w-1/4' onClick={handleCompleteWeek} disabled={completeLoading || isCompleted}>
                        {completeLoading ? "Completing..." : isCompleted ? "Week Completed" : "Mark Week Completed"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProgrammeIdPage
