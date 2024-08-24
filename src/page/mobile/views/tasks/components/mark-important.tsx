import React from "react"
import Button from "@/components/button"
import { StarIcon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"

type MarkImportantProps = {
  taskName: string
  isImportant: boolean
}

const MarkImportant: React.FC<MarkImportantProps> = ({
  taskName,
  isImportant,
}) => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()

  const dispatch = useTaskMutation(currentJobId!, jobs)

  return (
    <>
      <Button
        variant="ghost"
        color="warning"
        layout="with-icon"
        onClick={() => dispatch({ type: "toggleImportant", payload: taskName })}
      >
        <StarIcon active={isImportant} />
      </Button>
    </>
  )
}

export default MarkImportant
