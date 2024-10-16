// validators.test.ts
import {
  isIdentityStringValid,
  isPastDate,
  isValidCreditCardExpirationDate,
  isValidCreditCardNumber,
  isValidCVV,
  isValidMonth,
} from './formValidation'

describe('validators', () => {
  describe('isValidMonth', () => {
    it('should return true for valid months', () => {
      expect(isValidMonth('01')).toBe(true)
      expect(isValidMonth('12')).toBe(true)
    })

    it('should return false for invalid months', () => {
      expect(isValidMonth('00')).toBe(false)
      expect(isValidMonth('13')).toBe(false)
    })

    it('should return false for non-numeric strings', () => {
      expect(isValidMonth('abc')).toBe(false)
    })
  })

  describe('isValidCreditCardExpirationDate', () => {
    it('should return true for valid expiration dates', () => {
      expect(isValidCreditCardExpirationDate('12/23')).toBe(true)
    })

    it('should return false for invalid expiration dates', () => {
      expect(isValidCreditCardExpirationDate('13/23')).toBe(false)
      expect(isValidCreditCardExpirationDate('12/')).toBe(false)
      expect(isValidCreditCardExpirationDate('12-23')).toBe(false)
    })
  })

  describe('isPastDate', () => {
    it('should return true for past dates', () => {
      expect(isPastDate('01/20')).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const futureYear = String(futureDate.getFullYear()).slice(2)
      const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0')
      expect(isPastDate(`${futureMonth}/${futureYear}`)).toBe(false)
    })

    it('should return true for invalid date formats', () => {
      expect(isPastDate('13/20')).toBe(true)
      expect(isPastDate('01-20')).toBe(true)
    })
  })

  describe('isValidCVV', () => {
    it('should return true for valid 3-digit CVV', () => {
      expect(isValidCVV('123')).toBe(true)
    })

    it('should return true for valid 4-digit CVV', () => {
      expect(isValidCVV('1234')).toBe(true)
    })

    it('should return false for invalid CVV', () => {
      expect(isValidCVV('12')).toBe(false)
      expect(isValidCVV('12345')).toBe(false)
      expect(isValidCVV('abc')).toBe(false)
    })
  })

  describe('isValidCreditCardNumber', () => {
    it('should return true for valid credit card numbers', () => {
      expect(isValidCreditCardNumber('1234 5678 1234 5678')).toBe(true)
      expect(isValidCreditCardNumber('1234 567890 12345')).toBe(true)
    })

    it('should return false for invalid credit card numbers', () => {
      expect(isValidCreditCardNumber('1234 5678 1234')).toBe(false)
      expect(isValidCreditCardNumber('1234-5678-1234-5678')).toBe(false)
    })
  })

  describe('isIdentityStringValid', () => {
    it('should return true for valid identity strings', () => {
      expect(isIdentityStringValid('John Doe')).toBe(true)
      expect(isIdentityStringValid("O'Conner")).toBe(true)
    })

    it('should return false for invalid identity strings', () => {
      expect(isIdentityStringValid('')).toBe(false)
      expect(isIdentityStringValid('J')).toBe(false)
      expect(
        // exceeding 40 characters. The test string has 41 characters.
        isIdentityStringValid('ThisIsAReallyLongNameThatExceedsTheLimit.')
      ).toBe(false)
      expect(isIdentityStringValid('John123')).toBe(false)
    })
  })
})
