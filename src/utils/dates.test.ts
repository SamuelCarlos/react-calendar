import {
  daysInMonth,
  firstDayOfMonth,
  deserializeDate,
  getMonthName,
  getYear,
  lastDayOfMonth,
  subtractDays,
  addDays,
  equalDates
} from './dates'

describe('Dates utils', () => {
  describe('daysInMonth()', () => {
    it('should return 31 for days in march/2022 month', () => {
      const days = daysInMonth(new Date('3/11/2022'))

      expect(days).toBe(31)
    })
  })

  describe('firstDayOfMonth()', () => {
    it('should return the first day of march/2022 month', () => {
      const days = firstDayOfMonth(new Date('3/11/2022'))

      expect(days.toLocaleDateString('en-US')).toBe('3/1/2022')
    })
  })

  describe('lastDayOfMonth()', () => {
    it('should return the last day of march/2022 month', () => {
      const days = lastDayOfMonth(new Date('3/11/2022'))

      expect(days.toLocaleDateString('en-US')).toBe('3/31/2022')
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

  describe('getMonthName()', () => {
    it('should return Mar for day 3/11/2022', () => {
      const monthName = getMonthName(new Date('3/11/2022'))

      expect(monthName).toBe('Mar')
    })
  })

  describe('getYear()', () => {
    it('should return 2022 for day 3/11/2022', () => {
      const year = getYear(new Date('3/11/2022'))

      expect(year).toBe(2022)
    })
  })

  describe('subtractDays()', () => {
    it('should return 1 day before day 3/11/2022', () => {
      const date = subtractDays(new Date('3/11/2022'), 1)

      expect(date.toLocaleDateString('en-US')).toBe('3/10/2022')
    })
  })

  describe('addDays()', () => {
    it('should return 1 day after day 3/11/2022', () => {
      const date = addDays(new Date('3/11/2022'), 1)

      expect(date.toLocaleDateString('en-US')).toBe('3/12/2022')
    })
  })

  describe('equalDates()', () => {
    it('should return true if sending two equal dates', () => {
      const dateLeft = new Date('3/11/2022')
      const dateRight = new Date('3/11/2022')

      const isDatesEqual = equalDates(dateLeft, dateRight)

      expect(isDatesEqual).toBe(true)
    })
  })
})
