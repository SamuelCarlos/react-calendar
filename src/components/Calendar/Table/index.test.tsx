import Table from './'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'app/store'
import { returnToToday } from '../calendar-slice'

describe('Table', () => {
  describe('<Table /> component', () => {
    beforeEach(() => {
      store.dispatch(returnToToday())

      const { selectedDay, reminders } = store.getState().calendar

      render(
        <ReduxProvider store={store}>
          <Table data={{ selectedDay: new Date(selectedDay), reminders }} />
        </ReduxProvider>
      )
    })

    it('should render properly', () => {
      expect(screen.getByTestId('table')).toBeDefined()
    })

    it('should go back in a month on click on month arrow left button', () => {
      const button = screen.getByTestId('back-month')

      const initialDateMonth = new Date(
        store.getState().calendar.selectedDay
      ).getMonth()

      expect(button).toBeDefined()

      fireEvent.click(button)

      const newDateMonth = new Date(
        store.getState().calendar.selectedDay
      ).getMonth()

      expect(newDateMonth).toBe(initialDateMonth - 1)
    })

    it('should go ahead in a month on click on month arrow right button', () => {
      const button = screen.getByTestId('ahead-month')

      const initialDateMonth = new Date(
        store.getState().calendar.selectedDay
      ).getMonth()

      expect(button).toBeDefined()

      fireEvent.click(button)

      const newDateMonth = new Date(
        store.getState().calendar.selectedDay
      ).getMonth()

      expect(newDateMonth).toBe(initialDateMonth + 1)
    })

    it('should go back in a year on click on year arrow left button', () => {
      const button = screen.getByTestId('back-year')

      const initialDateYear = new Date(
        store.getState().calendar.selectedDay
      ).getFullYear()

      expect(button).toBeDefined()

      fireEvent.click(button)

      const newDateYear = new Date(
        store.getState().calendar.selectedDay
      ).getFullYear()

      expect(newDateYear).toBe(initialDateYear - 1)
    })

    it('should go ahead in a year on click on year arrow right button', () => {
      const button = screen.getByTestId('ahead-year')

      const initialDateYear = new Date(
        store.getState().calendar.selectedDay
      ).getFullYear()

      expect(button).toBeDefined()

      fireEvent.click(button)

      const newDateYear = new Date(
        store.getState().calendar.selectedDay
      ).getFullYear()

      expect(newDateYear).toBe(initialDateYear + 1)
    })
  })
})
