import Button from "@/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog-legacy"
import * as Icon from "@/components/icons"
import { FormSuccessMessage } from "@/components/form"
import { MaterialInput } from "@/components/input-material"
import useNewJobForm, { NewJobSubmitBtn } from "@/lib/hooks/useNewJobForm"

export const NewJob = () => {
  const { form, formId, formSuccess, submit } = useNewJobForm()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="solid" color="accent" layout="with-icon">
          <Icon.PlusIcon />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <NewJobSubmitBtn>
            <Button variant="solid">Add Job</Button>
          </NewJobSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
