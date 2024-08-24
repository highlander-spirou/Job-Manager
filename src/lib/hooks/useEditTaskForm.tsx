import { cloneElement } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useFormSuccess } from "@/components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Task } from "@/types"
import { createDate } from "@/lib/utils"
import { useMainContext } from "@/contexts"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"
import dayjs from "dayjs"

type ButtonWrapperProps = {
  children: React.ReactElement
}

export const EditTaskSubmitBtn: React.FC<ButtonWrapperProps> = ({
  children,
}) => {
  const modifiedButton = cloneElement(children, {
    type: "submit",
    form: "edit-task-form",
  })

  return <>{modifiedButton}</>
}

const useEditTaskForm = (task: Task) => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()

  const dispatch = useTaskMutation(currentJobId!, jobs)
  const { formSuccess, triggerFormSuccess } = useFormSuccess()

  const formSchema = z.object({
    date: z.date(),
    time: z.string().refine((value) => {
      const [hours, minutes] = value.split(":")
      return (
        Number(hours) >= 0 &&
        Number(hours) <= 23 &&
        Number(minutes) >= 0 &&
        Number(minutes) <= 59
      )
    }),
    content: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: task.content,
      date: dayjs(task.deadline).toDate(),
      time: dayjs(task.deadline).format("HH:mm"),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const edittedTask: Task = {
      name: task.name,
      content: values.content,
      deadline: createDate(values.date, values.time).toDate(),
      finished: task.finished,
      important: task.important,
    }
    dispatch({
      type: "editTask",
      payload: edittedTask,
    })
    triggerFormSuccess()
  }

  const submit = form.handleSubmit(onSubmit)

  const formId = "edit-task-form"

  return {
    form,
    submit,
    formId,
    formSuccess,
  }
}

export default useEditTaskForm
