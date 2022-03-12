import {
  getDaysInMonth,
  startOfMonth,
  format,
  getYear as dateFnsGetYear,
  sub,
  add,
  endOfMonth,
  isEqual
} from 'date-fns'

export enum WeekDays {
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
}

export type WeekDaysNames = keyof typeof WeekDays

export const Months = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

export const daysInMonth = (date: Date) => {
  return getDaysInMonth(date)
}

export const firstDayOfMonth = (date: Date) => {
  return startOfMonth(date)
}

export const lastDayOfMonth = (date: Date) => {
  return endOfMonth(date)
}

export const deserializeDate = (date: Date) => {
  return date.toISOString()
}

export const getMonthName = (date: Date) => {
  return format(date, 'LLL')
}

export const getYear = (date: Date) => dateFnsGetYear(date)

export const subtractDays = (date: Date, quantity: number) => {
  return sub(date, { days: quantity })
}

export const addDays = (date: Date, quantity: number) => {
  return add(date, { days: quantity })
}

export const equalDates = (dateLeft: Date, dateRight: Date) => {
  return isEqual(dateLeft, dateRight)
}
