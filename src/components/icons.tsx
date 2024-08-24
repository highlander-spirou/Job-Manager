import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
export {
  LayoutListIcon,
  SaveIcon,
  PencilIcon,
  Trash2Icon,
  BadgeCheckIcon,
  SunIcon,
  CheckIcon,
  HourglassIcon,
  ListRestartIcon,
  ChevronsDownIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  CircleIcon,
  AArrowDownIcon,
  AArrowUpIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowDownNarrowWideIcon,
  GripVerticalIcon,
  XIcon,
  PlusIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  ClockIcon,
  HouseIcon,
  BriefcaseBusinessIcon,
  NotebookTabsIcon,
  ArrowDownIcon,
  MoonStarIcon,
  FileTextIcon
} from "lucide-react"

type StarIconProps = {
  active?: boolean
  className?: string
}

export const StarIcon: React.FC<StarIconProps> = ({
  className,
  active = true,
}) => {
  return (
    <>
      <Star
        className={cn(
          "stroke-amber-400",
          active ? "fill-amber-400" : "",
          className
        )}
      />
    </>
  )
}
