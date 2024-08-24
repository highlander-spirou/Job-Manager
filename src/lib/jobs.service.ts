import { JobDTO } from "@/lib/firestore"
import { Task } from "@/types"
import dayjs from "dayjs"

export const calJobCompletion = (jobs: JobDTO[]) => {
  const completionPercentage: Record<string, number> = {}

  jobs.forEach((job) => {
    const totalTasks = job.tasks.length
    const finishedTasks = job.tasks.filter((task) => task.finished).length
    const percentage =
      totalTasks > 0 ? Math.floor((finishedTasks / totalTasks) * 100) : 0

    completionPercentage[job.id!] = percentage
  })
  return completionPercentage
}

export const calAllJobsCompletion = (
  completionStats: ReturnType<typeof calJobCompletion>
) => {
  const jobDone = Object.values(completionStats).filter(
    (value) => value === 100
  ).length
  return {
    done: jobDone,
    progress: Object.keys(completionStats).length - jobDone,
  }
}

export const getJobDeadline = (tasks: Task[]) => {
  if (tasks.length > 0) {
    const deadlines = tasks.map((task) => task.deadline)
    const endDate = dayjs(Math.max(...deadlines.map((date) => date.getTime())))
    return endDate
  }
  return null
}

export const calculateUndones = (
  jobs: JobDTO[],
  jobProgress: ReturnType<typeof calJobCompletion> | null
) => {
  if (jobProgress !== null) {
    const filteredJobs = Object.fromEntries(
      Object.entries(jobProgress).filter(([_, value]) => value !== 100)
    )
    const undones: { id: string; name: string; timeDelta: number | null }[] = []

    Object.keys(filteredJobs).forEach((element) => {
      const job = jobs.find((job_) => job_.id === element)
      if (job) {
        const deadline = getJobDeadline(job.tasks)
        const timeDelta = deadline ? deadline.diff() / (1000 * 60 * 60) : null
        undones.push({ id: job.id!, name: job.name, timeDelta: timeDelta })
      }
    })

    return undones
  }
  return null
}
