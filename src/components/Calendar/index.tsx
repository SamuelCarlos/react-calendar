import Table from './Table'
import { Box, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import { purgeCalendarData, returnToToday } from '../../redux/calendar-slice'

export default function Calendar() {
  const calendarData = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()

  return (
    <Box data-testid="calendar" sx={{ minWidth: '700px', overflow: 'auto' }}>
      <Typography variant="h1">React Calendar</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Button
          onClick={() => {
            dispatch(returnToToday())
          }}
        >
          Today
        </Button>

        <Button
          color="warning"
          onClick={() => {
            dispatch(purgeCalendarData())
          }}
        >
          Clear Data
        </Button>
      </Stack>
      <Table
        data={{
          ...calendarData,
          selectedDay: new Date(calendarData.selectedDay)
        }}
      />
    </Box>
  )
}
