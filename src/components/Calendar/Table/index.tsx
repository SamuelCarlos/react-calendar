import { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow } from '@mui/material'
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
import { changeDay } from '../calendar-slice'

import * as S from './styles'

const NUMBER_OF_WEEKS = 6
const DAYS_IN_A_WEEK = 7

interface TableData {
  selectedDay: Date
}

interface TableProps {
  data: TableData
}

interface Day {
  date: Date
}

export default function Table({ data }: TableProps) {
  const [month, setMonth] = useState<Day[][]>([])
  const [totalDays, setTotalDays] = useState<number>(0)
  const [firstMonthDay, setFirstMonthDay] = useState<Date>()

  const { selectedDay } = data

  const dispatch = useAppDispatch()

  const handleSelectDate = (date: Date) => {
    const ISODate = deserializeDate(date)
    dispatch(changeDay(ISODate))
  }

  useEffect(() => {
    setTotalDays(daysInMonth(selectedDay))
    setFirstMonthDay(firstDayOfMonth(selectedDay))
  }, [selectedDay])

  useEffect(() => {
    let index = 0

    if (!firstMonthDay) return

    const firstMonthWeekDay = firstMonthDay.getDay()

    const MONTH: Day[][] = []
    let WEEK: Day[] = []

    if (firstMonthWeekDay > 1)
      for (let i = 0; i < firstMonthWeekDay; i++) {
        WEEK.push({ date: subtractDays(firstMonthDay, firstMonthWeekDay - i) })
        index++
        if (index % 7 === 0) {
          MONTH.push(WEEK)
          WEEK = []
        }
      }

    for (let i = 0; i < totalDays; i++) {
      WEEK.push({ date: addDays(firstMonthDay, i) })
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
      WEEK.push({ date: addDays(lastMonthDay, i) })
      index++
      if (index % 7 === 0) {
        MONTH.push(WEEK)
        WEEK = []
      }
    }

    MONTH.push(WEEK)

    setMonth([...MONTH])
  }, [selectedDay, firstMonthDay, totalDays])

  const MonthDays = () =>
    month.map((week, weekIndex) => {
      return (
        <TableRow key={`week-${weekIndex}`}>
          {week.map((day, dayIndex) => (
            <S.TableCell
              key={`day-${dayIndex}`}
              onClick={() => handleSelectDate(day.date)}
              selected={equalDates(day.date, selectedDay)}
            >
              {day.date.getDate()}
            </S.TableCell>
          ))}
        </TableRow>
      )
    })

  return (
    <S.Table>
      <S.TableHead>
        <TableRow>
          <TableCell colSpan={7}>{getMonthName(selectedDay)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={7}>{getYear(selectedDay)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sun</TableCell>
          <TableCell>Mon</TableCell>
          <TableCell>Tue</TableCell>
          <TableCell>Wed</TableCell>
          <TableCell>Thu</TableCell>
          <TableCell>Fri</TableCell>
          <TableCell>Sat</TableCell>
        </TableRow>
      </S.TableHead>
      <TableBody>{MonthDays()}</TableBody>
    </S.Table>
  )
}
