import { CircleIcon } from "@/components/icons"
import { useMainContext } from "@/contexts"
import { Chart as ChartJS, ArcElement } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement)

export const SemiCircleChart = () => {
  const { jobStats } = useMainContext()

  const { overallStats } = jobStats

  if (!overallStats)
    return (
      <>
        <p className="font-bold uppercase">No Data</p>
      </>
    )

  const percentDone =
    (overallStats.done / (overallStats.progress + overallStats.done)) * 100

  const data = {
    label: ["Progress", "Done"],
    datasets: [
      {
        data: [overallStats.progress, overallStats.done],
        backgroundColor: ["#f59e0b", "#10b981"],
        circumference: 180,
        rotation: 270,
        cutout: "80%",
        borderRadius: 5,
        borderWidth: 0,
      },
    ],
  }

  const options = {
    aspectRatio: 2,
  }

  return (
    <>
      <Doughnut data={data} options={options} />
      <div className="absolute inset-x-0 bottom-0">
        <p className="text-center text-2xl font-bold font-mono">
          {Math.floor(percentDone)}%
        </p>
        <p className="text-center">Jobs Done</p>
      </div>
    </>
  )
}

export const SemiCircleChartLegend = () => {
  const { jobStats } = useMainContext()

  const { overallStats } = jobStats

  if (!overallStats)
    return (
      <>
        <p className="font-bold uppercase">No Data</p>
      </>
    )

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-mono font-bold">
            {overallStats.progress}
          </p>
          <div className="flex items-center justify-center gap-2">
            <CircleIcon className="fill-warning stroke-warning size-3" />
            <span className="text-sm text-gray-600">On Progress</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-mono font-bold">{overallStats.done}</p>
          <div className="flex items-center justify-center gap-2">
            <CircleIcon className="fill-success stroke-success size-3" />
            <span className="text-sm text-gray-600">Task Done</span>
          </div>
        </div>
      </div>
      <p className="text-center mt-2">
        On the total of{" "}
        <span className="font-bold">
          {overallStats.progress + overallStats.done}
        </span>{" "}
        jobs
      </p>
    </>
  )
}
