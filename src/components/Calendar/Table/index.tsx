/* eslint-disable no-loop-func */
import { useState, useEffect } from 'react'
import {
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Typography,
  Stack
} from '@mui/material'
import {
  deserializeDate,
  equalDates,
  firstDayOfMonth,
  getMonthName,
  subtractDays,
  getYear,
  isMinor,
  subtractMonths,
  addMonths,
  subtractYears,
  addYears
} from 'utils/dates'
import { addDays } from 'date-fns'
import { useAppDispatch } from 'app/hooks'
import { changeDay, Reminder } from '../calendar-slice'
import TableCell from './TableCell'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'

import * as Styled from './styles'

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

    for (let iterator = 1; iterator <= TOTAL_CALENDAR_PAGE_DAY; iterator++) {
      let dateReminders
      if (reminders && reminders.length > 0) {
        dateReminders = reminders.filter((reminder) =>
          equalDates(new Date(reminder.date), currentDay)
        )
      }
      WEEK.push({ date: currentDay, reminders: dateReminders })
      if (iterator % 7 === 0) {
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
              <Styled.TableCell
                key={`day-${dayIndex}`}
                className={`${selected ? 'selected' : ''} ${
                  getMonthName(day.date) !== getMonthName(selectedDay)
                    ? 'dark'
                    : 'light'
                }`}
              >
                <TableCell
                  data={{
                    date: day.date,
                    reminders: day.reminders?.sort((a, b) => {
                      if (isMinor(new Date(a.date), new Date(b.date))) return -1
                      return 1
                    })
                  }}
                  selected={selected}
                  handleSelect={handleSelectDate}
                />
              </Styled.TableCell>
            )
          })}
        </MuiTableRow>
      )
    })

  return (
    <Styled.Table data-testid="table">
      <Styled.TableHead>
        <MuiTableRow>
          <MuiTableCell colSpan={4}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              margin="0"
            >
              <Styled.Button
                data-testid="back-month"
                onClick={() =>
                  dispatch(
                    changeDay(deserializeDate(subtractMonths(selectedDay, 1)))
                  )
                }
              >
                <ArrowBackIos />
              </Styled.Button>
              <Typography variant="body1" fontWeight={700} fontSize="2rem">
                {getMonthName(selectedDay)}
              </Typography>
              <Styled.Button
                data-testid="ahead-month"
                onClick={() =>
                  dispatch(
                    changeDay(deserializeDate(addMonths(selectedDay, 1)))
                  )
                }
              >
                <ArrowForwardIos />
              </Styled.Button>
            </Stack>
          </MuiTableCell>
          <MuiTableCell colSpan={3}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              margin="0"
            >
              <Styled.Button
                data-testid="back-year"
                onClick={() =>
                  dispatch(
                    changeDay(deserializeDate(subtractYears(selectedDay, 1)))
                  )
                }
              >
                <ArrowBackIos />
              </Styled.Button>
              <Typography variant="body1" fontWeight={700} fontSize="2rem">
                {getYear(selectedDay)}
              </Typography>
              <Styled.Button
                data-testid="ahead-year"
                onClick={() =>
                  dispatch(changeDay(deserializeDate(addYears(selectedDay, 1))))
                }
              >
                <ArrowForwardIos />
              </Styled.Button>
            </Stack>
          </MuiTableCell>
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
      </Styled.TableHead>
      <MuiTableBody>{MonthDays()}</MuiTableBody>
    </Styled.Table>
  )
}
