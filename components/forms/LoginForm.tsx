"use client";
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { validateLogin } from '@/lib/validations/auth';
import { useAuth } from '@/context/AuthContext';
import ApiServices from '@/services/Apis';
import { toast } from 'sonner';

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }

    const handleSubmit = async () => {
        const validationErrors = validateLogin(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            const data = await ApiServices.Login(form);
            login(data?.user || data, data?.token || data?.accessToken);
            toast.success("Login successful! Welcome back.");
            router.push("/dashboard");
            setForm({ email: "", password: "" });
        } catch (err: any) {
            toast.error(err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full space-y-4 pb-10'>
            <h4 className='heading-3 pl-2 md:pl-0 mb-4 md:mb-8'>Login</h4>

            <div className='space-y-2'>
                <Input
                    label='Email'
                    placeholder='@kush'
                    value={form.email}
                    error={errors.email}
                    onChange={(e: any) => handleChange("email", e.target.value)} />

                <div className='space-y-2'>
                    <Input
                        type="password"
                        label="Password"
                        placeholder='*********'
                        value={form.password}
                        error={errors.password}
                        onChange={(e: any) => handleChange("password", e.target.value)} />

                    <div className='text-right'>
                        <p className='italic underline font-bold text-[10px]'>Forgot Password</p>
                    </div>
                </div>

                <Button variant='primary' onClick={handleSubmit} disabled={loading} className='w-full mt-4'>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </div>

            <div className='text-center space-y-3'>
                <p className='text-[12px] font-bold'>Don't have an account yet?</p>
                <p className='text-[12px] font-bold underline cursor-pointer' onClick={() => router.push("/signup")}>Create Account</p>
            </div>
        </div>
    )
}

export default LoginForm
