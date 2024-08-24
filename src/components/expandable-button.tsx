import { cn } from "@/lib/utils"
import React from "react"
import Button, { buttonVariants } from "./button"
import { VariantProps } from "class-variance-authority"

type Colors = VariantProps<typeof buttonVariants>["color"]
type Variant = "ghost" | "outlined"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  labelClassName?: string
  btnClassName?: string
  color?: Colors
  variant?: Variant
}

const ExpandableButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, color, label, btnClassName, children, labelClassName, ...props },
    ref
  ) => {
    return (
      <>
        <Button
          {...props}
          variant={variant}
          ref={ref}
          color={color}
          layout="with-icon"
          className={cn(
            "px-2 py-2 justify-center font-medium gap-0 hover:gap-2",
            btnClassName
          )}
        >
          {children}
          <span
            className={cn(
              "text-sm font-semibold font-sans line-clamp-1 w-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:ms-1 group-hover:w-12",
              labelClassName
            )}
          >
            {label}
          </span>
        </Button>
      </>
    )
  }
)

export default ExpandableButton
