import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import React, { useEffect, useState } from 'react'
import { CityData } from 'components/Calendar/calendar-slice'
import { Grid, TextField } from '@mui/material'

interface PlacesAutocompleteProps {
  city?: CityData
  handleCityChange: (city: CityData) => void
}

const PlacesAutocomplete = ({
  city,
  handleCityChange
}: PlacesAutocompleteProps) => {
  const [cityData, setCityData] = useState<CityData>(
    city ? city : { name: '', lat: 0, lng: 0 }
  )

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300
  })

  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    handleCityChange(cityData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData])

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false)
      clearSuggestions()

      const currentCity: CityData = {
        name: '',
        lat: 0,
        lng: 0
      }

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          // Filter to find administrative_area_level_2 who is equivalent to city
          const name = results[0].address_components.filter(
            (value) => value.types[0] === 'administrative_area_level_2'
          )

          currentCity.name = name[0].long_name

          return getLatLng(results[0])
        })
        .then(({ lat, lng }) => {
          currentCity.lat = lat
          currentCity.lng = lng
          setCityData(currentCity)
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <Grid item xs={12} ref={ref}>
      <TextField
        value={value}
        helperText={city?.name ? `Current: ${city.name}` : ''}
        label="City"
        onChange={handleInput}
        disabled={!ready}
        placeholder={city?.name || 'City'}
        fullWidth
        autoComplete="off"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </Grid>
  )
}

export default PlacesAutocomplete
