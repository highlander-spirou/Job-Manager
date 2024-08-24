import { cn } from "@/lib/utils"
import { useState } from "react"

export const useFormSuccess = (timeout: number | undefined = 2000) => {
  const [formSuccess, setFormSuccess] = useState(false)

  const triggerFormSuccess = () => {
    setFormSuccess(true)
    setTimeout(() => {
      setFormSuccess(false)
    }, timeout)
  }

  return { formSuccess, triggerFormSuccess }
}

type FormSuccessMessageProps = {
  body: string
  className?: string
}

export const FormSuccessMessage: React.FC<FormSuccessMessageProps> = ({
  body,
  className,
  ...props
}) => {
  return (
    <>
      <p
        className={cn("text-sm font-medium text-green-600", className)}
        {...props}
      >
        {body}
      </p>
    </>
  )
}
