import MenuTab from "./components/menu-tab"
import HomeScreen from "./views/home"
import { useMainContext } from "@/contexts"
import JobScreen from "./views/jobs"
import TaskScreen from "./views/tasks"

const Desktop = () => {
  const { menu: menuContenxt } = useMainContext()
  const { menu, MenuCode } = menuContenxt

  return (
    <>
      <div className="bg-zinc-100 pb-10">
        <div className="flex items-center justify-between px-10 pt-10 w-full">
          <h1>Job Manager</h1>
          <MenuTab />
        </div>
        <div className="px-10">{menu === MenuCode.Home && <HomeScreen />}</div>
        <div className="px-10">{menu === MenuCode.Jobs && <JobScreen />}</div>
        <div className="px-10">{menu === MenuCode.Tasks && <TaskScreen />}</div>
      </div>
    </>
  )
}

export default Desktop
