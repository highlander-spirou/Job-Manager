import JobTable from "./components/job-table"
import { NewJob } from "./components/new-job"
import SortOrder from "./components/sort-order"

const JobList = () => {
  return (
    <>
      <div>
        <div className="flex gap-1 justify-end">
          <SortOrder />
          <NewJob />
        </div>
        <div className="mt-5">
          <JobTable />
        </div>
      </div>
    </>
  )
}

const JobScreen = () => {
  return (
    <>
      <div className="w-full mt-5">
        <JobList />
      </div>
    </>
  )
}

export default JobScreen
