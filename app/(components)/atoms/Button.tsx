import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    onClick?: () => void;
    className?: string;
    type?: "submit" | "button" | "reset";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    pending?: boolean;
};

export const Button = ({
      children,
      variant = "primary",
      onClick,
      className = "",
      type = "button",
      size = "md",
      disabled = false,
}: ButtonProps) => {
  const variants = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-white hover:bg-secondary/90",
      ghost: "bg-transparent border border-primary text-primary hover:bg-gray-100",
  };

  const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold cursor-pointer transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
