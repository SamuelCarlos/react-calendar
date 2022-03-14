import React, { useEffect, useState } from 'react'

import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import {
  addReminder,
  CityData,
  deleteReminder,
  Reminder,
  ReminderCreatePayload,
  updateReminder
} from 'components/Calendar/calendar-slice'
import {
  Add,
  WbSunny,
  Edit,
  Save,
  Delete,
  LocationOff
} from '@mui/icons-material'

import * as S from './styles'
import PlacesAutocomplete from './PlacesAutocomplete'
import Button from 'components/Button'
import { useAppDispatch } from 'app/hooks'

interface PopoverContentProps {
  selectedDay: Date
  reminders?: Reminder[]
}

interface ReminderListItemProps {
  data: Reminder
  onClick: (reminder: Reminder) => void
}

type PopoverOptions = 'list' | 'form'

const BLANK_REMINDER_FORM: ReminderCreatePayload = {
  text: '',
  date: '',
  city: { name: '', lat: 0, lng: 0 }
}

const ReminderListItem = ({ data, onClick }: ReminderListItemProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="5px 10px"
      margin="0"
      width="100%"
      maxHeight="60px"
      minHeight="60px"
      height="100%"
      bgcolor={data.color + '77'}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding="0 10px 0 0"
        margin="0"
        minWidth="80px"
      >
        {data.city.name ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              margin="0"
            >
              <WbSunny color="warning" />
              <Typography variant="body2" fontWeight={700}>
                32°C
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              margin="0"
            >
              <Typography variant="body2" fontWeight={700}>
                {data.city.name}
              </Typography>
            </Stack>
          </>
        ) : (
          <LocationOff />
        )}
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
      <Stack
        height="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
        margin="0"
      >
        <S.Button className="edit" onClick={() => onClick(data)}>
          <Edit fontSize="small" color="action" />
        </S.Button>
      </Stack>
    </Stack>
  )
}

const ReminderList = ({
  reminders,
  handleSelectReminder,
  handleChangeContent
}: {
  reminders?: Reminder[]
  handleSelectReminder: (reminder: Reminder) => void
  handleChangeContent: (content: PopoverOptions) => void
}) => {
  return (
    <Box borderRadius="5px" display="flex" flexDirection="column">
      {reminders &&
        reminders.map((reminder) => (
          <ReminderListItem
            key={reminder.id}
            data={reminder}
            onClick={(reminder) => handleSelectReminder(reminder)}
          />
        ))}
      <S.Button onClick={() => handleChangeContent('form')}>
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

const ReminderForm = ({
  reminder,
  selectedDay,
  handleClose
}: {
  reminder?: Reminder
  selectedDay: Date
  handleClose: () => void
}) => {
  const [formData, setFormData] = useState<ReminderCreatePayload>(
    reminder
      ? { text: reminder.text, date: reminder.date, city: reminder.city }
      : { ...BLANK_REMINDER_FORM, date: selectedDay.toISOString() }
  )
  const [time, setTime] = useState<string>(
    reminder
      ? `${new Date(reminder.date).getHours()}:${new Date(
          reminder.date
        ).getMinutes()}`
      : '6:00'
  )

  const dispatch = useAppDispatch()

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'time') {
      setTime(e.target.value)
    }

    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (reminder) {
      dispatch(
        updateReminder({
          id: reminder.id,
          color: reminder.color,
          ...formData
        })
      )
    } else {
      dispatch(addReminder({ ...formData }))
    }
    handleClose()
  }

  const handleCityChange = (city: CityData) => {
    setFormData((state) => ({ ...state, city }))
  }

  useEffect(() => {
    const date = new Date(formData.date).toLocaleDateString('en-US')

    setFormData((state) => ({
      ...state,
      date: new Date(date + ' ' + time).toISOString()
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  return (
    <Box
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      padding="15px"
      maxWidth="300px"
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="text"
              required
              onChange={onChangeForm}
              fullWidth
              value={formData.text}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Time"
              type="time"
              name="time"
              required
              onChange={onChangeForm}
              fullWidth
              value={time}
            />
          </Grid>

          <Grid item xs={12}>
            <PlacesAutocomplete
              city={formData.city}
              handleCityChange={(city) => handleCityChange(city)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              width="100%"
              margin="0"
              alignItems="center"
              justifyContent="space-between"
              paddingTop="10px"
            >
              {reminder && (
                <Stack margin="0">
                  <Button
                    color="error"
                    onClick={() => {
                      dispatch(deleteReminder(reminder))
                      handleClose()
                    }}
                  >
                    <Delete />
                  </Button>
                </Stack>
              )}
              <Stack
                margin="0"
                justifySelf={!Boolean(reminder) ? 'flex-end' : ''}
              >
                <Button type="submit">
                  <Save />
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default function PopoverContent({
  selectedDay,
  reminders
}: PopoverContentProps) {
  const [content, setContent] = useState<PopoverOptions>('list')
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  )

  const handleChangeContent = (option: PopoverOptions) => {
    setContent(option)
  }

  const handleSelectReminder = (reminder: Reminder | null) => {
    setSelectedReminder(reminder)

    if (reminder !== null) {
      handleChangeContent('form')
    }
  }

  useEffect(() => {
    if (content === 'list') handleSelectReminder(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  if (content === 'form')
    return (
      <ReminderForm
        reminder={selectedReminder || undefined}
        selectedDay={selectedDay}
        handleClose={() => handleChangeContent('list')}
      />
    )

  return (
    <ReminderList
      reminders={reminders}
      handleSelectReminder={(reminder) => handleSelectReminder(reminder)}
      handleChangeContent={(content) => handleChangeContent(content)}
    />
  )
}
