import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

const HoverTool = ({
  children,
  side,
  hideHover,
  content,
  className,
  skipDelay,
  delay,
}: {
  delay?: number;
  hideHover?: boolean;
  side?: "top" | "bottom" | "left" | "right" | undefined;
  skipDelay?: number;
  children: ReactNode;
  content: ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <TooltipProvider delayDuration={delay} skipDelayDuration={skipDelay}>
      <Tooltip>
        <TooltipTrigger className={cn(className)}>{children}</TooltipTrigger>
        {!hideHover && (
          <TooltipContent className="z-50" style={{ zIndex: 999 }} side={side}>
            {content}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoverTool;
