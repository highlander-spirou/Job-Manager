import { ScrollArea } from "@/components/scroll-area"
import Alert from "@/components/ui/alert"
import { useMainContext } from "@/contexts"
import { cn } from "@/lib/utils"
import JobTitle from "@/page/desktop/components/job-title"

const UndoneTaskZone = () => {
  const { jobStats } = useMainContext()

  const { undoneJobs } = jobStats

  if (!undoneJobs)
    return <p className="font-bold uppercase text-center">No Data</p>

  const data = undoneJobs.map((job) => {
    if (!job.timeDelta) {
      const result: typeof job & { status: "warning" | "primary" | "error" } = {
        status: "primary",
        ...job,
      }
      return result
    }

    if (job.timeDelta < 5) {
      const result: typeof job & { status: "warning" | "primary" | "error" } = {
        status: "error",
        ...job,
      }
      return result
    } else if (job.timeDelta < 25) {
      const result: typeof job & { status: "warning" | "primary" | "error" } = {
        status: "warning",
        ...job,
      }
      return result
    } else {
      const result: typeof job & { status: "warning" | "primary" | "error" } = {
        status: "primary",
        ...job,
      }
      return result
    }
  })

  return (
    <>
      <ScrollArea style={{ height: "calc(100svh / 3 * 2)" }} className="pr-3">
        <ul className="grid gap-2">
          {data
            .sort((a, b) => {
              let timer_a = a.timeDelta ? a.timeDelta : 0
              let timer_b = b.timeDelta ? b.timeDelta : 0
              return timer_a - timer_b
            })
            .map((x, index) => (
              <li key={index}>
                <Alert variant={x.status}>
                  <JobTitle
                    jobId={x.id}
                    className={cn(
                      x.status === "error"
                        ? "bg-error-alert"
                        : x.status === "warning"
                        ? "bg-warning-alert"
                        : "bg-default-alert",
                      "text-zinc-700 line-clamp-1 after:bottom-0 after:bg-alert-content"
                    )}
                  />
                  <p className="text-xs font-bold min-w-24">
                    {!x.timeDelta
                      ? "Undetermined"
                      : x.timeDelta < 0
                      ? `${Math.abs(Math.round(x.timeDelta))} hours late`
                      : `${Math.round(x.timeDelta)} hours left`}
                  </p>
                </Alert>
              </li>
            ))}
        </ul>
      </ScrollArea>
    </>
  )
}

export default UndoneTaskZone
