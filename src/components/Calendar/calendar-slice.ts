import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface ReminderCreatePayload {
  date: string
  text: string
  city: string
}

export interface Reminder extends ReminderCreatePayload {
  id: string
  color: string
}
export interface CalendarState {
  selectedDay: string
  reminders?: Reminder[]
}

const REMINDERS_COLORS = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff']

const getRandomColor = () =>
  REMINDERS_COLORS[Math.floor(Math.random() * REMINDERS_COLORS.length)]

const initialState: CalendarState = {
  selectedDay: new Date().toISOString(),
  reminders: [
    {
      id: uuidv4(),
      date: new Date('3/14/2022').toISOString(),
      text: 'Antother one for me',
      city: 'Cariacica',
      color: getRandomColor()
    },
    {
      id: uuidv4(),
      date: new Date().toISOString(),
      text: 'New Reminder for me',
      city: 'Cariacica',
      color: getRandomColor()
    },
    {
      id: uuidv4(),
      date: new Date().toISOString(),
      text: 'Other? for me',
      city: 'Cariacica',
      color: getRandomColor()
    },
    {
      id: uuidv4(),
      date: new Date().toISOString(),
      text: 'Nicee for me',
      city: 'Cariacica',
      color: getRandomColor()
    }
  ]
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload

      return state
    },
    addReminder(state, action: PayloadAction<ReminderCreatePayload>) {
      state.reminders?.push({
        ...action.payload,
        id: uuidv4(),
        color: getRandomColor()
      })

      return state
    },
    changeReminder(state, action: PayloadAction<Reminder>) {
      if (!state.reminders || state.reminders?.length === 0) {
        return
      }

      const reminderIndex = state.reminders.findIndex(
        (element) => element.id === action.payload.id
      )

      if (!reminderIndex || reminderIndex === -1) {
        return
      }

      state.reminders[reminderIndex] = { ...action.payload }

      return state
    },
    deleteReminder(state, action: PayloadAction<Reminder>) {
      if (!state.reminders || state.reminders?.length === 0) {
        return
      }

      const reminderIndex = state.reminders.findIndex(
        (element) => element.id === action.payload.id
      )

      if (!reminderIndex || reminderIndex === -1) {
        return
      }

      const remindersCopy = [...state.reminders]

      remindersCopy.splice(reminderIndex, 1)

      state.reminders = [...remindersCopy]

      return state
    },
    purgeCalendarData(state) {
      state = initialState
      return state
    }
  }
})

export const {
  changeDay,
  addReminder,
  changeReminder,
  deleteReminder,
  purgeCalendarData
} = calendarSlice.actions
export default calendarSlice.reducer
