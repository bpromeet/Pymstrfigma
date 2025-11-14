import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          // MD3 Standard Outlined Input (4px Extra Small radius)
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground glass-subtle border-input flex h-12 w-full min-w-0 rounded border px-4 py-3 text-base bg-input-background transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "hover:border-[#757575] focus-visible:border-[#1E88E5] focus-visible:border-2 focus-visible:ring-2 focus-visible:ring-[#1E88E5]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:border-2 aria-invalid:ring-2",
          "text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] dark:placeholder:text-[#798A9B] bg-transparent dark:bg-transparent border-[#43586C] dark:border-[#43586C] hover:border-[#757575] dark:hover:border-[#757575] focus-visible:border-[#1E88E5] dark:focus-visible:border-[#1E88E5]",
          className,
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };