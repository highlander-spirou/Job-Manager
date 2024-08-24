import { useMainContext } from "@/contexts"
import { cn } from "@/lib/utils"

const MenuTab = () => {
  const {
    menu: { menu, changeMenu },
  } = useMainContext()

  return (
    <>
      <div className="relative grid grid-cols-3 bg-white w-[300px] h-10 rounded-xl">
        <button
          className={cn(
            menu === 0 ? "text-secondary-content" : "",
            "z-10 font-bold transition-colors duration-30"
          )}
          onClick={() => changeMenu(0)}
        >
          Home
        </button>
        <button
          className={cn(
            menu === 1 ? "text-secondary-content" : "",
            "z-10 font-bold transition-colors duration-30"
          )}
          onClick={() => changeMenu(1)}
        >
          Jobs
        </button>
        <button
          className={cn(
            menu === 2 ? "text-secondary-content" : "",
            "z-10 font-bold transition-colors duration-300"
          )}
          onClick={() => changeMenu(2)}
        >
          Tasks
        </button>

        <span
          className="absolute w-[100px] h-full rounded-lg bg-secondary transition ease-out duration-300"
          style={{ transform: `translateX(${menu * 100}px)` }}
        ></span>
      </div>
    </>
  )
}

export default MenuTab
