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
import {
  CalenderInput,
  MaterialTextArea,
  MaterialTimePicker,
} from "@/components/input-material"
import ExpandableButton from "@/components/expandable-button"
import useEditTaskForm, { EditTaskSubmitBtn } from "../../../../../lib/hooks/useEditTaskForm"
import { Task } from "@/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { displayDate } from "@/lib/utils"
import { Calendar } from "@/components/calender"
import { PencilIcon } from "@/components/icons"
import { Controller } from "react-hook-form"

type EditTaskProps = {
  task: Task
}

export const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const { form, formId, formSuccess, submit } = useEditTaskForm(task)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExpandableButton
          label="Edit"
          variant="ghost"
          labelClassName="text-accent"
          btnClassName="border-0"
        >
          <PencilIcon className="w-4 h-4 stroke-accent" />
        </ExpandableButton>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100" tabIndex={-100}>
        <DialogHeader>
          <DialogTitle>Edit Job "{task.name}"</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <form onSubmit={submit} id={formId}>
            <div className="mt-7">
              <MaterialTextArea
                label="Task Content"
                {...form.register("content")}
              />
            </div>
            <Controller
              name="date"
              control={form.control}
              render={({ field }) => (
                <div className="mt-7">
                  <Popover>
                    <PopoverTrigger asChild>
                      <CalenderInput
                        label={field.value ? displayDate(field.value) : ""}
                        placeholder="Deadline"
                        isActive={!!field.value}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-1"
                      align="center"
                      side="top"
                    >
                      <Calendar
                        mode="single"
                        layout="desktop"
                        required={true}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />

            <MaterialTimePicker
              label="Deadline Time"
              {...form.register("time")}
            />
            {formSuccess && (
              <FormSuccessMessage
                body="Sucessfully edit job"
                className="mt-2"
              />
            )}
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error">
              Cancel
            </Button>
          </DialogClose>
          <EditTaskSubmitBtn>
            <Button variant="solid">
              Edit
            </Button>
          </EditTaskSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
