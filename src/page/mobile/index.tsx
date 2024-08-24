import { useMainContext } from "@/contexts"
import HomeScreen from "./views/home"
import Navigation from "./components/navigation"
import { ScrollArea } from "@/components/scroll-area"
import JobView from "./views/jobs"
import TasksView from "./views/tasks"

const Mobile = () => {
  const {
    menu: { menu, MenuCode },
  } = useMainContext()

  return (
    <>
      <div className="relative h-svh bg-white">
        <ScrollArea style={{ height: `calc(100svh - 76px)` }}>
          <div>{menu === MenuCode.Home && <HomeScreen />}</div>
          <div>{menu === MenuCode.Jobs && <JobView />}</div>
          <div>{menu === MenuCode.Tasks && <TasksView />}</div>
        </ScrollArea>
        <Navigation />
      </div>
    </>
  )
}

export default Mobile
