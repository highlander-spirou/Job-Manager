import { JobDTO } from "@/lib/firestore"
import { useState } from "react"

const useJobs = () => {
  const [jobs, setJobs] = useState<JobDTO[]>([])

  return { jobs, setJobs }
}

export default useJobs
