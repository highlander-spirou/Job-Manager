import Button from "@/components/button"
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
import { PlusIcon } from "@/components/icons"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"

export const NewTask = () => {
  const { form, formId, formSuccess, submit } = useNewTaskForm()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="solid" color="accent" layout="icon">
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title="Create New Task" />
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
        <NewTaskSubmitBtn>
          <Button variant="solid" color="secondary" className="w-full mt-5">
            Add Task
          </Button>
        </NewTaskSubmitBtn>
      </DrawerContent>
    </Drawer>
  )
}
