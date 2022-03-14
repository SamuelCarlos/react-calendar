import { ReminderForm } from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'app/store'
import {
  addReminder,
  purgeCalendarData
} from 'components/Calendar/calendar-slice'

const INITIAL_REMINDER_DATA = {
  city: { name: 'Cariacica' },
  date: new Date().toISOString(),
  text: 'My Test Event'
}

describe('ReminderForm', () => {
  describe('<ReminderForm /> component with reminders', () => {
    beforeEach(() => {
      store.dispatch(purgeCalendarData())

      store.dispatch(addReminder(INITIAL_REMINDER_DATA))

      const { selectedDay, reminders } = store.getState().calendar

      render(
        <ReduxProvider store={store}>
          <ReminderForm
            selectedDay={new Date(selectedDay)}
            reminder={reminders![0]}
            handleClose={() => {}}
          />
        </ReduxProvider>
      )
    })

    it('should render properly', () => {
      expect(screen.getByTestId('popover-content-form')).toBeDefined()
    })

    it('should delete the reminder when click on delete button', () => {
      const list = screen.getByTestId('popover-content-form')

      expect(list).toBeDefined()

      const textInput = screen.getByTestId('reminder-text-input')
      const dateTimeInput = screen.getByTestId('reminder-date-time-input')

      expect(textInput).toBeDefined()
      expect(dateTimeInput).toBeDefined()

      const deleteButton = screen.getByTestId('delete-reminder-button')

      expect(deleteButton).toBeDefined()

      fireEvent.click(deleteButton)

      const { reminders } = store.getState().calendar

      expect(reminders?.length).toBe(0)
    })

    it('should update the reminder when click on delete button', () => {
      const list = screen.getByTestId('popover-content-form')

      const initialReminders = store.getState().calendar.reminders

      expect(list).toBeDefined()

      const textInput = screen.getByTestId('reminder-text-input')
      const dateTimeInput = screen.getByTestId('reminder-date-time-input')

      expect(textInput).toBeDefined()
      expect(dateTimeInput).toBeDefined()

      fireEvent.change(textInput, { target: { value: 'Changed Value' } })

      const submit = screen.getByTestId('save-reminder-button')

      expect(submit).toBeDefined()

      fireEvent.click(submit)

      const updatedReminders = store.getState().calendar.reminders

      expect(updatedReminders![0].id).toBe(initialReminders![0].id)
      expect(updatedReminders![0].text).not.toBe(INITIAL_REMINDER_DATA.text)
      expect(updatedReminders![0].text).toBe('Changed Value')
    })
  })

  describe('<ReminderForm /> component withput reminders', () => {
    beforeEach(() => {
      store.dispatch(purgeCalendarData())

      const { selectedDay, reminders } = store.getState().calendar

      render(
        <ReduxProvider store={store}>
          <ReminderForm
            selectedDay={new Date(selectedDay)}
            reminder={reminders![0]}
            handleClose={() => {}}
          />
        </ReduxProvider>
      )
    })

    it('should render properly', () => {
      expect(screen.getByTestId('popover-content-form')).toBeDefined()
    })

    it('should create a reminder when click on delete button', () => {
      const list = screen.getByTestId('popover-content-form')

      expect(list).toBeDefined()

      const initialReminders = store.getState().calendar.reminders

      expect(initialReminders?.length).toBe(0)

      const textInput = screen.getByTestId('reminder-text-input')
      const dateTimeInput = screen.getByTestId('reminder-date-time-input')

      expect(textInput).toBeDefined()
      expect(dateTimeInput).toBeDefined()

      const reminderData = {
        text: 'Reminder Note',
        date: '2022-03-14T16:49'
      }

      fireEvent.change(textInput, { target: { value: reminderData.text } })
      fireEvent.change(dateTimeInput, { target: { value: reminderData.date } })

      const submit = screen.getByTestId('save-reminder-button')

      expect(submit).toBeDefined()

      fireEvent.click(submit)

      const updatedReminders = store.getState().calendar.reminders

      expect(updatedReminders?.length).toBe(1)
      expect(updatedReminders![0].id).toBeDefined()
      expect(updatedReminders![0].text).toBe(reminderData.text)
      expect(updatedReminders![0].date).toBe(reminderData.date)
    })
  })
})
