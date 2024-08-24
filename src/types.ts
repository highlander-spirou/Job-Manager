import { Dayjs } from "dayjs"
import { Timestamp } from "firebase/firestore"

export type ServerTask = {
  name: string
  deadline: Timestamp
  content: string
  finished: boolean
  important: boolean
}

export type Task = {
  name: string
  deadline: Date
  content: string
  finished: boolean
  important: boolean
}

export type Job = {
  id?: string
  name: string
  tasks: Task[]
  order?: string[]
}

export type ServerJob = {
  id?: string
  name: string
  tasks: ServerTask[]
  order?: string[]
}

export type statusType = "pending" | "done" | "late"
export type ColumnName = "name" | "endDate" | "progress"
export type Direction = "asc" | "desc" | "none"

export type JobsViewWithSort = {
  id: string | undefined
  name: string
  endDate: Dayjs | null
  progress: number
}

export type ImportantTasks = {
  title: string
  deadline: Date
  jobId: string
  important: boolean
}

export type ComputedTasks = {
  name: string,
  content: string,
  status: statusType,
  deadline: Date,
  finished: boolean,
  important: boolean,
}