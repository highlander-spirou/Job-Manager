import Button from "@/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { ArrowDownIcon, ArrowDownNarrowWideIcon } from "@/components/icons"
import { ItemDrag } from "@/components/ui/drag-item"
import { useMainContext } from "@/contexts"
import { cn } from "@/lib/utils"
import { ColumnName } from "@/types"
import { Reorder } from "framer-motion"

type SortButtonProps = {
  column: ColumnName
}

const SortButton: React.FC<SortButtonProps> = ({ column }) => {
  const {
    criteria: {
      sorter: { order, updateOrder },
    },
  } = useMainContext()

  return (
    <>
      <Button
        variant="ghost"
        layout="with-icon"
        size="small"
        className="duration-300"
        onClick={() => updateOrder(column)}
      >
        <span className={cn(!!order[column] ? "text-accent" : "", "font-bold")}>
          {!order[column]
            ? "Click to sort"
            : order[column] === "asc"
            ? "Ascending"
            : "Descending"}
        </span>
        {!order[column] ? (
          <>
            <ArrowDownIcon className="rotate-180 size-4 stroke-zinc-600" />
          </>
        ) : (
          <>
            {order[column] === "asc" ? (
              <>
                <ArrowDownIcon className="rotate-180 size-4 stroke-accent " />
              </>
            ) : (
              <>
                <ArrowDownIcon className="size-4 stroke-accent " />
              </>
            )}
          </>
        )}
      </Button>
    </>
  )
}

const SortOrder = () => {
  const {
    criteria: {
      sorter: { sortOrderArray, updateSortOrder },
    },
  } = useMainContext()

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="soft" layout="with-icon">
            <ArrowDownNarrowWideIcon className="w-4 h-4 stroke-neutral-content" />
            Sort
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <>
            <DrawerTitle title="Sort Jobs By" />
            <div className="grid grid-cols-2 space-y-3 place-items-baseline">
              <p className="">Job Name</p>
              <SortButton column="name" />
              <p className="">End Date</p>
              <SortButton column="endDate" />
              <p className="">Progress</p>
              <SortButton column="progress" />
            </div>
            <div className="mt-5">
              <h3>Reorder Priorities</h3>
              <div className="w-full" data-vaul-no-drag>
                <Reorder.Group
                  axis="y"
                  onReorder={(e) => updateSortOrder(e)}
                  values={sortOrderArray}
                >
                  {sortOrderArray.map((item) => (
                    <ItemDrag key={item} item={item} className="w-full h-11 border-b"/>
                  ))}
                </Reorder.Group>
              </div>
            </div>
          </>
        </DrawerContent>
      </Drawer>

      {/* <Popover>
        <PopoverTrigger asChild>
          <ExpandableButton
            label="Sort Order"
            labelClassName="group-hover:ms-0 group-hover:w-20"
            btnClassName="h-10"
          >
            <ArrowDownNarrowWideIcon className="size-4" />
          </ExpandableButton>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-full">
            <Reorder.Group
              axis="y"
              onReorder={(e) => updateSortOrder(e)}
              values={sortOrderArray}
            >
              {sortOrderArray.map((item) => (
                <Item key={item} item={item} />
              ))}
            </Reorder.Group>
          </div>
        </PopoverContent>
      </Popover> */}
    </>
  )
}

export default SortOrder
