import { cn } from "@/lib/utils"

type ProgressProps = {
  value: number
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <>
      <div className="flex items-center gap-x-3 whitespace-nowrap">
        <div
          className="flex w-full h-2 bg-zinc-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn(
              "rounded-full",
              value === 100 ? "bg-green-500" : "bg-[#FF8225]"
            )}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <div className="w-10 text-end">
          <span
            className={cn("font-mono", value === 100 ? "text-green-600" : "")}
          >
            {value}%
          </span>
        </div>
      </div>
    </>
  )
}

export default Progress
