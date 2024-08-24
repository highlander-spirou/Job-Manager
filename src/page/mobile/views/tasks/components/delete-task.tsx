import Button from "@/components/button"
import { Trash2Icon } from "@/components/icons"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"
import { useMainContext } from "@/contexts"
import {
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  NestedDrawer,
} from "@/components/drawer"

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
    <NestedDrawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="outlined" color="error" layout="with-icon">
          <Trash2Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title={`Delete "${taskName}"?`} />
        <Button
          variant="solid"
          color="error"
          className="w-full mt-5"
          onClick={() =>
            dispatch({
              type: "deleteTask",
              payload: taskName,
            })
          }
        >
          Delete
        </Button>
      </DrawerContent>
    </NestedDrawer>
  )
}
