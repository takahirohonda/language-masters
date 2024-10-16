import {
  CREDIT_CARD_TYPE,
  formatAmexCardNumber,
  formatCreditCardNumber,
  formatExpirationDate,
  getCreditCardType,
} from './inputFormatter'

describe('inputFormatter', () => {
  describe('getCreditCardType', () => {
    it.each<{
      creditCardNumber: string
      expectedType: CREDIT_CARD_TYPE | ''
    }>([
      {
        creditCardNumber: '4111111111111111',
        expectedType: CREDIT_CARD_TYPE.VISA,
      },
      {
        creditCardNumber: '5105105105105100',
        expectedType: CREDIT_CARD_TYPE.MASTERCARD,
      },
      {
        creditCardNumber: '371449635398431',
        expectedType: CREDIT_CARD_TYPE.AMEX,
      },
      {
        creditCardNumber: '6011111111111117',
        expectedType: CREDIT_CARD_TYPE.DISCOVER,
      },
      {
        creditCardNumber: '36259600000004',
        expectedType: CREDIT_CARD_TYPE.DINERS,
      },
      {
        creditCardNumber: '30000000000004',
        expectedType: CREDIT_CARD_TYPE.DINERS_CARTE_BLANCHE,
      },
      {
        creditCardNumber: '3528000000000000',
        expectedType: CREDIT_CARD_TYPE.JCB,
      },
      { creditCardNumber: '1234567890123456', expectedType: '' },
    ])(
      'returns $expectedType for card number $creditCardNumber',
      ({ creditCardNumber, expectedType }) => {
        expect(getCreditCardType(creditCardNumber)).toBe(expectedType)
      }
    )
  })

  describe('formatAmexCardNumber', () => {
    it.each<{
      creditCardNumber: string
      expectedFormattedNumber: string
    }>([
      {
        creditCardNumber: '371449635398431',
        expectedFormattedNumber: '3714 496353 98431',
      },
      { creditCardNumber: '371449', expectedFormattedNumber: '3714 49' },
      { creditCardNumber: '371', expectedFormattedNumber: '371' },
    ])(
      'formats AMEX card number $creditCardNumber to $expectedFormattedNumber',
      ({ creditCardNumber, expectedFormattedNumber }) => {
        expect(formatAmexCardNumber(creditCardNumber)).toBe(
          expectedFormattedNumber
        )
      }
    )
  })

  describe('formatCreditCardNumber', () => {
    it.each<{
      creditCardNumberRaw: string
      expectedFormattedNumber: string
    }>([
      {
        creditCardNumberRaw: '4111111111111111',
        expectedFormattedNumber: '4111 1111 1111 1111',
      },
      {
        creditCardNumberRaw: '5105105105105100',
        expectedFormattedNumber: '5105 1051 0510 5100',
      },
      {
        creditCardNumberRaw: '371449635398431',
        expectedFormattedNumber: '3714 496353 98431',
      },
      {
        creditCardNumberRaw: '4111-1111-1111-1111',
        expectedFormattedNumber: '4111 1111 1111 1111',
      },
    ])(
      'formats credit card number $creditCardNumberRaw to $expectedFormattedNumber',
      ({ creditCardNumberRaw, expectedFormattedNumber }) => {
        expect(formatCreditCardNumber(creditCardNumberRaw)).toBe(
          expectedFormattedNumber
        )
      }
    )
  })

  describe('formatExpirationDate', () => {
    it.each<{
      expirationDateRaw: string
      expectedFormattedDate: string
    }>([
      { expirationDateRaw: '1224', expectedFormattedDate: '12/24' },
      { expirationDateRaw: '12/24', expectedFormattedDate: '12/24' },
      { expirationDateRaw: '12', expectedFormattedDate: '12' },
    ])(
      'formats expiration date $expirationDateRaw to $expectedFormattedDate',
      ({ expirationDateRaw, expectedFormattedDate }) => {
        expect(formatExpirationDate(expirationDateRaw)).toBe(
          expectedFormattedDate
        )
      }
    )
  })
})
