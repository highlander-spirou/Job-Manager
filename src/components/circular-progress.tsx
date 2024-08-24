import React from "react"
import { cn } from "@/lib/utils"

type RadialProgressProps = React.PropsWithChildren & {
  radialClassName?: string
  innerClassName?: string
}

export const RadialProgress: React.FC<RadialProgressProps> = ({
  radialClassName,
  innerClassName,
  children,
}) => {
  return (
    <>
      <div className={cn("w-5 h-5", radialClassName)}>
        <svg
          className="-rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={cn("stroke-[4px] stroke-zinc-200", innerClassName)}
          ></circle>
          {children}
        </svg>
      </div>
    </>
  )
}

type DoneProgressProps = {
  className?: string
  value: number
}

export const DoneProgress: React.FC<DoneProgressProps> = ({
  value,
  className,
}) => {
  return (
    <>
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        className={cn("stroke-[4px] stroke-[#FF8225]", className)}
        strokeDasharray="100"
        strokeDashoffset={100 - value}
        strokeLinecap="round"
      ></circle>
    </>
  )
}
