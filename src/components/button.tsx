import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

export const buttonVariants = cva(
  [
    "relative px-4 rounded-lg line-clamp-1 font-bold font-sans text-center outline-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-gray-300 group",
  ],
  {
    variants: {
      variant: {
        outlined: "outlined border shadow-md",
        solid: "solid border-0 hover:brightness-90 shadow-md",
        ghost: "ghost border-0 hover:brightness-90",
        soft: "soft",
        link: "link !text-start !px-0 after:absolute after:bottom-2 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
      },
      color: {
        default: cn(
          "[&.outlined]:border-primary [&.outlined]:hover:bg-primary [&.outlined]:hover:text-primary-content",
          "[&.link]:after:bg-zinc-500"
        ),
        secondary: cn(
          "text-secondary [&.outlined]:border-secondary [&.outlined]:hover:bg-secondary [&.outlined]:hover:text-secondary-content",
          "[&.link]:after:bg-secondary"
        ),
        accent: cn(
          "text-accent [&.outlined]:border-accent [&.outlined]:hover:bg-accent [&.outlined]:hover:text-accent-content",
          "[&.link]:after:bg-accent"
        ),
        info: cn(
          "text-info [&.outlined]:border-info [&.outlined]:hover:bg-info [&.outlined]:hover:text-info-content",
          "[&.link]:after:bg-info"
        ),
        success: cn(
          "text-success [&.outlined]:border-success [&.outlined]:hover:bg-success [&.outlined]:hover:text-success-content",
          "[&.link]:after:bg-success"
        ),
        warning: cn(
          "text-warning [&.outlined]:border-warning [&.outlined]:hover:bg-warning [&.outlined]:hover:text-warning-content",
          "[&.link]:after:bg-warning"
        ),
        error: cn(
          "text-error [&.outlined]:border-error [&.outlined]:hover:bg-error [&.outlined]:hover:text-error-content",
          "[&.link]:after:bg-error"
        ),
      },
      size: {
        small: "h-8",
        medium: "h-9",
        large: "h-11",
      },
      layout: {
        normal: "w-fit min-w-16",
        "with-icon": "flex justify-center items-center gap-2",
        icon: "aspect-square rounded-full flex justify-center items-center p-0",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "default",
        className: "border-0 bg-primary text-primary-content",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "border-0 bg-secondary text-secondary-content",
      },
      {
        variant: "solid",
        color: "accent",
        className: "border-0 bg-accent text-accent-content",
      },
      {
        variant: "solid",
        color: "info",
        className: "border-0 bg-info text-info-content",
      },
      {
        variant: "solid",
        color: "success",
        className: "border-0 bg-success text-success-content",
      },
      {
        variant: "solid",
        color: "warning",
        className: "border-0 bg-warning text-warning-content",
      },
      {
        variant: "solid",
        color: "error",
        className: "border-0 bg-error text-error-content",
      },
      {
        variant: "soft",
        color: "default",
        className:
          "border-0 bg-primary/30 text-neutral-content font-normal hover:bg-primary/50",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "border-0 bg-secondary/30 text-neutral-content font-normal hover:bg-secondary/50",
      },
      {
        variant: "soft",
        color: "accent",
        className:
          "border-0 bg-accent/30 text-neutral-content font-normal hover:bg-accent/50",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "border-0 bg-info/30 text-neutral-content font-normal hover:bg-info/50",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "border-0 bg-success/30 text-neutral-content font-normal hover:bg-success/50",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "border-0 bg-warning/30 text-neutral-content font-normal hover:bg-warning/50",
      },
      {
        variant: "soft",
        color: "error",
        className:
          "border-0 bg-error/30 text-neutral-content font-normal hover:bg-error/50",
      },
      {
        variant: "link",
        size: "small",
        className: "after:bottom-1",
      },
      {
        variant: "link",
        size: "medium",
        className: "after:bottom-1",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "default",
      size: "large",
      layout: "normal",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, layout, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ color, size, layout, variant, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Button
