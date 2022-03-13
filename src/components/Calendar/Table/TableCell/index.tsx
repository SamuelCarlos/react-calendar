import { Box, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DayData } from '..'

interface TableCellProps {
  data: DayData
  selected?: boolean
}

export default function TableCell({ data, selected = false }: TableCellProps) {
  const { date, reminders } = data
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      height="100%"
      width="100%"
      paddingBottom="10px"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        justifySelf="flex-start"
        margin="5px 0 0 5px"
      >
        {date.getDate()}
      </Stack>
      {reminders &&
        reminders.map((reminder) => (
          <Stack
            key={reminder.id}
            bgcolor={reminder.color}
            margin="1px 0"
            padding="1px 3px 1px 3px"
            position="relative"
            boxShadow="1px 1px 1px rgba(0,0,0, 0.1)"
            overflow="auto"
          >
            <Typography
              variant="caption"
              max-width="100%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontSize="0.85rem"
              fontWeight={100}
            >
              {`${new Date(reminder.date).getHours()}:${new Date(
                reminder.date
              ).getMinutes()} - `}
              {reminder.text}
            </Typography>
          </Stack>
        ))}
    </Box>
  )
}
