"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { animate, easeOut, motion } from "framer-motion";
import { FaCompass } from "react-icons/fa";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  Hover?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      color,
      type = false,
      Hover = true,

      ...props
    },
    ref
  ) => {
    const [check, setcheck] = React.useState(false);

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative z-10 flex items-center justify-center cursor-pointer"
        )}>
        <motion.div
          className={cn(
            "absolute z-10 flex items-center justify-center cursor-pointer w-full h-full"
          )}
          onHoverStart={() => setcheck(true)}
          onHoverEnd={() => setcheck(false)}
          whileHover={
            Hover
              ? {
                  scale: 1.05,
                  cursor: "pointer",
                  transition: { ease: easeOut, duration: 0.5 },
                }
              : {}
          }
          style={{ width: "100%" }} // Ensure the parent div takes full width
        >
          <p className="z-[10] relative"> {props.children}</p>
          <motion.span
            className={`absolute ${color ? color : ""}`} // Use inset-0 to cover full width
            initial={{ height: 0, width: 0, borderRadius: 1000 }}
            animate={
              check
                ? {
                    height: "100%",
                    width: "100%",
                    borderRadius: 3,
                    transition: { ease: easeOut, duration: 0.5 },
                  }
                : {}
            }
          />
        </motion.div>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
