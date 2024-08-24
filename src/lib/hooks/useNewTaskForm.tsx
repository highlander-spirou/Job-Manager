import { cloneElement } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useFormSuccess } from "@/components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Task } from "@/types"
import { createDate } from "@/lib/utils"
import useTaskMutation from "@/contexts/derivedTask/useTaskMutation"
import { useMainContext } from "@/contexts"

type ButtonWrapperProps = {
  children: React.ReactElement
}

export const NewTaskSubmitBtn: React.FC<ButtonWrapperProps> = ({
  children,
}) => {
  const modifiedButton = cloneElement(children, {
    type: "submit",
    form: "create-task-form",
  })

  return <>{modifiedButton}</>
}

const useNewTaskForm = () => {
  const {
    jobs,
    jobSelection: { currentJobId },
  } = useMainContext()
  const dispatch = useTaskMutation(currentJobId!, jobs)

  const { formSuccess, triggerFormSuccess } = useFormSuccess()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Task name need at least 2 letters.",
    }),
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
      name: "",
      date: new Date(),
      time: "08:00",
      content: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTask: Task = {
      name: values.name,
      content: values.content,
      deadline: createDate(values.date, values.time).toDate(),
      finished: false,
      important: false,
    }
    dispatch({
      type: "addTask",
      payload: newTask,
    })
    form.reset()
    triggerFormSuccess()
  }

  const submit = form.handleSubmit(onSubmit)

  const formId = "create-task-form"

  return {
    form,
    submit,
    formId,
    formSuccess,
  }
}

export default useNewTaskForm
