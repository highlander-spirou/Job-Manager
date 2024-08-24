import { JobDTO } from "@/lib/firestore"
import { ColumnName, Direction, JobsViewWithSort } from "@/types"
import { useState } from "react"
import { calJobCompletion, getJobDeadline } from "@/lib/jobs.service"

const useJobOrder = () => {
  const [sortOrderArray, setSortOrder] = useState<ColumnName[]>([
    "progress",
    "endDate",
    "name",
  ])
  const [order, setOrder] = useState<Record<ColumnName, Direction | null>>({
    endDate: null,
    name: null,
    progress: null,
  })

  const updateOrder = (key: ColumnName) => {
    setOrder((oldState) => {
      if (oldState[key] === "asc") {
        return { ...oldState, [key]: "desc" }
      } else if (oldState[key] === "desc") {
        return { ...order, [key]: null }
      } else {
        return { ...oldState, [key]: "asc" }
      }
    })
  }

  const updateSortOrder = (newOrder: ColumnName[]) => {
    setSortOrder(newOrder)
  }

  return { sortOrderArray, order, updateOrder, updateSortOrder }
}

export const useViewCriteria = () => {
  const sorter = useJobOrder()

  return { sorter }
}

const jobsViewWithSort = (
  jobs: JobDTO[],
  sorter: ReturnType<typeof useJobOrder>,
  completionStats: ReturnType<typeof calJobCompletion> | null
) => {
  const sortByName = (
    a: JobsViewWithSort,
    b: JobsViewWithSort,
    direction: Direction
  ) => {
    const comparison = a.name.localeCompare(b.name)
    return direction === "asc" ? comparison : -comparison
  }

  const sortByDate = (
    a: JobsViewWithSort,
    b: JobsViewWithSort,
    direction: Direction
  ) => {
    if (a.endDate && b.endDate) {
      if (a.endDate.isSame(b.endDate)) {
        return 0
      }
      const comparison = a.endDate.isAfter(b.endDate) ? 1 : -1
      return direction === "asc" ? comparison : -comparison
    } else if (a.endDate && !b.endDate) {
      return direction === "asc" ? 1 : -1
    } else if (!a.endDate && b.endDate) {
      return direction === "asc" ? -1 : 1
    } else {
      return 0
    }
  }

  const sortByProgress = (
    a: JobsViewWithSort,
    b: JobsViewWithSort,
    direction: Direction
  ) => {
    const comparison = a.progress - b.progress
    return direction === "asc" ? comparison : -comparison
  }

  const sortJobs = () => {
    const derivedJobView: JobsViewWithSort[] = jobs.map((job) => ({
      id: job.id,
      name: job.name,
      endDate: getJobDeadline(job.tasks),
      progress: completionStats![job.id!],
    }))

    const sortedJob = derivedJobView.sort((a, b) => {
      for (const key of sorter.sortOrderArray) {
        const direction = sorter.order[key]
        if (!direction) continue

        let comparison = 0
        switch (key) {
          case "progress":
            comparison = sortByProgress(a, b, direction)
            break
          case "endDate":
            comparison = sortByDate(a, b, direction)
            break
          case "name":
            comparison = sortByName(a, b, direction)
            break
          default:
            throw new Error("invalid sort key")
        }

        if (comparison !== 0) {
          return comparison
        }
      }
      return 0 // If all comparisons are equal
    })

    return sortedJob
  }

  return sortJobs()
}

const useJobsView = (
  jobs: JobDTO[],
  criterias: ReturnType<typeof useViewCriteria>,
  completionStats: ReturnType<typeof calJobCompletion> | null
) => {
  const { sorter } = criterias
  const sortedJobs = jobsViewWithSort(jobs, sorter, completionStats)

  return sortedJobs
}

export default useJobsView
