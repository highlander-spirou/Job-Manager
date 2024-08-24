import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { PropsWithChildren } from "react"
import { CircleXIcon, InfoIcon, TriangleAlertIcon } from "../icons"

const alertVariants = cva(
  ["flex w-full h-14 rounded-xl flex items-center pl-5 gap-5"],
  {
    variants: {
      variant: {
        error: "bg-error-alert",
        warning: "bg-warning-alert",
        primary: "bg-default-alert",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const AlertIcon = ({ type }) => {
  switch (type) {
    case "error":
      return <CircleXIcon className="w-5 h-5 stroke-alert-content" />

    case "warning":
      return <TriangleAlertIcon className="w-5 h-5 stroke-alert-content" />

    default:
      return <InfoIcon className="w-5 h-5 stroke-alert-content" />
  }
}

type AlertProps = {
  className?: string
} & VariantProps<typeof alertVariants>

const Alert = ({
  className,
  variant,
  children,
}: PropsWithChildren<AlertProps>) => {
  return (
    <div className={cn(alertVariants({ variant, className }))}>
      <AlertIcon type={variant} />
      <div className="w-full flex items-center justify-between">{children}</div>
    </div>
  )
}

export default Alert
