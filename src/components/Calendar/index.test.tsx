import Calendar from './'
import { render, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'app/store'

describe('Calendar', () => {
  describe('<Calendar /> component', () => {
    beforeEach(() => {
      const selectedDay = store.getState().calendar.selectedDay

      render(
        <ReduxProvider store={store}>
          <Calendar selectedDay={selectedDay} />
        </ReduxProvider>
      )
    })

    it('should render properly', () => {
      expect(screen.getByTestId('calendar')).toBeDefined()
    })
  })
})
