import React from "react"
import { cn } from "@/lib/utils"
import ExpandableButton from "@/components/expandable-button"
import { BadgeCheckIcon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"

type MarkAsDoneProps = {
  taskName: string
  isFinished: boolean
}

const MarkAsDone: React.FC<MarkAsDoneProps> = ({
  taskName,
  isFinished,
}) => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()

  const dispatch = useTaskMutation(currentJobId!, jobs)

  return (
    <>
      <ExpandableButton
        label={isFinished ? "Uncheck" : "Check"}
        variant="ghost"
        labelClassName={cn(
          isFinished ? "text-success" : "text-primary",
          "group-hover:w-14"
        )}
        btnClassName="border-0"
        onClick={() => dispatch({ type: "markAsDone", payload: taskName })}
      >
        <BadgeCheckIcon
          className={cn(
            "w-5 h-5",
            isFinished ? "stroke-success" : "stroke-primary"
          )}
        />
      </ExpandableButton>
    </>
  )
}

export default MarkAsDone
