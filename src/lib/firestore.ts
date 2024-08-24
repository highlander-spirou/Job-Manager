import {
  collection,
  doc,
  getFirestore,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore"
import firebase from "./firebase"
import { ServerJob, Task } from "@/types"

const db = getFirestore(firebase)

export class JobDTO {
  id?: string
  name: string
  order?: string[]
  tasks: Task[]

  constructor({ name, tasks, id, order }: ServerJob) {
    this.id = id
    this.name = name
    this.order = order
    this.tasks = tasks.map((task) => ({
      name: task.name,
      content: task.content,
      deadline: task.deadline.toDate(),
      finished: task.finished,
      important: task.important,
    }))
  }
}

const jobConverter = {
  toFirestore: (job: JobDTO): ServerJob => {
    return {
      ...(job.id && { id: job.id }),
      ...(job.order && { order: job.order }),
      name: job.name,
      tasks: job.tasks.map((task) => ({
        name: task.name,
        content: task.content,
        deadline: Timestamp.fromDate(task.deadline),
        finished: task.finished,
        important: task.important,
      })),
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<ServerJob>) => {
    const data = snapshot.data()
    if (!data) {
      return null
    }
    return new JobDTO({ ...data, id: snapshot.id })
  },
}

export const jobCollectionRef = collection(db, "jobs").withConverter(
  jobConverter
)

export const docRef = (id: string) =>
  doc(db, "jobs", id).withConverter(jobConverter)
