import Table from './Table'
import { Typography } from '@mui/material'

interface CalendarProps {
  selectedDay: string
}
export default function Calendar({ selectedDay }: CalendarProps) {
  return (
    <div data-testid="calendar">
      <Typography variant="h1">React Calendar</Typography>
      <Table data={{ selectedDay: new Date(selectedDay) }} />
    </div>
  )
}
