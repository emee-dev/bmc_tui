import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonStyle = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring focus-visible:ring-blue-500/50",
  {
    variants: {
      size: {
        default: "px-2 py-1",
        small: "px-1 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size">,
    VariantProps<typeof buttonStyle> {
  asChild?: boolean;
  variant?:
    | "background0"
    | "background1"
    | "background2"
    | "background3"
    | "foreground0"
    | "foreground1"
    | "foreground2";
  box?: "round" | "square" | "double";
}

function Button({
  className,
  size,
  asChild = false,
  variant,
  box,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      is-="button"
      {...(variant && { ["variant-"]: variant })}
      {...(box && { ["box-"]: box })}
      className={cn(buttonStyle({ size }), className)}
      {...props}
    />
  );
}

export { Button, buttonStyle };
