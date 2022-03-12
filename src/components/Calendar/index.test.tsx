import Calendar from './'
import { render, screen } from '@testing-library/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'app/store'

describe('<Calendar />', () => {
  beforeEach(() => {
    render(
      <ReduxProvider store={store}>
        <Calendar />
      </ReduxProvider>
    )
  })

  it('should render properly', () => {
    expect(screen.getByTestId('calendar')).toBeDefined()
  })
})
