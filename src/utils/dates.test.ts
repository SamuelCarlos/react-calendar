import { daysInMonth, firstDayOfMonth } from './dates'

describe('Dates utils', () => {
  describe('daysInMonth', () => {
    it('should return 31 for days in march/2022 month', () => {
      const days = daysInMonth(new Date('3/11/2022'))

      expect(days).toBe(31)
    })
  })

  describe('firstDayOfMonth', () => {
    it('should return the week day of the first day of march/2022 month', () => {
      const days = firstDayOfMonth(new Date('3/11/2022'))

      expect(days).toBe('Tuesday')
    })
  })
})
