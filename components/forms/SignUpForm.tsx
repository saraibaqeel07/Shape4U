"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { validateSignup } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import ApiServices from "@/services/Apis";
import { toast } from "sonner";

const SignupForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateSignup(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await ApiServices.Signup(form);
      if (data?.token || data?.accessToken) {
        localStorage.setItem("token", data?.token || data?.accessToken);
      }
      toast.success("Account created! Please complete your profile.");
      router.push("/prescreen");
    } catch (err: any) {
      toast.error(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
      <h3 className="heading-3">Create an account</h3>

      <div className="space-y-2 w-full">
        <Input
          label="First Name"
          placeholder="Kush"
          value={form.firstName}
          onChange={(e: any) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          placeholder="Sharma"
          value={form.lastName}
          onChange={(e: any) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
        />
        <Input
          label="Email"
          placeholder="kush@email.com"
          value={form.email}
          onChange={(e: any) => handleChange("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(e: any) => handleChange("password", e.target.value)}
          error={errors.password}
        />
      </div>

      <Button variant="primary" className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>

      <div className="text-center space-y-3">
        <p className="text-[12px] font-bold">Already have an account?</p>
        <p className="text-[12px] font-bold underline cursor-pointer" onClick={() => router.push("/login")}>LogIn</p>
      </div>
    </div>
  );
};

export default SignupForm;
