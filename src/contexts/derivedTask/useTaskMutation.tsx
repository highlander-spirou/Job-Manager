import { setDoc } from "firebase/firestore"
import { docRef, JobDTO } from "@/lib/firestore"
import { Job, Task } from "@/types"

type Action =
  | { type: "addTask"; payload: Task }
  | { type: "editTask"; payload: Task }
  | { type: "deleteTask"; payload: string }
  | { type: "markAsDone"; payload: string }
  | { type: "toggleImportant"; payload: string }

const useTaskMutation = (jobId: string, jobs: JobDTO[]) => {
  const dispatch = async ({ payload, type }: Action) => {
    if (type === "addTask") {
      await addTask(payload)
    } else if (type === "editTask") {
      await editTask(payload)
    } else if (type === "deleteTask") {
      await deleteTask(payload)
    } else if (type === "markAsDone") {
      await markAsDone(payload)
    } else if (type === "toggleImportant") {
      await toggleImportant(payload)
    }
  }

  const jobFromId = () => {
    return jobs.find((job) => job.id === jobId)!
  }

  const addTask = async (newTask: Task) => {
    const job = jobFromId()
    const newJob: Job = {
      name: job.name,
      tasks: [...job.tasks, newTask],
      order: !!job.order ? [...job.order, newTask.name] : undefined,
    }
    await setDoc(docRef(job.id!), newJob)
  }

  const editTask = async (edittedtask: Task) => {
    const job = jobFromId()
    const task = job.tasks.find((x) => x.name === edittedtask.name)
    if (task) {
      task.content = edittedtask.content
      task.deadline = edittedtask.deadline
    }
    await setDoc(docRef(job.id!), { ...job })
  }

  const deleteTask = async (taskName: string) => {
    const job = jobFromId()

    const newJob: Job = {
      name: job.name,
      order: job.order,
      tasks: job.tasks.filter((task) => task.name !== taskName),
    }
    await setDoc(docRef(job.id!), newJob)
  }

  const markAsDone = async (taskName: string) => {
    const job = jobFromId()
    const task = job.tasks.find((task) => task.name === taskName)!
    if (task) {
      task.finished = !task.finished
    }
    await setDoc(docRef(job.id!), { ...job })
  }

  const toggleImportant = async (taskName: string) => {
    const job = jobFromId()
    const task = job.tasks.find((task) => task.name === taskName)
    if (task) {
      task.important = !task.important
    }
    await setDoc(docRef(job.id!), { ...job })
  }

  return dispatch
}

export default useTaskMutation
