import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const variantClass = variant === "primary" 
      ? "btn-primary" 
      : variant === "outline" 
      ? "btn-outline" 
      : "";

    return (
      <button
        ref={ref}
        className={`btn ${variantClass} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
