import { JobDTO } from "@/lib/firestore"
import {
  calAllJobsCompletion,
  calculateUndones,
  calJobCompletion,
} from "@/lib/jobs.service"

export const useJobStats = (jobs: JobDTO[]) => {
  let jobProgress: ReturnType<typeof calJobCompletion> | null = null
  let overallStats: ReturnType<typeof calAllJobsCompletion> | null = null
  let undoneJobs: ReturnType<typeof calculateUndones> | null = null

  if (jobs.length > 0) {
    jobProgress = calJobCompletion(jobs)
  }

  if (jobProgress) {
    overallStats = calAllJobsCompletion(jobProgress)
    undoneJobs = calculateUndones(jobs, jobProgress)
  }

  return { jobProgress, overallStats, undoneJobs }
}

export default useJobStats
