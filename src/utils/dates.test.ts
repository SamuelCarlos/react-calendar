import { daysInMonth, firstDayOfMonth, deserializeDate } from './dates'

describe('Dates utils', () => {
  describe('daysInMonth()', () => {
    it('should return 31 for days in march/2022 month', () => {
      const days = daysInMonth(new Date('3/11/2022'))

      expect(days).toBe(31)
    })
  })

  describe('firstDayOfMonth()', () => {
    it('should return the week day of the first day of march/2022 month', () => {
      const days = firstDayOfMonth(new Date('3/11/2022'))

      expect(days).toBe('Tuesday')
    })
  })

  describe('deserializeDate()', () => {
    it('should return a ISO string for a given Date', () => {
      const ISOString = deserializeDate(new Date('3/11/2022'))

      expect(typeof ISOString).toBe('string')
      expect(ISOString).toMatch(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
      )
    })
  })
})
