import {
  BriefcaseBusinessIcon,
  HouseIcon,
  NotebookTabsIcon,
} from "@/components/icons"
import { useMainContext } from "@/contexts"
import { cn } from "@/lib/utils"

const Navigation = () => {
  const {
    menu: { menu, MenuCode, changeMenu },
  } = useMainContext()

  return (
    <>
      <div className="fix bottom-0 w-full h-[76px] bg-white z-10">
        <div className="grid grid-cols-3 place-items-center">
          <button
            onClick={() => changeMenu(MenuCode.Home)}
            className={cn(
              "pt-3 flex flex-col gap-1 items-center w-full h-full border-t-2 group",
              menu === MenuCode.Home ? "border-t-accent active" : ""
            )}
          >
            <HouseIcon className="group-[.active]:stroke-accent"/>
            <span className="uppercase font-bold group-[.active]:text-accent">home</span>
          </button>
          <button
            onClick={() => changeMenu(MenuCode.Jobs)}
            className={cn(
              "pt-3 flex flex-col gap-1 items-center w-full h-full border-t-2 group",
              menu === MenuCode.Jobs ? "border-t-accent active" : ""
            )}
          >
            <BriefcaseBusinessIcon className="group-[.active]:stroke-accent"/>
            <span className="uppercase font-bold group-[.active]:text-accent">jobs</span>
          </button>
          <button
            onClick={() => changeMenu(MenuCode.Tasks)}
            className={cn(
              "pt-3 flex flex-col gap-1 items-center w-full h-full border-t-2 group",
              menu === MenuCode.Tasks ? "border-t-accent active" : ""
            )}
          >
            <NotebookTabsIcon className="group-[.active]:stroke-accent"/>
            <span className="uppercase font-bold group-[.active]:text-accent">tasks</span>
          </button>
         
        </div>
      </div>
    </>
  )
}

export default Navigation
