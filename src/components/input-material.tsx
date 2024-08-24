import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React, { useId } from "react"
import { CalendarDaysIcon, ClockIcon } from "./icons"

const MaterialInputVariants = cva(
  "w-full h-12 p-3 rounded-lg outline-none border-2 duration-200 peer",
  {
    variants: {
      color: {
        zinc: "border-zinc-300 focus:border-zinc-600 bg-white",
      },
    },
    defaultVariants: {
      color: "zinc",
    },
  }
)

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "label"
>

type MaterialInputProps = BaseInputProps &
  VariantProps<typeof MaterialInputVariants> & {
    label: string
  }

export const MaterialInput = React.forwardRef<
  HTMLInputElement,
  MaterialInputProps
>(({ label, className, color, ...props }, ref) => {
  return (
    <>
      <div className="relative float-label-input">
        <input
          {...props}
          id={!props.id ? useId() : props.id}
          ref={ref}
          placeholder=""
          className={cn(MaterialInputVariants({ color }), className)}
        />
        <label
          htmlFor={!props.id ? useId() : props.id}
          className="absolute left-3 inset-y-3 pointer-events-none duration-200 px-1"
        >
          {label}
        </label>
      </div>
    </>
  )
})

type CalenderInputProps = React.ComponentPropsWithoutRef<"button"> & {
  label: string
  placeholder: string
  isActive?: boolean
}

export const CalenderInput = React.forwardRef<
  React.ElementRef<"button">,
  CalenderInputProps
>(({ label, placeholder, isActive = false, className, ...props }, ref) => {
  return (
    <>
      <div className="calender-trigger relative">
        <label
          htmlFor={!props.id ? useId() : props.id}
          className={cn(
            "absolute left-3 inset-y-1/4 pointer-events-none duration-200 px-1",
            isActive ? "active" : ""
          )}
        >
          {placeholder}
        </label>
        <button
          ref={ref}
          {...props}
          id={!props.id ? useId() : props.id}
          className={cn(
            "text-start",
            MaterialInputVariants({ color: "zinc" }),
            className
          )}
        >
          {label}
        </button>
        <span className="absolute inset-y-0 end-0 flex items-center pe-3">
          <CalendarDaysIcon />
        </span>
      </div>
    </>
  )
})

type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  label: string
}

export const MaterialTextArea = React.forwardRef<
  React.ElementRef<"textarea">,
  TextareaProps
>(({ label, className, ...props }, ref) => {
  return (
    <>
      <div className="relative float-label-input">
        <textarea
          ref={ref}
          {...props}
          id={!props.id ? useId() : props.id}
          placeholder=""
          className={cn(
            "w-full rounded-lg outline-none border-2 duration-200",
            className
          )}
          style={{
            minHeight: "calc(2lh + 2 * 10px)",
            maxHeight: "calc(4lh + 2 * 10px)",
            padding: "10px",
            lineHeight: 1.5,
          }}
        ></textarea>
        <label
          htmlFor={!props.id ? useId() : props.id}
          className="absolute left-3 top-3 pointer-events-none duration-200 px-1"
        >
          {label}
        </label>
      </div>
    </>
  )
})

export const MaterialTimePicker = React.forwardRef<
  HTMLInputElement,
  MaterialInputProps
>(({ label, className, color, ...props }, ref) => {
  return (
    <>
      <div className="relative mt-5">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <ClockIcon />
        </div>
        <MaterialInput
          {...props}
          ref={ref}
          id={!props.id ? useId() : props.id}
          className="text-base"
          type="time"
          label={label}
        />
      </div>
    </>
  )
})
