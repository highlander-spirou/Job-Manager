import { useMainContext } from "@/contexts"
import SortOrder from "./components/sort-order"
import { cn, isTaskMorning } from "@/lib/utils"
import { SunIcon, MoonStarIcon } from "@/components/icons"

import { motion, AnimatePresence } from "framer-motion"
import { JobsViewWithSort } from "@/types"
import { DoneProgress, RadialProgress } from "@/components/circular-progress"
import { NewJob } from "./components/new-job"
import { EditJob } from "./components/edit-job"
import { DeleteJob } from "./components/delete-job"
import useDragControl from "@/lib/hooks/useDragControl"

const TopSection = () => {
  return (
    <div className="h-14 w-full flex justify-end items-center pr-5 border-b shadow-sm">
      <SortOrder />
    </div>
  )
}

const JobItem = ({ job }: { job: JobsViewWithSort }) => {
  const {
    menu,
    jobSelection: { selectJob },
  } = useMainContext()

  const { changeMenu, MenuCode } = menu

  const threshold = 80
  const snapPosition = 80
  const releaseThreshold = 50

  const {
    xPosition,
    handleDragEnd,
    isDragging,
    restartPosition,
    setIsDragging,
    controls,
  } = useDragControl({ threshold, releaseThreshold, snapPosition })

  const handleTap = () => {
    if (!isDragging) {
      selectJob(job.id!)
      changeMenu(MenuCode.Tasks)
    }
  }

  const handleDrag = (_, info) => {
    if (Math.abs(info.offset.x) > 3) {
      setIsDragging(true)
    } else {
      setIsDragging(false)
    }
  }

  return (
    <>
      <div className="relative w-full">
        <EditJob
          jobId={job.id!}
          xPosition={xPosition}
          restartPosition={restartPosition}
        />
        <DeleteJob
          jobId={job.id!}
          xPosition={xPosition}
          restartPosition={restartPosition}
        />
        <motion.div
          drag="x"
          dragConstraints={{ left: -120, right: 120 }}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          animate={controls}
          onTap={handleTap}
          className="z-10 grid grid-cols-2 gap-y-2 h-full w-full border-b p-2"
        >
          <p
            className="line-clamp-2 col-span-2 font-bold"
            style={{ height: `calc(2lh)` }}
          >
            {job.name}
          </p>
          {!job.endDate ? (
            <>
              <span className="font-bold">N/A</span>
            </>
          ) : (
            <div className="flex gap-1 items-center">
              {isTaskMorning(job.endDate) ? (
                <SunIcon className="size-4 stroke-amber-400" />
              ) : (
                <MoonStarIcon className="size-4 stroke-secondary" />
              )}
              <span>{job.endDate.format("ddd DD/MM/YY")}</span>
            </div>
          )}
          <div className="flex gap-2">
            <RadialProgress>
              <DoneProgress
                value={job.progress}
                className={job.progress === 100 ? "stroke-success" : ""}
              />
            </RadialProgress>
            <span
              className={cn(
                "font-mono",
                job.progress === 100 ? "text-success" : ""
              )}
            >
              {job.progress}%
            </span>
          </div>
        </motion.div>
      </div>
    </>
  )
}

const JobLists = () => {
  const { jobsView: jobs } = useMainContext()

  return (
    <>
      <div>
        <ul>
          <AnimatePresence>
            {jobs.map((job, index) => (
              <JobItem key={job.id} job={job} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </>
  )
}

const JobView = () => {
  return (
    <>
      <TopSection />
      <JobLists />
      <div className="absolute z-10 bottom-5 right-5">
        <NewJob />
      </div>
    </>
  )
}

export default JobView
