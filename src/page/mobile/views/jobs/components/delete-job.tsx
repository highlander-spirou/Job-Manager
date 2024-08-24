import Button from "@/components/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/components/drawer"
import { Trash2Icon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import useJobsMutation from "@/contexts/derivedJob/useJobsMutation"
import { motion } from "framer-motion"

type DeleteJobProps = {
  jobId: string
  xPosition: number
  restartPosition: () => void
}

export const DeleteJob: React.FC<DeleteJobProps> = ({
  jobId,
  xPosition,
  restartPosition,
}) => {
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
    <Drawer>
      <DrawerTrigger asChild>
        <motion.button
          className="absolute right-0 top-0 h-full w-20 bg-error "
          initial={{ visibility: "hidden" }}
          animate={{ visibility: xPosition === -80 ? "visible" : "hidden" }}
          onClick={restartPosition}
        >
          <Trash2Icon className="w-6 h-6 stroke-error-content mx-auto" />
        </motion.button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title={`Delete "${job.name}"?`} />
        <p className="text-error font-medium mt-7">
          ❗ This also deletes all the tasks within
        </p>
        <Button
          variant="solid"
          color="error"
          onClick={deleteHandler}
          className="mt-7 w-full"
        >
          Delete Job
        </Button>
      </DrawerContent>
    </Drawer>
  )
}
