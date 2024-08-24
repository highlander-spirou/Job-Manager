import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  layout: "mobile" | "desktop"
}

function Calendar({
  className,
  classNames,
  layout,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium font-mono",
        nav: "space-x-1 flex items-center",
        nav_button: cn(layout === "desktop" ? "h-7 w-7" : "h-10 w-10"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          layout === "desktop" ? "w-9" : "w-12",
          "text-primary-content rounded-md font-normal text-[0.8rem] font-mono"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          layout === "desktop" ? "h-9 w-9" : "h-10 w-12",
          "text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-white/50 [&:has([aria-selected])]:bg-white first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
        ),
        day: "h-9 w-9 font-mono hover:bg-blue-100 rounded-lg",
        day_range_end: "day-range-end",
        day_selected: "bg-blue-400 text-white font-bold hover:text-primary-content",
        day_today: "font-mono",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-blue-400/50 aria-selected:text-primary-content aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-white aria-selected:text-accent-foreground font-mono",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-4 w-4"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        ),
        IconRight: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-4 h-4"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
