import { JobDTO } from "@/lib/firestore"
import { ImportantTasks } from "@/types"

const useImportantTasks = (jobs: JobDTO[]) => {
  let importantTasks: ImportantTasks[] = []

  if (jobs.length > 0) {
    jobs.forEach((job) => {
      if (job.tasks.length > 0) {
        job.tasks.forEach((task) => {
          if (task.important) {
            importantTasks.push({
              title: task.name,
              deadline: task.deadline,
              jobId: job.id!,
              important: task.important,
            })
          }
        })
      }
    })
  }
  return importantTasks
}

export default useImportantTasks
