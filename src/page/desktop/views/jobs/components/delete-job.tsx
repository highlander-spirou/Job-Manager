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

import ExpandableButton from "@/components/expandable-button"
import { Trash2Icon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import useJobsMutation from "@/contexts/derivedJob/useJobsMutation"

type DeleteJobProps = {
  jobId: string
}

export const DeleteJob: React.FC<DeleteJobProps> = ({ jobId }) => {
  const {
    jobs,
    jobSelection: { deleteFromSelection },
  } = useMainContext()
  const dispatch = useJobsMutation()

  const job = jobs.find((job) => job.id === jobId)!

  const deleteHandler = () => {
    dispatch({ type: "deleteJob", payload: job.id! })
    deleteFromSelection(job.id!)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExpandableButton
          label="Delete"
          variant="ghost"
          labelClassName="text-error"
          btnClassName="border-error"
        >
          <Trash2Icon className="stroke-error w-4 h-4" />
        </ExpandableButton>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100">
        <DialogHeader>
          <DialogTitle>Delete "{job.name}"?</DialogTitle>
        </DialogHeader>
        <p className="text-error font-medium">
          ❗ This also deletes all the tasks within
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="solid" color="error" onClick={deleteHandler}>
              Delete Job
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
