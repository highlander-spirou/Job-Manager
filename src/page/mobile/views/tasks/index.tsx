import { useMainContext } from "@/contexts"
import TaskTimeline from "./components/task-timeline"
import { NewTask } from "./components/new-task"

const TasksView = () => {
  const {
    jobSelection: { currentJobId },
  } = useMainContext()
  return (
    <>
      <div>
        {currentJobId ? (
          <>
            <TaskTimeline />
            <div className="absolute z-10 bottom-5 right-5">
              <NewTask />
            </div>
          </>
        ) : (
          <p className="mt-5 font-bold text-lg text-warning text-center">
            Select a job to view timeline
          </p>
        )}
      </div>
    </>
  )
}

export default TasksView
