import Button from "@/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog-legacy"
import { Trash2Icon } from "@/components/icons"
import ExpandableButton from "@/components/expandable-button"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"
import { useMainContext } from "@/contexts"

type DeleteTaskProps = {
  taskName: string
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({ taskName }) => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()

  const dispatch = useTaskMutation(currentJobId!, jobs)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExpandableButton
          label="Delete"
          variant="ghost"
          labelClassName="text-error"
          btnClassName="border-0"
        >
          <Trash2Icon className="stroke-error w-4 h-4" />
        </ExpandableButton>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100">
        <DialogHeader>
          <DialogTitle>Delete "{taskName}"?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="solid"
              color="error"
              onClick={() =>
                dispatch({
                  type: "deleteTask",
                  payload: taskName,
                })
              }
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
