import { cloneElement } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useFormSuccess } from "@/components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMainContext } from "@/contexts"
import useJobsMutation from "@/contexts/derivedJob/useJobsMutation"

type ButtonWrapperProps = {
  children: React.ReactElement
}

export const EditJobSubmitBtn: React.FC<ButtonWrapperProps> = ({
  children,
}) => {
  const modifiedButton = cloneElement(children, {
    type: "submit",
    form: "edit-job-form",
  })

  return <>{modifiedButton}</>
}

const useEditJobForm = (jobId: string) => {
  const { jobs } = useMainContext()
  const dispatch = useJobsMutation()

  const job = jobs.find((job) => job.id === jobId)!

  const { formSuccess, triggerFormSuccess } = useFormSuccess()

  const formSchema = z.object({
    jobName: z.string().min(2, {
      message: "Job name must have at least 2 letters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobName: job.name,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: "editJob", payload: { ...job, name: values.jobName } })
    triggerFormSuccess()
  }

  const submit = form.handleSubmit(onSubmit)

  const formId = "edit-job-form"

  return {
    form,
    submit,
    formId,
    formSuccess,
  }
}

export default useEditJobForm
