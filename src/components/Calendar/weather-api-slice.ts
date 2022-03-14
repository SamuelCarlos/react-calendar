import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CityData } from 'components/Calendar/calendar-slice'
import { WeatherData } from './weather.type'

export interface GetWeather {
  city: CityData
  date: string
}

const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_KEY

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
  }),
  endpoints: (builder) => ({
    getWeatherForDay: builder.query<WeatherData, GetWeather>({
      query: (data) => {
        const splittedDate = data.date.split('T')

        const cityString =
          data.city.lat && data.city.lng
            ? `${data.city.lat}%2C${data.city.lng}`
            : `${data.city.name}`

        return `${cityString}/${splittedDate[0]}/${splittedDate[0]}?unitGroup=us&include=days&key=${API_KEY}&contentType=json`
      }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherForDayQuery } = weatherApi
