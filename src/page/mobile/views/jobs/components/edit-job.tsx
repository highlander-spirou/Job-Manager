import Button from "@/components/button"
import { FormSuccessMessage } from "@/components/form"
import { MaterialInput } from "@/components/input-material"
import useEditJobForm, {
  EditJobSubmitBtn,
} from "@/lib/hooks/useEditJobForm"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/drawer"
import { motion } from "framer-motion"
import { PencilIcon } from "@/components/icons"

type EditJobProps = {
  jobId: string
  xPosition: number
  restartPosition: () => void
}

export const EditJob: React.FC<EditJobProps> = ({
  jobId,
  xPosition,
  restartPosition,
}) => {
  const { form, formId, formSuccess, submit } = useEditJobForm(jobId)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.button
          className="absolute left-0 top-0 h-full w-20 bg-primary"
          initial={{ visibility: "hidden" }}
          animate={{ visibility: xPosition === 80 ? "visible" : "hidden" }}
          onClick={restartPosition}
        >
          <PencilIcon className="w-6 h-6 stroke-primary-content mx-auto"/>
        </motion.button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title="Edit Job" />
        <form onSubmit={submit} id={formId} className="mt-7">
          <div>
            <MaterialInput label="Job Name" {...form.register("jobName")} />
            {form.formState.errors.jobName && (
              <p className="text-sm font-medium text-error">
                {form.formState.errors.jobName.message}
              </p>
            )}
            {formSuccess && (
              <FormSuccessMessage
                body="Sucessfully edit job"
                className="mt-2"
              />
            )}
          </div>
        </form>
        <EditJobSubmitBtn>
          <Button variant="solid" color="secondary" className="w-full mt-7">
            Edit
          </Button>
        </EditJobSubmitBtn>
      </DrawerContent>
    </Drawer>
  )
}
