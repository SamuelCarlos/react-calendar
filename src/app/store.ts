import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from 'components/Calendar/calendar-slice'

export const store = configureStore({
  reducer: { calendar: calendarReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
