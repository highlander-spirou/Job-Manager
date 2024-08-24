import dayjs from "dayjs"
import { JobDTO } from "./firestore"
import { ComputedTasks, statusType, Task } from "@/types"

const computeTaskStatus = (task: Task): statusType => {
  if (task.finished) {
    return "done"
  } else {
    if (dayjs().isAfter(dayjs(task.deadline))) {
      return "late"
    }
    return "pending"
  }
}

export const computedTask = (
  currentJobId: string,
  jobs: JobDTO[]
): ComputedTasks[] => {
  const tasks = jobs.find((job) => job.id === currentJobId)!.tasks

  return tasks.map((x) => ({
    name: x.name,
    content: x.content,
    status: computeTaskStatus(x),
    deadline: x.deadline,
    finished: x.finished,
    important: x.important,
  }))
}
