import Button, { buttonVariants } from "@/components/button"
import { useMainContext } from "@/contexts"
import { VariantProps } from "class-variance-authority"
import React from "react"

type JobTitleProps = {
  className?: string
  jobId: string
} & VariantProps<typeof buttonVariants>

const JobTitle: React.FC<JobTitleProps> = ({
  jobId,
  className,
  color,
  layout,
  variant,
  size,
}) => {
  const {
    jobs,
    menu,
    jobSelection: { selectJob },
  } = useMainContext()

  const { changeMenu, MenuCode } = menu
  const job = jobs.find((job) => job.id === jobId)!

  const handler = () => {
    selectJob(job.id!)
    changeMenu(MenuCode.Tasks)
  }

  return (
    <Button
      key={jobId}
      className={className}
      variant={variant ? variant : "link"}
      color={color ? color : "default"}
      layout={layout ? layout : "normal"}
      size={size}
      title={job.name}
      onClick={handler}
    >
      <span className="line-clamp-1">{job.name}</span>
    </Button>
  )
}

export default JobTitle
