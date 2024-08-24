import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import { GripVerticalIcon } from "../icons"
import { cn } from "@/lib/utils"

type ItemProps = {
  item: any
  className?: string
}

const Item = ({ item, className }: ItemProps) => {
  const y = useMotionValue(0)
  const dragControls = useDragControls()

  return (
    <>
      <Reorder.Item
        value={item}
        id={item}
        style={{ y }}
        dragListener={false}
        dragControls={dragControls}
        className={cn(
          "w-48 flex px-3 py-2 justify-between items-center",
          className
        )}
      >
        <span className="select-none">{item}</span>
        <GripVerticalIcon
          className="stroke-primary size-5"
          onPointerDown={(event) => dragControls.start(event)}
        />
      </Reorder.Item>
    </>
  )
}

export const ItemDrag = ({ item, className }: ItemProps) => {
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      onPointerDown={(event) => dragControls.start(event)}
      className={cn(
        "w-48 flex px-3 py-2 justify-between items-center",
        className
      )}
    >
      <span className="select-none">{item}</span>
    </Reorder.Item>
  )
}

export default Item
