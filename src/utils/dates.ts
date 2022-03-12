import { getDaysInMonth, startOfMonth, format } from 'date-fns'

export type WeekDays =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export const daysInMonth = (date: Date) => {
  return getDaysInMonth(date)
}

export const firstDayOfMonth = (date: Date): WeekDays => {
  return format(startOfMonth(date), 'EEEE') as WeekDays
}

export const deserializeDate = (date: Date) => {
  return date.toISOString()
}
