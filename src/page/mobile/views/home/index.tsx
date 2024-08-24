import {
  SemiCircleChart,
  SemiCircleChartLegend,
} from "@/page/components/semi-circle-chart"
import TodayMissions from "./components/today-missions"
import UndoneTaskZone from "./components/undone-task-zone"

const OverallStats = () => {
  return (
    <>
      <div className="grid place-items-center p-5 border-b">
        <div className="relative">
          <SemiCircleChart />
        </div>
        <div className="mt-5">
          <SemiCircleChartLegend />
        </div>
      </div>
    </>
  )
}

const HomeScreen = () => {
  return (
    <>
      <div className="py-5">
        <OverallStats />
        <TodayMissions />
        <UndoneTaskZone />
      </div>
    </>
  )
}

export default HomeScreen
