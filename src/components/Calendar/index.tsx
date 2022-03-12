import Button from 'components/Button'
import { daysInMonth, firstDayOfMonth } from 'utils/dates'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { changeDay } from './calendar-slice'

export default function Calendar() {
  const today = useAppSelector((state) => state.calendar.selectedDay)
  const dispatch = useAppDispatch()

  const handleClick = (date: Date) => {
    const isoDate = date.toISOString()
    dispatch(changeDay(isoDate))
  }

  return (
    <div data-testid="calendar">
      Hi, this is my calendar, today is{' '}
      {`${new Date(today).toLocaleDateString('en-US')}`}
      <Button onClick={() => handleClick(new Date('11/11/1998'))}>
        11/11/1998
      </Button>
      <Button
        onClick={() => handleClick(new Date())}
      >{`${new Date().toLocaleDateString('en-US')}`}</Button>
    </div>
  )
}
