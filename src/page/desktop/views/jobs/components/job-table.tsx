import { DoneProgress, RadialProgress } from "@/components/circular-progress"
import {
  AArrowDownIcon,
  AArrowUpIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  MoonStarIcon,
  SunIcon,
} from "@/components/icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import { useMainContext } from "@/contexts"

import { cn, isTaskMorning } from "@/lib/utils"
import { ColumnName } from "@/types"
import { DeleteJob } from "./delete-job"
import { EditJob } from "./edit-job"
import JobTitle from "@/page/desktop/components/job-title"

type TableHeaderBtnProps = {
  column: ColumnName
  label: string
  UpArrow: any
  DownArrow: any
}

const TableHeaderBtn: React.FC<TableHeaderBtnProps> = ({
  column,
  label,
  UpArrow,
  DownArrow,
}) => {
  const {
    criteria: {
      sorter: { order, updateOrder },
    },
  } = useMainContext()

  return (
    <>
      <button
        className="flex items-center gap-1"
        onClick={() => updateOrder(column)}
      >
        {!order[column] ? (
          <>
            <UpArrow className="size-4 stroke-zinc-600" />
          </>
        ) : (
          <>
            {order[column] === "asc" ? (
              <>
                <UpArrow className="size-4 stroke-accent " />
              </>
            ) : (
              <>
                <DownArrow className="size-4 stroke-accent " />
              </>
            )}
          </>
        )}
        <span className={cn(!!order[column] ? "text-accent" : "", "font-bold")}>
          {label}
        </span>
      </button>
    </>
  )
}

const JobTable = () => {
  const { jobsView: jobs } = useMainContext()

  return (
    <>
      <div className="px-2 pb-1 bg-white rounded-2xl">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>
                <TableHeaderBtn
                  label="Job Name"
                  column="name"
                  UpArrow={AArrowUpIcon}
                  DownArrow={AArrowDownIcon}
                />
              </TableHead>
              <TableHead>
                <TableHeaderBtn
                  label="End date"
                  column="endDate"
                  UpArrow={CalendarArrowUpIcon}
                  DownArrow={CalendarArrowDownIcon}
                />
              </TableHead>
              <TableHead>
                <TableHeaderBtn
                  label="Progress"
                  column="progress"
                  UpArrow={ArrowUp01Icon}
                  DownArrow={ArrowDown01Icon}
                />
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {jobs.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-bold min-w-[180px] max-w-[480px]">
                  <JobTitle jobId={job.id!} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {!job.endDate ? (
                      <>
                        <span className="font-bold">N/A</span>
                      </>
                    ) : (
                      <>
                        {isTaskMorning(job.endDate) ? (
                          <SunIcon className="size-4 stroke-amber-400" />
                        ) : (
                          <MoonStarIcon className="size-4 stroke-secondary" />
                        )}
                        <span>{job.endDate.format("ddd DD/MM/YY")}</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="grid place-items-start">
                    <div className="flex gap-2">
                      <RadialProgress>
                        <DoneProgress
                          value={job.progress}
                          className={
                            job.progress === 100 ? "stroke-success" : ""
                          }
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
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <EditJob jobId={job.id!} />
                  <DeleteJob jobId={job.id!} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default JobTable
