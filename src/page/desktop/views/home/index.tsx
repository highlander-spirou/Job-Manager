import {
  SemiCircleChart,
  SemiCircleChartLegend,
} from "../../../components/semi-circle-chart"
import TodayMissions from "./components/today-missions"
import UndoneTaskZone from "./components/undone-task-zone"

const OverallStats = () => {
  return (
    <>
      <div className="grid place-items-center border-2 rounded-xl p-5">
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
      <div className="w-full mt-5">
        <main className="grid grid-cols-2 bg-white rounded-xl pl-5 py-5">
          <section className="col-span-1">
            <OverallStats />
            <TodayMissions />
          </section>
          <section className="col-span-1 ml-5">
            <UndoneTaskZone />
          </section>
        </main>
      </div>
    </>
  )
}

export default HomeScreen
