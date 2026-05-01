"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightText?: string;
  onRightClick?: () => void;
  name?: string;
  error?: string;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightText,
  onRightClick,
  name,
  error,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  // If it's a password field → toggle text/password
  // Otherwise, use the type passed in (text, number, email, etc.)
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="ml-4 text-[14px] font-bold italic text-[#262525]">
            {label}
          </label>
        )}

        {rightText && (
          <button
            type="button"
            onClick={onRightClick}
            className="text-[12px] font-medium text-[#4B5563] underline hover:opacity-80"
          >
            {rightText}
          </button>
        )}
      </div>

      {/* Input */}
      <div className="relative flex-1">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-[60px] border ${
            error ? "border-red-500 focus:border-red-500" : "border-[#5E5F5F]"
          } bg-transparent pr-6 pl-3.5 py-2.5 text-[12px] text-[#262525] placeholder:text-[#262525] italic outline-none transition focus:border-black`}
        />

        {/* Eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>

      {/* Error */}
      <p className="text-[11px] text-red-500 ml-4 min-h-[8px]">{error || ""}</p>
    </div>
  );
};

export default Input;