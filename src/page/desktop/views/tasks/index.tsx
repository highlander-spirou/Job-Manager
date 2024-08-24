import { NewTask } from "@/page/desktop/views/tasks/components/new-task"
import TaskTab from "./components/task-tab"
import TaskTimeline from "./components/task-timeline"
import { useMainContext } from "@/contexts"

const TaskView = () => {
  return (
    <>
      <div className="w-full grid grid-cols-[auto_130px] gap-5 mt-5">
        <TaskTab />
        <NewTask />
      </div>

      <div className="mt-5 px-2 bg-white py-3 rounded-2xl">
        <TaskTimeline />
      </div>
    </>
  )
}
const TaskScreen = () => {
  const {
    jobSelection: { currentJobId },
  } = useMainContext()

  return (
    <div>
      {currentJobId ? (
        <TaskView />
      ) : (
        <p className="mt-5 font-bold text-lg text-warning text-center">
          Select a job to view timeline
        </p>
      )}
    </div>
  )
}

export default TaskScreen
