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
import {
  CalenderInput,
  MaterialInput,
  MaterialTextArea,
  MaterialTimePicker,
} from "@/components/input-material"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { Calendar } from "@/components/calender"
import { displayDate } from "@/lib/utils"
import { Controller } from "react-hook-form"
import useNewTaskForm, { NewTaskSubmitBtn } from "@/lib/hooks/useNewTaskForm"

export const NewTask = () => {
  const { form, formId, formSuccess, submit } = useNewTaskForm()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="solid" color="accent" layout="with-icon" className="text-sm">
          <Icon.PlusIcon className="w-4 h-4"/>
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-100">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <form onSubmit={submit} id={formId}>
            <MaterialInput label="Task Name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm font-medium text-error">
                {form.formState.errors.name.message}
              </p>
            )}
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
                        label={
                          field.value ? displayDate(field.value) : "Deadline"
                        }
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
          </form>
          {formSuccess && (
            <FormSuccessMessage
              body="Sucessfully create new job"
              className="mt-2"
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" color="error" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <NewTaskSubmitBtn>
            <Button variant="solid">Add Task</Button>
          </NewTaskSubmitBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
