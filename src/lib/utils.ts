import { type ClassValue, clsx } from "clsx"
import dayjs, { Dayjs } from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createDate = (date: Date, time: string) => {
  const datetime = dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${time}:00`)
  return datetime
}

export const isTaskMorning = (rootDate: Date | Dayjs) => {
  const hour =
    rootDate instanceof Date ? dayjs(rootDate).hour() : rootDate.hour()
  return hour < 12
}

export const displayDate = (rootDate: Date | number, withTime = false) => {
  if(withTime) {
    return dayjs(rootDate).format("ddd DD/MM/YY • hh:mm A")
  }
  return dayjs(rootDate).format("ddd DD/MM/YY")
}