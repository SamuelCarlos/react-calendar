import { useAppSelector } from 'app/hooks'
import Calendar from 'components/Calendar'

interface CalendarProps {}

export default function CalendarPage(props: CalendarProps) {
  const selectedDay = useAppSelector((state) => state.calendar.selectedDay)

  return (
    <div className="container">
      <Calendar selectedDay={selectedDay} />
    </div>
  )
}
