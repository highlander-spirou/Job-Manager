import { addDoc, deleteDoc, setDoc } from "firebase/firestore"
import { docRef, jobCollectionRef, JobDTO } from "@/lib/firestore"

type Action =
  | { type: "addJob"; payload: string }
  | { type: "editJob"; payload: JobDTO }
  | { type: "deleteJob"; payload: string }

const useJobsMutation = () => {
  const dispatch = async ({ type, payload }: Action) => {
    if (type === "addJob") {
      await addJob(payload)
    } else if (type === "editJob") {
      await editJob(payload)
    } else if (type === "deleteJob") {
      await deleteJob(payload)
    }
  }

  const addJob = async (jobName: string) => {
    addDoc(jobCollectionRef, { name: jobName, tasks: [] })
  }

  const editJob = async (edittedJob: JobDTO) => {
    await setDoc(docRef(edittedJob.id!), { ...edittedJob })
  }

  const deleteJob = async (jobId: string) => {
    await deleteDoc(docRef(jobId))
  }

  return dispatch
}

export default useJobsMutation
