import { store } from 'app/store'
import {
  addReminder,
  changeDay,
  deleteReminder,
  purgeCalendarData,
  Reminder,
  ReminderCreatePayload,
  returnToToday,
  updateReminder
} from './calendar-slice'
import { deserializeDate, equalDates } from 'utils/dates'

describe('calendar-slice.ts', () => {
  beforeEach(() => {
    store.dispatch(purgeCalendarData())
  })

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

  describe('returnToToday', () => {
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

      store.dispatch(returnToToday())

      const todaySelectedDay = store.getState().calendar.selectedDay

      const formattedTodaySelectedDay = new Date(
        todaySelectedDay
      ).toLocaleDateString('en-US')

      expect(formattedTodaySelectedDay).toBe(
        new Date().toLocaleDateString('en-US')
      )
    })
  })

  describe('addReminder', () => {
    it('should push a reminder on store.calendar.reminders', () => {
      const newReminder: ReminderCreatePayload = {
        text: 'test reminder',
        city: { name: 'Cariacica' },
        date: new Date().toISOString()
      }

      store.dispatch(addReminder(newReminder))

      const reminders = store.getState().calendar.reminders

      expect(reminders).toBeDefined()
      expect(reminders?.length).toBeGreaterThan(0)

      const lastReminderPosition = reminders!.length - 1

      expect(reminders![lastReminderPosition].city.name).toBe(
        newReminder.city.name
      )
      expect(reminders![lastReminderPosition].text).toBe(newReminder.text)
      expect(reminders![lastReminderPosition].date).toBe(newReminder.date)
    })
  })

  describe('updateReminder', () => {
    it('should update a reminder on store.calendar.reminders', () => {
      const newReminder: ReminderCreatePayload = {
        text: 'test reminder',
        city: { name: 'Cariacica' },
        date: new Date().toISOString()
      }

      store.dispatch(addReminder(newReminder))

      const reminders = store.getState().calendar.reminders

      let myReminder = { ...reminders![reminders!.length - 1] }

      expect(myReminder.city.name).toBe(newReminder.city.name)
      expect(myReminder.date).toBe(newReminder.date)
      expect(myReminder.text).toBe(newReminder.text)

      myReminder.text = 'updated test reminder'
      myReminder.city = { name: 'Vitoria' }
      myReminder.date = new Date('11/11/1998').toISOString()

      store.dispatch(updateReminder({ ...myReminder, id: 'wrong-id' }))

      const notUpdatedReminders = store.getState().calendar.reminders
      const myNotUpdatedReminder =
        notUpdatedReminders![notUpdatedReminders!.length - 1]

      expect(myNotUpdatedReminder.city.name).not.toBe(myReminder.city.name)
      expect(myNotUpdatedReminder.date).not.toBe(myReminder.date)
      expect(myNotUpdatedReminder.text).not.toBe(myReminder.text)

      store.dispatch(updateReminder(myReminder))

      const updatedReminders = store.getState().calendar.reminders

      const myUpdatedReminder = updatedReminders![updatedReminders!.length - 1]

      expect(myUpdatedReminder.city.name).toBe(myReminder.city.name)
      expect(myUpdatedReminder.date).toBe(myReminder.date)
      expect(myUpdatedReminder.text).toBe(myReminder.text)
    })
  })

  describe('deleteReminder', () => {
    it('should delete a reminder on store.calendar.reminders', () => {
      const newReminder: ReminderCreatePayload = {
        text: 'test reminder',
        city: { name: 'Cariacica' },
        date: new Date().toISOString()
      }

      store.dispatch(addReminder(newReminder))

      const reminders = store.getState().calendar.reminders

      let myReminder: Reminder | undefined = {
        ...reminders![reminders!.length - 1]
      }

      expect(myReminder.city.name).toBe(newReminder.city.name)
      expect(myReminder.date).toBe(newReminder.date)
      expect(myReminder.text).toBe(newReminder.text)

      store.dispatch(deleteReminder({ ...myReminder, id: 'wrong-id' }))

      const notDeletedReminders = store.getState().calendar.reminders
      const myNotDeletedReminder =
        notDeletedReminders![notDeletedReminders!.length - 1]

      expect(myNotDeletedReminder.city.name).toBe(myReminder.city.name)
      expect(myNotDeletedReminder.date).toBe(myReminder.date)
      expect(myNotDeletedReminder.text).toBe(myReminder.text)

      store.dispatch(deleteReminder(myReminder))

      const updatedReminders = store.getState().calendar.reminders

      expect(updatedReminders).toBeDefined()
      expect(updatedReminders!.length).toBeGreaterThan(0)

      myReminder = updatedReminders!.find(
        (reminder) => reminder.id === myReminder!.id
      )

      expect(myReminder).not.toBeDefined()
    })
  })

  describe('purgeCalendarData', () => {
    it('should revert calendar state to initial state', () => {
      const selectedDay = store.getState().calendar.selectedDay

      expect(selectedDay).not.toBe(deserializeDate(new Date('1/1/1998')))

      store.dispatch(changeDay(deserializeDate(new Date('1/1/1998'))))

      const newSelectedDay = store.getState().calendar.selectedDay

      expect(newSelectedDay).toBe(deserializeDate(new Date('1/1/1998')))

      store.dispatch(purgeCalendarData())

      const purgedSelectedDay = store.getState().calendar.selectedDay

      expect(purgedSelectedDay).not.toBe(newSelectedDay)
      expect(
        equalDates(new Date(purgedSelectedDay), new Date(selectedDay))
      ).toBe(true)
    })
  })
})
