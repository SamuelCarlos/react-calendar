import Table from './Table'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import { purgeCalendarData } from './calendar-slice'

export default function Calendar() {
  const calendarData = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()

  return (
    <Box data-testid="calendar">
      <Typography variant="h1">React Calendar</Typography>
      <Button
        onClick={() => {
          dispatch(purgeCalendarData())
        }}
      >
        Clear Data
      </Button>
      <Table
        data={{
          ...calendarData,
          selectedDay: new Date(calendarData.selectedDay)
        }}
      />
    </Box>
  )
}
