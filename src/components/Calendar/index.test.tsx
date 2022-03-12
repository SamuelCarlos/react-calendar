import Calendar from './'
import { render, screen } from '@testing-library/react'

describe('<Calendar />', () => {
  beforeEach(() => {
    render(<Calendar />)
  })

  it('should render properly', () => {
    expect(screen.getByTestId('calendar')).toBeDefined()
  })
})
