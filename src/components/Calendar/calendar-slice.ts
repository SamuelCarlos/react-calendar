import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CalendarState {
  selectedDay: string
}

const initialState: CalendarState = {
  selectedDay: new Date().toISOString()
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload
    }
  }
})

export const { changeDay } = calendarSlice.actions
export default calendarSlice.reducer
