import { Box, Divider, Stack, Typography } from '@mui/material'
import { Reminder } from 'components/Calendar/calendar-slice'
import { Add, WbSunny } from '@mui/icons-material'

import * as S from './styles'

interface PopoverContentProps {
  reminders?: Reminder[]
}

interface ReminderListItemProps {
  data: Reminder
}

const ReminderListItem = ({ data }: ReminderListItemProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      margin="0"
      maxWidth="300px"
      maxHeight="60px"
      bgcolor={data.color + '77'}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding="0 10px"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <WbSunny color="warning" />
          <Typography variant="body2" fontWeight={700}>
            32°C
          </Typography>
        </Stack>
        <Typography variant="body2" fontWeight={700}>
          {data.city}
        </Typography>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        padding="0 10px"
        width="100%"
        margin="0"
      >
        <Typography variant="h5" paddingRight="10px">{`${new Date(data.date)
          .getHours()
          .toString()
          .padStart(2, '0')}:${new Date(data.date)
          .getMinutes()
          .toString()
          .padStart(2, '0')}`}</Typography>
        <Typography variant="body1">{data.text}</Typography>
      </Stack>
    </Stack>
  )
}

export default function PopoverContent({ reminders }: PopoverContentProps) {
  return (
    <Box borderRadius="5px">
      {reminders &&
        reminders.map((reminder) => (
          <ReminderListItem key={reminder.id} data={reminder} />
        ))}
      <S.Button>
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
          <Typography variant="button" fontWeight={500} paddingLeft="10px">
            Add new reminder
          </Typography>
        </Stack>
      </S.Button>
    </Box>
  )
}
