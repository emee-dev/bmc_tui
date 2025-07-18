import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

// export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
//   asChild?: boolean;
//   variant?:
//     | "background0"
//     | "background1"
//     | "background2"
//     | "background3"
//     | "foreground0"
//     | "foreground1"
//     | "foreground2";
//   box?: "round" | "square" | "double";
//   shear?: "both";
// }

// function Box({
//   className,
//   asChild = false,
//   variant,
//   box,
//   shear,
//   ...props
// }: BoxProps) {
//   const Comp = asChild ? Slot : "div";

//   return (
//     <Comp
//       {...(variant && { ["variant-"]: variant })}
//       {...(box && { ["box-"]: box })}
//       {...(shear && { ["shear-"]: shear })}
//       className={cn(className)}
//       {...props}
//     />
//   );
// }

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
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
  shear?: "both";
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild = false, variant, box, shear, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        {...(variant && { ["variant-"]: variant })}
        {...(box && { ["box-"]: box })}
        {...(shear && { ["shear-"]: shear })}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export interface BoxBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  variant?:
    | "background0"
    | "background1"
    | "background2"
    | "background3"
    | "foreground0"
    | "foreground1"
    | "foreground2";
  is?: "badge";
}

function BoxBadge({
  className,
  asChild = false,
  variant,
  is,
  children,
  ...props
}: BoxBadgeProps) {
  return (
    <div>
      <span
        {...(is && { ["is-"]: is })}
        {...(variant && { ["variant-"]: variant })}
        className={cn(className)}
        {...props}
      >
        {children}
      </span>
    </div>
  );
}

export { Box, BoxBadge };
