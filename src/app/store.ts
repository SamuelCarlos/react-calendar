import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from 'redux/calendar-slice'
import { combineReducers } from 'redux'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { weatherApi } from 'api/weather-api-slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducers = combineReducers({
  calendar: calendarReducer,
  [weatherApi.reducerPath]: weatherApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(weatherApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
