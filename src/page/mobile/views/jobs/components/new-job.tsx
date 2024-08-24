import Button from "@/components/button"
import * as Icon from "@/components/icons"
import { FormSuccessMessage } from "@/components/form"
import { MaterialInput } from "@/components/input-material"
import useNewJobForm, {
  NewJobSubmitBtn,
} from "@/lib/hooks/useNewJobForm"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"

export const NewJob = () => {
  const { form, formId, formSuccess, submit } = useNewJobForm()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="solid" color="accent" layout="icon">
          <Icon.PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title="Create New Job" />
        <div className="grid gap-6">
          <form onSubmit={submit} id={formId}>
            <div>
              <MaterialInput label="Job Name" {...form.register("jobName")} />
            </div>
            {form.formState.errors.jobName && (
              <p className="text-sm font-medium text-error">
                {form.formState.errors.jobName.message}
              </p>
            )}
            {formSuccess && (
              <FormSuccessMessage
                body="Sucessfully create new job"
                className="mt-2"
              />
            )}
          </form>
        </div>
        <NewJobSubmitBtn>
          <Button variant="solid" color="secondary" className="w-full mt-5">Add Job</Button>
        </NewJobSubmitBtn>
      </DrawerContent>
    </Drawer>
  )
}
