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
import { FormSuccessMessage } from "@/components/form"
import { MaterialInput } from "@/components/input-material"
import ExpandableButton from "@/components/expandable-button"
import { PencilIcon } from "@/components/icons"
import useEditJobForm, { EditJobSubmitBtn } from "@/lib/hooks/useEditJobForm"

type EditJobProps = {
  jobId: string
}

export const EditJob: React.FC<EditJobProps> = ({ jobId }) => {
  const { form, formId, formSuccess, submit } = useEditJobForm(jobId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExpandableButton
          label="Edit"
          variant="ghost"
          labelClassName="group-hover:ms-0 group-hover:w-10"
        >
          <PencilIcon className="w-4 h-4" />
        </ExpandableButton>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} id={formId}>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error">
              Cancel
            </Button>
          </DialogClose>
          <EditJobSubmitBtn>
            <Button variant="solid">Edit</Button>
          </EditJobSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
