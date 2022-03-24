import {
  addReminder,
  CityData,
  deleteReminder,
  Reminder,
  ReminderCreatePayload,
  updateReminder
} from 'redux/calendar-slice'
import { Save, Delete } from '@mui/icons-material'
import Button from 'components/Button'
import { useAppDispatch } from 'app/hooks'
import { useState } from 'react'
import { Box, Grid, Stack, TextField } from '@mui/material'
import PlacesAutocomplete from '../PlacesAutocomplete'

const BLANK_REMINDER_FORM: ReminderCreatePayload = {
  text: '',
  date: '',
  city: { name: '', lat: 0, lng: 0 }
}

const formatInputAcceptableDate = (date: Date) => {
  const splittedDate = date.toISOString().split(':')
  splittedDate.pop()
  return splittedDate.join(':')
}

export default function ReminderForm({
  reminder,
  selectedDay,
  handleClose
}: {
  reminder?: Reminder
  selectedDay: Date
  handleClose: () => void
}) {
  const [formData, setFormData] = useState<ReminderCreatePayload>(
    reminder
      ? { text: reminder.text, date: reminder.date, city: reminder.city }
      : {
          ...BLANK_REMINDER_FORM,
          date: formatInputAcceptableDate(selectedDay)
        }
  )

  const dispatch = useAppDispatch()

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Box
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      padding="15px"
      maxWidth="300px"
      data-testid="popover-content-form"
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
              inputProps={{
                maxLength: 30,
                'data-testid': 'reminder-text-input'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="datetime-local"
              name="date"
              required
              onChange={onChangeForm}
              fullWidth
              value={formData.date}
              inputProps={{ 'data-testid': 'reminder-date-time-input' }}
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
              justifyContent={reminder ? 'space-between' : 'flex-end'}
              paddingTop="10px"
            >
              {reminder && (
                <Stack margin="0">
                  <Button
                    data-testid="delete-reminder-button"
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
              <Stack margin="0" justifySelf="flex-end">
                <Button type="submit" data-testid="save-reminder-button">
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
