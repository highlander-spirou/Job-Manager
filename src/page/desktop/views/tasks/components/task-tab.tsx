import { XIcon } from "@/components/icons"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"
import { useMainContext } from "@/contexts"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useState } from "react"

type TabProps = {
  item: { key: string; value: string }
  isSelected: boolean
  onClick: () => void
  onRemove: () => void
}

const Tab = ({ item, onClick, onRemove, isSelected }: TabProps) => {
  return (
    <Reorder.Item
      value={item}
      id={item.key}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.15 },
        backgroundColor: isSelected ? "#f5f5f4" : "#fff",
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: "#e7e5e4" }}
      className="relative flex justify-between items-center px-2 min-w-36 max-w-48 h-full overflow-hidden rounded-t-lg"
      onPointerDown={onClick}
      title={item.value}
    >
      <motion.span
        layout="position"
        className={cn(
          isSelected ? "text-warning" : "",
          "overflow-fade w-11/12 font-bold"
        )}
      >
        {item.value}
      </motion.span>
      <motion.div layout className="absolute right-3 size-5">
        <motion.button
          onPointerDown={(event) => {
            event.stopPropagation()
            onRemove()
          }}
          initial={false}
          className="size-full grid place-items-center rounded-sm"
          animate={{ backgroundColor: isSelected ? "#e7e5e4" : "#fff" }}
        >
          <XIcon className="size-4" />
        </motion.button>
      </motion.div>
    </Reorder.Item>
  )
}

const TaskTab = () => {
  const { jobSelection } = useMainContext()
  const { currentJobId, jobSelectedList } = jobSelection

  const [tabs, setTabs] = useState<{ key: string; value: string }[]>(
    Array.from(jobSelectedList, ([key, value]) => ({ key, value }))
  )

  const onReorder = (e: { key: string; value: string }[]) => {
    setTabs(e)
    jobSelection.changeOrder(e)
  }

  const selectHandler = (jobId: string) => {
    jobSelection.selectJob(jobId)
  }
  const remove = (jobId: string) => {
    jobSelection.deleteFromSelection(jobId)
    setTabs((oldState) => oldState.filter((x) => x.key !== jobId))
  }

  return (
    <>
      {jobSelectedList.size > 0 && (
        <>
          <nav className="h-[50px] pb-0 p-1 rounded-t-[10px] bg-white">
            <ScrollArea className="w-full whitespace-nowrap h-full">
              <Reorder.Group
                as="ul"
                axis="x"
                onReorder={onReorder}
                className="flex w-full h-9"
                values={tabs}
              >
                <AnimatePresence initial={false}>
                  {tabs.map((item) => (
                    <Tab
                      key={item.key}
                      item={item}
                      isSelected={currentJobId === item.key}
                      onClick={() => selectHandler(item.key)}
                      onRemove={() => remove(item.key)}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </nav>
        </>
      )}
    </>
  )
}

export default TaskTab
