import { useState, useEffect } from 'react'
import {
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell
} from '@mui/material'
import {
  deserializeDate,
  equalDates,
  firstDayOfMonth,
  getMonthName,
  lastDayOfMonth,
  subtractDays
} from 'utils/dates'
import { getYear, daysInMonth } from 'utils/dates'
import { addDays } from 'date-fns'
import { useAppDispatch } from 'app/hooks'
import { changeDay, Reminder } from '../calendar-slice'
import TableCell from './TableCell'

import * as S from './styles'

const NUMBER_OF_WEEKS = 6
const DAYS_IN_A_WEEK = 7

export interface DayData {
  date: Date
  reminders?: Reminder[]
}

interface TableProps {
  selectedDay: Date
  reminders?: Reminder[]
}

export default function Table({ data }: { data: TableProps }) {
  const [month, setMonth] = useState<DayData[][]>([])

  const { selectedDay, reminders } = data

  const dispatch = useAppDispatch()

  const handleSelectDate = (date: Date) => {
    const ISODate = deserializeDate(date)
    dispatch(changeDay(ISODate))
  }

  useEffect(() => {
    const totalDays = daysInMonth(selectedDay)
    const firstMonthDay = firstDayOfMonth(selectedDay)

    let index = 0

    if (!firstMonthDay) return

    const firstMonthWeekDay = firstMonthDay.getDay()

    const MONTH: DayData[][] = []
    let WEEK: DayData[] = []

    if (firstMonthWeekDay > 1)
      for (let i = 0; i < firstMonthWeekDay; i++) {
        let date = subtractDays(firstMonthDay, firstMonthWeekDay - i)
        let dateReminders
        if (reminders && reminders.length > 0) {
          dateReminders = reminders.filter((reminder) =>
            equalDates(new Date(reminder.date), date)
          )
        }
        WEEK.push({ date, reminders: dateReminders })
        index++
        if (index % 7 === 0) {
          MONTH.push(WEEK)
          WEEK = []
        }
      }

    for (let i = 0; i < totalDays; i++) {
      let date = addDays(firstMonthDay, i)
      let dateReminders
      if (reminders && reminders.length > 0) {
        dateReminders = reminders.filter((reminder) =>
          equalDates(new Date(reminder.date), date)
        )
      }

      WEEK.push({ date, reminders: dateReminders })

      index++

      if (index % 7 === 0) {
        MONTH.push(WEEK)
        WEEK = []
      }
    }

    const MAX_DAYS = NUMBER_OF_WEEKS * DAYS_IN_A_WEEK
    const DAYS_LEFT = MAX_DAYS - index

    const lastMonthDay = lastDayOfMonth(selectedDay)

    for (let i = 1; i <= DAYS_LEFT; i++) {
      let date = addDays(lastMonthDay, i)
      let dateReminders
      if (reminders && reminders.length > 0) {
        dateReminders = reminders.filter((reminder) =>
          equalDates(new Date(reminder.date), date)
        )
      }
      WEEK.push({ date, reminders: dateReminders })

      index++
      if (index % 7 === 0) {
        MONTH.push(WEEK)
        WEEK = []
      }
    }

    MONTH.push(WEEK)

    setMonth([...MONTH])
  }, [selectedDay, reminders])

  const MonthDays = () =>
    month.map((week, weekIndex) => {
      return (
        <MuiTableRow key={`week-${weekIndex}`}>
          {week.map((day, dayIndex) => {
            const selected = equalDates(day.date, selectedDay)
            return (
              <S.TableCell
                key={`day-${dayIndex}`}
                className={
                  getMonthName(day.date) !== getMonthName(selectedDay)
                    ? `dark ${selected ? 'selected' : ''}`
                    : `light ${selected ? 'selected' : ''}`
                }
                onClick={() => handleSelectDate(day.date)}
              >
                <TableCell data={day} selected={selected} />
              </S.TableCell>
            )
          })}
        </MuiTableRow>
      )
    })

  return (
    <S.Table>
      <S.TableHead>
        <MuiTableRow>
          <MuiTableCell colSpan={4}>{getMonthName(selectedDay)}</MuiTableCell>
          <MuiTableCell colSpan={3}>{getYear(selectedDay)}</MuiTableCell>
        </MuiTableRow>
        <MuiTableRow>
          <MuiTableCell className="weekday">Sun</MuiTableCell>
          <MuiTableCell className="weekday">Mon</MuiTableCell>
          <MuiTableCell className="weekday">Tue</MuiTableCell>
          <MuiTableCell className="weekday">Wed</MuiTableCell>
          <MuiTableCell className="weekday">Thu</MuiTableCell>
          <MuiTableCell className="weekday">Fri</MuiTableCell>
          <MuiTableCell className="weekday">Sat</MuiTableCell>
        </MuiTableRow>
      </S.TableHead>
      <MuiTableBody>{MonthDays()}</MuiTableBody>
    </S.Table>
  )
}
