"use client";

import React, { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import ApiServices from '@/services/Apis';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PreScreenForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<{ startDate: string; heightCm: number | ""; startingWeightKg: number | "" }>({ startDate: "", heightCm: "", startingWeightKg: "" });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs: any = {};
    if (!form.startDate) errs.startDate = "Start date required";
    if (form.heightCm === "") errs.heightCm = "Height required";
    else if (form.heightCm < 120 || form.heightCm > 230) errs.heightCm = "Height must be 120–230 cm";
    if (form.startingWeightKg === "") errs.startingWeightKg = "Weight required";
    else if (form.startingWeightKg < 30 || form.startingWeightKg > 250) errs.startingWeightKg = "Weight must be 30–250 kg";
    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await ApiServices.Onboarding({
        ...form,
        heightCm: Number(form.heightCm),
        startingWeightKg: Number(form.startingWeightKg),
      });
      localStorage.removeItem("token");
      toast.success("Profile complete! You can now log in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-2 pb-10'>
      <p className='text-sm text-gray-500 mb-4'>On first login, user must enter:</p>

      <Input
        label='Start date'
        type="date"
        value={form.startDate}
        error={errors.startDate}
        onChange={(e: any) => handleChange("startDate", e.target.value)}
      />

      <Input
        label='Height'
        placeholder='(cm)'
        value={form.heightCm === "" ? "" : String(form.heightCm)}
        type='number'
        error={errors.heightCm}
        onChange={(e: any) => handleChange("heightCm", e.target.value === "" ? "" : Number(e.target.value))}
      />

      <Input
        label='Starting Weight'
        placeholder='(kg)'
        type="number"
        value={form.startingWeightKg === "" ? "" : String(form.startingWeightKg)}
        error={errors.startingWeightKg}
        onChange={(e: any) => handleChange("startingWeightKg", e.target.value === "" ? "" : Number(e.target.value))}
      />

      <div className='bg-[#1F7FB6]/10 rounded-[25px] my-4 p-4'>
        <p className='text-[#1F7FB6] text-[22px] mb-2'>Validation</p>
        <p className='text-sm text-gray-500'>Height: 120–230 cm</p>
        <p className='text-sm text-gray-500'>Weight: 30–250 kg</p>
      </div>

      <Button variant='primary' onClick={handleSubmit} disabled={loading} className='w-full'>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  )
}

export default PreScreenForm;
