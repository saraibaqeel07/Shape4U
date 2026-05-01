import React, { MouseEvent, ReactNode } from "react";

type ButtonVariant = "red" | "primary" | "secondary" | "blue" | "white" | "green";

interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  fullwidth?: boolean;
  size?: "small" | "default";
  weight?: "normal" | "medium";
  loading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  outline?: boolean;
  bgColor?: string;
  blackText?: boolean;
}

const VariantStyle = {
    primary: {
        style: " text-white hover:shadow-lg  bg-[#7FB33B]"    
    },
    secondary: {
        style: "border-[1px] border-[#E2E8F0] bg-[#FAFBFC]"
    },
    white: {
        style: "border-[1px] text-[#0A0A0A] border-black/10"
    },
    blue: {
        style: "bg-primary text-white"
    },
    red: {
        style: "bg-red text-white"
    },
    green: {
        style: "bg-gradient-to-r text-white from-[#00A63E] to-[#009966]"
    }
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  fullwidth = false,
  size = "default",
  loading = false,
  onClick,
  weight=  "normal",
  type = "button",
  disabled = false,
  children,
}) => {

  const style = VariantStyle[variant].style;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
         rounded-full
         flex justify-center items-center gap-2
        ${fullwidth ? "w-full" : ""}
        ${size === "small" ? "px-3 py-2 text-sm" : "px-2.5 md:px-4 h-[51px]"}
        text-[12px] md:text-[14px] 
        italic
        ${className}
        ${weight == "medium" ? " font-bold" : "font-bold"}
        transition-all duration-150 ease-out
        active:scale-[0.96]
        ${style}
      `}
    >
      {loading ? (
        <div className="flex w-full justify-center gap-1 text-white">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-current" />
          <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-current [animation-delay:0.2s]" />
          <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-current [animation-delay:0.4s]" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
