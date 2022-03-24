import { Edit, LocationOff } from '@mui/icons-material'
import {
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { useLazyGetWeatherForDayQuery } from 'api/weather-api-slice'
import { useEffect } from 'react'
import { Reminder } from 'redux/calendar-slice'

import * as Styled from './styles'

interface ReminderListItemProps {
  data: Reminder
  onClick: (reminder: Reminder) => void
}

export default function ReminderListItem({
  data,
  onClick
}: ReminderListItemProps) {
  const [trigger, result] = useLazyGetWeatherForDayQuery()

  const { isLoading: isLoadingWeather, data: weatherData } = result

  useEffect(() => {
    const hasLocation = data.city.name.length > 0

    if (hasLocation)
      trigger({ city: data.city, date: new Date(data.date).toISOString() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.city.name])

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
      data-testid="list-item"
      sx={{ ':hover': { transform: 'scale(1.01)' } }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding="0 10px 0 0"
        margin="0"
        minWidth="80px"
      >
        {weatherData && isLoadingWeather ? (
          <CircularProgress size="10px" />
        ) : data.city.name ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              margin="0"
            >
              <Tooltip
                title={weatherData?.days[0].conditions || 'conditions'}
                placement="top-end"
              >
                <img
                  width="30px"
                  src={`/icons/${weatherData?.days[0].icon}.png`}
                  alt={weatherData?.days[0].conditions}
                />
              </Tooltip>

              <Typography variant="body2" fontWeight={700}>
                {weatherData?.days[0].temp}°F
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
        <Styled.Button className="edit" onClick={() => onClick(data)}>
          <Edit fontSize="small" color="action" />
        </Styled.Button>
      </Stack>
    </Stack>
  )
}
