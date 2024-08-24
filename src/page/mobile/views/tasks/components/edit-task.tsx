import Button from "@/components/button"
import {
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  NestedDrawer,
} from "@/components/drawer"
import { FormSuccessMessage } from "@/components/form"
import {
  CalenderInput,
  MaterialTextArea,
  MaterialTimePicker,
} from "@/components/input-material"

import { Task } from "@/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { displayDate } from "@/lib/utils"
import { Calendar } from "@/components/calender"
import { PencilIcon } from "@/components/icons"
import { Controller } from "react-hook-form"
import useEditTaskForm, { EditTaskSubmitBtn } from "@/lib/hooks/useEditTaskForm"

type EditTaskProps = {
  task: Task
}

export const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const { form, formId, formSuccess, submit } = useEditTaskForm(task)

  return (
    <NestedDrawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="outlined" color="accent" layout="with-icon">
          <PencilIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle title={`Edit Job "${task.name}"`} />
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
                body="Sucessfully edit task"
                className="mt-2"
              />
            )}
          </form>
        </div>
        <EditTaskSubmitBtn>
          <Button variant="solid" color="secondary" className="w-full mt-5">
            Edit
          </Button>
        </EditTaskSubmitBtn>
      </DrawerContent>
    </NestedDrawer>
  )
}
