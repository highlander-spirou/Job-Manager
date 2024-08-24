import React from "react"
import { BadgeCheckIcon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"
import Button from "@/components/button"

type MarkAsDoneProps = {
  taskName: string
  isFinished: boolean
}

const MarkAsDone: React.FC<MarkAsDoneProps> = ({ taskName, isFinished }) => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()

  const dispatch = useTaskMutation(currentJobId!, jobs)

  return (
    <>
      <Button
        variant="soft"
        color={isFinished ? "success" : "default"}
        layout="with-icon"
        onClick={() => dispatch({ type: "markAsDone", payload: taskName })}
      >
        <BadgeCheckIcon />
      </Button>
    </>
  )
}

export default MarkAsDone
