import Button from "@/components/button"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsDownIcon,
  HourglassIcon,
  TriangleAlertIcon,
} from "@/components/icons"
import { ScrollArea } from "@/components/scroll-area"
import { useMainContext } from "@/contexts"
import { computedTask } from "@/lib/tasks.service"
import { cn, displayDate } from "@/lib/utils"
import { DeleteTask } from "@/page/desktop/views/tasks/components/delete-task"
import { EditTask } from "@/page/desktop/views/tasks/components/edit-task"
import MarkAsDone from "@/page/desktop/views/tasks/components/mark-as-done"
import MarkImportant from "@/page/desktop/views/tasks/components/mark-important"
import { statusType } from "@/types"
import { useRef, useState } from "react"

const TaskContent = ({ content }: { content: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white p-4 rounded-xl border-2 border-slate-200 text-slate-500 ml-14 cursor-pointer"
      onClick={() => {
        setOpen(!open)
      }}
    >
      <p className="inline-flex relative font-merriweather text-sm whitespace-pre-line">
        <ChevronDownIcon
          className={cn(
            open ? "rotate-180" : "",
            "absolute duration-300 stroke-primary-content"
          )}
        />
        <span
          className={cn(
            !open ? "line-clamp-1 h-7 leading-loose" : "leading-relaxed",
            "tranform duration-150 indent-8"
          )}
        >
          {content}
        </span>
      </p>
    </div>
  )
}

const TaskIcon = ({ type }: { type: statusType }) => {
  switch (type) {
    case "done":
      return (
        <div className="grid place-items-center w-10 h-10 rounded-full bg-default-alert">
          <CheckIcon className="w-6 h-6 stroke-alert-content" />
        </div>
      )
    case "late":
      return (
        <div className="grid place-items-center w-10 h-10 rounded-full bg-error-alert">
          <TriangleAlertIcon className="w-5 h-5 stroke-alert-content" />
        </div>
      )
    default:
      return (
        <div>
          <div className="grid place-items-center w-10 h-10 rounded-full bg-warning-alert">
            <HourglassIcon className="w-5 h-5 stroke-alert-content" />
          </div>
        </div>
      )
  }
}

const TaskDeadline = ({ deadline }: { deadline: Date }) => {
  return (
    <>
      <div className="flex gap-2 items-center mt-2">
        <p className="font-bold text-sm">{displayDate(deadline, true)}</p>
      </div>
    </>
  )
}

const TaskTimeline = () => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()
  const tasks = computedTask(currentJobId!, jobs)

  const lastElref = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (lastElref && lastElref.current) {
      lastElref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
  }
  return (
    <>
      <ScrollArea className="h-[440px] relative pr-3">
        <Button
          color="accent"
          size="large"
          layout="icon"
          variant="solid"
          className="absolute bottom-0 right-0 z-10 rounded-full"
          onClick={scrollToBottom}
        >
          <ChevronsDownIcon className="stroke-accent-content" />
        </Button>
        <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[1.20rem] before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="relative"
              ref={index === tasks.length - 1 ? lastElref : undefined}
            >
              <div className="flex items-center space-x-4 mb-3">
                <TaskIcon type={task.status} />
                <div className="flex ml-14 justify-between w-full pr-5">
                  <div className="flex flex-col">
                    <div className="font-bold">{task.name}</div>
                    <TaskDeadline deadline={task.deadline} />
                  </div>
                  <div className="flex items-center">
                    <DeleteTask taskName={task.name} />
                    <EditTask task={task} />
                    <MarkAsDone
                      taskName={task.name}
                      isFinished={task.finished}
                    />
                    <MarkImportant
                      taskName={task.name}
                      isImportant={task.important}
                    />
                  </div>
                </div>
              </div>
              {!!task.content && <TaskContent content={task.content} />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export default TaskTimeline
