import { TableRow as MuiTableRow } from '@mui/material'

import { DayData } from '..'
import { changeDay } from 'redux/calendar-slice'
import { deserializeDate, equalDates, getMonthName, isMinor } from 'utils/dates'

import { useAppDispatch } from 'app/hooks'

import TableCell from './TableCell'

import * as Styled from './styles'

interface MonthDaysProps {
  selectedDay: Date
  week: DayData[]
}

export default function MonthDay({ selectedDay, week }: MonthDaysProps) {
  const dispatch = useAppDispatch()

  const handleSelectDate = (date: Date) => {
    const ISODate = deserializeDate(date)
    dispatch(changeDay(ISODate))
  }

  return (
    <MuiTableRow>
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
}
