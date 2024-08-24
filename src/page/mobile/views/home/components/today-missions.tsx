import { FileTextIcon } from "@/components/icons"
import { ScrollArea } from "@/components/scroll-area"
import { useMainContext } from "@/contexts"
import dayjs from "dayjs"

type TodayTaskItemProps = {
  title: string
  jobId: string
  deadline: Date
}

export const TodayTaskItem: React.FC<TodayTaskItemProps> = ({
  title,
  deadline,
  jobId,
}) => {
  const {
    jobs,
    menu,
    jobSelection: { selectJob },
  } = useMainContext()

  const { changeMenu, MenuCode } = menu
  const job = jobs.find((job) => job.id === jobId)!

  const handler = () => {
    selectJob(job.id!)
    changeMenu(MenuCode.Tasks)
  }

  return (
    <>
      <div 
      onClick={handler}
      className="mt-2 w-full h-14 grid grid-cols-[40px_1fr] place-items-center px-2">
        <span className="bg-zinc-100 w-full aspect-square rounded-full inline-flex items-center justify-center">
          <FileTextIcon />
        </span>
        <div className="place-self-start self-center ms-3 w-full">
          <div className="flex items-center justify-between mr-2">
            <p
              className="font-bold text-warning line-clamp-1 max-w-[160px]"
              title={title}
            >
              {title}
            </p>
            <p className="text-sm">
              {dayjs(deadline).format("ddd DD/MM/DD hh:mm A")}
            </p>
          </div>

          <p className="line-clamp-1 font-bold">{job.name}</p>
        </div>
      </div>
    </>
  )
}

const TodayMissions = () => {
  const { importantTasks } = useMainContext()

  return (
    <>
      <ScrollArea className="h-56 border-b">
        {importantTasks.map((task, index) => (
          <TodayTaskItem
            key={index}
            title={task.title}
            jobId={task.jobId}
            deadline={task.deadline}
          />
        ))}
      </ScrollArea>
    </>
  )
}

export default TodayMissions
