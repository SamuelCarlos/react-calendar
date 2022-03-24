import { Add } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { Reminder } from 'redux/calendar-slice'
import { PopoverOptions } from '..'
import ReminderListItem from './ReminderListItem'

import * as Styled from './styles'

export default function ReminderList({
  reminders,
  handleSelectReminder,
  handleChangeContent
}: {
  reminders?: Reminder[]
  handleSelectReminder: (reminder: Reminder) => void
  handleChangeContent: (content: PopoverOptions) => void
}) {
  return (
    <Box
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      data-testid="popover-content-list"
    >
      {reminders &&
        reminders.map((reminder) => (
          <ReminderListItem
            key={reminder.id}
            data={reminder}
            onClick={(reminder) => handleSelectReminder(reminder)}
          />
        ))}
      <Styled.Button onClick={() => handleChangeContent('form')}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          padding="10px"
          margin="0"
          maxWidth="300px"
          height="100%"
          maxHeight="60px"
        >
          <Add fontSize="small" />
          <Typography variant="body2" fontWeight={500} paddingLeft="10px">
            Add new reminder
          </Typography>
        </Stack>
      </Styled.Button>
    </Box>
  )
}
