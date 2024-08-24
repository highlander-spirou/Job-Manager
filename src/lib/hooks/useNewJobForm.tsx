import { cloneElement } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useFormSuccess } from "@/components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import useJobsMutation from "@/contexts/derivedJob/useJobsMutation"

type ButtonWrapperProps = {
  children: React.ReactElement
}

export const NewJobSubmitBtn: React.FC<ButtonWrapperProps> = ({ children }) => {
  const modifiedButton = cloneElement(children, {
    type: "submit",
    form: "create-job-form",
  })
  return <>{modifiedButton}</>
}

const useNewJobForm = () => {
  const dispatch = useJobsMutation()
  const { formSuccess, triggerFormSuccess } = useFormSuccess()
  const formSchema = z.object({
    jobName: z.string().min(2, {
      message: "Job name cannot be empty.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobName: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: "addJob", payload: values.jobName })
    form.reset()
    triggerFormSuccess()
  }
  const submit = form.handleSubmit(onSubmit)
  const formId = "create-job-form"
  return {
    form,
    submit,
    formId,
    formSuccess,
  }
}
export default useNewJobForm
