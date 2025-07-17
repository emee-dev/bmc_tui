"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
}

function Tooltip({ children }: TooltipProps) {
  return <div is-="tooltip">{children}</div>;
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "background0"
    | "background1"
    | "background2"
    | "background3"
    | "foreground0"
    | "foreground1"
    | "foreground2";
  asBadge?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, asBadge, variant, ...props }, ref) => (
    <div
      ref={ref}
      is-={`tooltip-trigger ${asBadge ? "badge" : ""}`}
      {...(variant && { ["variant-"]: variant })}
      className={cn(className)}
      {...props}
    />
  )
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom right" | "bottom left" | "top right" | "top left"; // e.g. "top left", "bottom right"
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, position = "top left", ...props }, ref) => (
    <div
      ref={ref}
      is-="tooltip-content"
      position-={position}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  )
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent };
