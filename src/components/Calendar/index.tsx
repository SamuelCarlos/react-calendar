import Button from 'components/Button'
import { daysInMonth, deserializeDate, firstDayOfMonth } from 'utils/dates'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { changeDay } from './calendar-slice'

interface CalendarProps {
  selectedDay: string
}
export default function Calendar({ selectedDay }: CalendarProps) {
  const dispatch = useAppDispatch()

  const handleClick = (date: Date) => {
    const ISODate = deserializeDate(date)
    dispatch(changeDay(ISODate))
  }

  return (
    <div data-testid="calendar">
      Hi, this is my calendar, today is{' '}
      {`${new Date(selectedDay).toLocaleDateString('en-US')}`}
      <Button onClick={() => handleClick(new Date('11/11/1998'))}>
        11/11/1998
      </Button>
      <Button
        onClick={() => handleClick(new Date())}
      >{`${new Date().toLocaleDateString('en-US')}`}</Button>
    </div>
  )
}
