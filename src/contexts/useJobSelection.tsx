import { JobDTO } from "@/lib/firestore"
import { useState } from "react"

const useJobSelection = (jobs: JobDTO[]) => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const [jobSelectedList, setJobSelectedList] = useState<Map<string, string>>(
    new Map()
  )

  const selectJob = (jobId: string) => {
    if (jobSelectedList.has(jobId)) {
      setCurrentJobId(jobId)
    } else {
      setJobSelectedList((oldMap) => {
        const newMap = new Map(oldMap)
        const job = jobs.find((x) => x.id === jobId)
        if (job) {
          newMap.set(jobId, job.name)
        }
        return newMap
      })
      setCurrentJobId(jobId)
    }
  }

  const changeOrder = (newOrder: { key: string; value: string }[]) => {
    setJobSelectedList(new Map(newOrder.map((obj) => [obj.key, obj.value])))
  }

  const deleteFromSelection = (jobId: string) => {
    const newMap = new Map(jobSelectedList)
    newMap.delete(jobId)
    setJobSelectedList(newMap)

    if (jobId === currentJobId) {
      if (newMap.size > 0) {
        const newJobId = newMap.keys().next().value
        setCurrentJobId(newJobId)
      } else {
        setCurrentJobId(null)
      }
    }
  }

  return {
    currentJobId,
    jobSelectedList,
    selectJob,
    changeOrder,
    deleteFromSelection,
  }
}

export default useJobSelection