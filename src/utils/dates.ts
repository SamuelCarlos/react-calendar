import {
  startOfMonth,
  format,
  getYear as dateFnsGetYear,
  sub,
  add,
  min,
  isSameMinute
} from 'date-fns'

export const firstDayOfMonth = (date: Date) => {
  return startOfMonth(date)
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

export const subtractMonths = (date: Date, quantity: number) => {
  return sub(date, { months: quantity })
}

export const addMonths = (date: Date, quantity: number) => {
  return add(date, { months: quantity })
}

export const subtractYears = (date: Date, quantity: number) => {
  return sub(date, { years: quantity })
}

export const addYears = (date: Date, quantity: number) => {
  return add(date, { years: quantity })
}

export const equalDates = (dateLeft: Date, dateRight: Date) => {
  const sameYear = dateLeft.getFullYear() === dateRight.getFullYear()

  if (!sameYear) return false

  const sameMonth = dateLeft.getMonth() === dateRight.getMonth()

  if (!sameMonth) return false

  const sameDay = dateLeft.getDate() === dateRight.getDate()

  if (!sameDay) return false

  return true
}

export const isMinor = (dateLeft: Date, dateRight: Date) => {
  const minOne = min([dateLeft, dateRight])

  if (isSameMinute(minOne, dateLeft)) return true
  return false
}
