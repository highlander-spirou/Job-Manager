import ExpandableButton from "@/components/expandable-button"
import { ArrowDownNarrowWideIcon } from "@/components/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import Item from "@/components/ui/drag-item"
import { useMainContext } from "@/contexts"
import { Reorder } from "framer-motion"

const SortOrder = () => {
  const {
    criteria: {
      sorter: { sortOrderArray, updateSortOrder },
    },
  } = useMainContext()

  return (
    <>
      <Popover>
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
      </Popover>
    </>
  )
}

export default SortOrder
