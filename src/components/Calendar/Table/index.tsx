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
  subtractDays,
  getYear
} from 'utils/dates'
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
    const firstMonthDay = firstDayOfMonth(selectedDay)
    const TOTAL_CALENDAR_PAGE_DAY = DAYS_IN_A_WEEK * NUMBER_OF_WEEKS

    if (!firstMonthDay) return

    const firstMonthWeekDay = firstMonthDay.getDay()

    let currentDay = subtractDays(firstMonthDay, firstMonthWeekDay)

    const MONTH: DayData[][] = []
    let WEEK: DayData[] = []

    for (let i = 1; i <= TOTAL_CALENDAR_PAGE_DAY; i++) {
      let dateReminders
      if (reminders && reminders.length > 0) {
        dateReminders = reminders.filter((reminder) =>
          equalDates(new Date(reminder.date), currentDay)
        )
      }
      WEEK.push({ date: currentDay, reminders: dateReminders })
      if (i % 7 === 0) {
        MONTH.push(WEEK)
        WEEK = []
      }
      currentDay = addDays(currentDay, 1)
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
                className={`${selected ? 'selected' : ''} ${
                  getMonthName(day.date) !== getMonthName(selectedDay)
                    ? 'dark'
                    : 'light'
                }`}
              >
                <TableCell
                  data={day}
                  selected={selected}
                  handleSelect={handleSelectDate}
                />
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
