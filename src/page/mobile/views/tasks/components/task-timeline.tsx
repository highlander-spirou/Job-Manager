import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { CheckIcon, CircleXIcon, TriangleAlertIcon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import { computedTask } from "@/lib/tasks.service"
import { displayDate } from "@/lib/utils"
import { ComputedTasks, statusType } from "@/types"
import { DeleteTask } from "./delete-task"
import { EditTask } from "./edit-task"
import MarkAsDone from "./mark-as-done"
import MarkImportant from "./mark-important"

const TaskIcon = ({ type }: { type: statusType }) => {
  switch (type) {
    case "done":
      return (
        <div>
          <CheckIcon className="w-5 h-5 stroke-success" />
        </div>
      )
    case "late":
      return (
        <div>
          <CircleXIcon className="w-5 h-5 stroke-error" />
        </div>
      )
    default:
      return (
        <div>
          <TriangleAlertIcon className="w-5 h-5 stroke-warning" />
        </div>
      )
  }
}

type TimelineItemProps = {
  task: ComputedTasks
}

const TimelineItem = ({ task }: TimelineItemProps) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="p-2 border-b">
            <p
              className="line-clamp-2 col-span-2 font-bold"
              style={{ height: `calc(2lh)` }}
            >
              {task.name}
            </p>
            <div className="flex gap-3 items-center">
              <TaskIcon type={task.status} />
              <p className="font-bold text-sm">
                {displayDate(task.deadline, true)}
              </p>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle title={task.name} />
          <div className="grid gap-7">
            <div className="flex gap-3 items-center">
              <TaskIcon type={task.status} />
              <p className="font-bold text-sm">
                {displayDate(task.deadline, true)}
              </p>
            </div>
            <div>
              <h4>Description: </h4>
              <p className="whitespace-pre-line mt-2">{task.content}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <EditTask task={task} />
                <DeleteTask taskName={task.name} />
              </div>
              <div className="flex gap-4">
                <MarkAsDone taskName={task.name} isFinished={task.finished} />
                <MarkImportant
                  taskName={task.name}
                  isImportant={task.important}
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const TaskTimeline = () => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()
  const tasks = computedTask(currentJobId!, jobs)

  return (
    <>
      <div className="">
        {tasks.map((task, index) => (
          <TimelineItem key={index} task={task} />
        ))}
      </div>
    </>
  )
}

export default TaskTimeline
