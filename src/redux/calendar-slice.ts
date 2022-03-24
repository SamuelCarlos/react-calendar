import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface CityData {
  name: string
  lat?: number
  lng?: number
}

export interface ReminderCreatePayload {
  date: string
  text: string
  city: CityData
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
  reminders: []
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload

      return state
    },
    returnToToday(state) {
      state.selectedDay = new Date().toISOString()

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
    updateReminder(state, action: PayloadAction<Reminder>) {
      const reminderIndex = state.reminders?.findIndex(
        (element) => element.id === action.payload.id
      )

      if (reminderIndex === undefined || reminderIndex === -1) return

      state.reminders![reminderIndex] = { ...action.payload }

      return state
    },
    deleteReminder(state, action: PayloadAction<Reminder>) {
      const reminderIndex = state.reminders?.findIndex(
        (element) => element.id === action.payload.id
      )

      if (
        reminderIndex === undefined ||
        reminderIndex === -1 ||
        !state.reminders
      ) {
        return
      }

      if (state.reminders.length === 1) {
        state.reminders.pop()
        return state
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
  returnToToday,
  updateReminder,
  deleteReminder,
  purgeCalendarData
} = calendarSlice.actions
export default calendarSlice.reducer
