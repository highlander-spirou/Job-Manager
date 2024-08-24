import { jobCollectionRef, JobDTO } from "@/lib/firestore"
import { createContext, useContext, useEffect } from "react"
import useJobs from "./useJobs"
import { onSnapshot } from "firebase/firestore"
import useJobStats from "./derivedJob/useJobStats"
import useMenu from "./useMenu"
import useJobsView, { useViewCriteria } from "./derivedJob/useJobsView"
import useJobSelection from "./useJobSelection"
import useImportantTasks from "./derivedTask/useImportantTasks"

interface MainContextType {
  jobs: JobDTO[]
  menu: ReturnType<typeof useMenu>
  criteria: ReturnType<typeof useViewCriteria>
  jobsView: ReturnType<typeof useJobsView>
  jobStats: ReturnType<typeof useJobStats>
  jobSelection: ReturnType<typeof useJobSelection>
  importantTasks: ReturnType<typeof useImportantTasks>
}

const MainContext = createContext<MainContextType | undefined>(undefined)

export const JobsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { jobs, setJobs } = useJobs()
  const criteria = useViewCriteria()

  useEffect(() => {
    const unsubscribe = onSnapshot(jobCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const data = doc.data()
        if (data !== null) {
          return data
        }
        return null
      })

      if (data.length > 0) {
        const cleanedData = data.filter((x) => x !== null)
        setJobs(cleanedData)
      } else {
        setJobs([])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const menu = useMenu()

  const jobStats = useJobStats(jobs)
  const jobsView = useJobsView(jobs, criteria, jobStats.jobProgress)
  const jobSelection = useJobSelection(jobs)
  const importantTasks = useImportantTasks(jobs)

  return (
    <MainContext.Provider
      value={{
        jobs,
        menu,
        criteria,
        jobStats,
        jobsView,
        jobSelection,
        importantTasks,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error("useMainContext must be used within an MainContext")
  }
  return context
}
