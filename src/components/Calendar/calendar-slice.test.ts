import { store } from 'app/store'
import { changeDay } from './calendar-slice'
import { deserializeDate } from 'utils/dates'

describe('calendar-slice.ts', () => {
  describe('changeDay', () => {
    it('should change store.calendar.selectedDay to 1/1/1990', () => {
      const selectedDay = store.getState().calendar.selectedDay

      const formattedSelectedDay = new Date(selectedDay).toLocaleDateString(
        'en-US'
      )
      expect(formattedSelectedDay).toBe(new Date().toLocaleDateString('en-US'))

      const dayToChange = deserializeDate(new Date('1/1/1990'))

      store.dispatch(changeDay(dayToChange))

      const newDay = store.getState().calendar.selectedDay
      const newDayUSDate = new Date(newDay).toLocaleDateString('en-US')

      expect(newDayUSDate).toBe('1/1/1990')
    })
  })
})
