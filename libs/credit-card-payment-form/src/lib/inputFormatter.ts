export enum CREDIT_CARD_TYPE {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DISCOVER = 'DISCOVER',
  DINERS = 'Diners',
  DINERS_CARTE_BLANCHE = 'Diners - Carte Blanche',
  JCB = 'JCB',
  VISA_ELECTRON = 'Visa Electron',
}

export const getCreditCardType = (creditCardNumber: string) => {
  if (/^4/.exec(creditCardNumber) != null) return CREDIT_CARD_TYPE.VISA

  if (/^(5[1-5]\d{14}|2(22[1-9]\d{12}|2[3-9]\d{13}))$/.test(creditCardNumber))
    return CREDIT_CARD_TYPE.MASTERCARD

  if (/^3[47]/.exec(creditCardNumber) != null) return CREDIT_CARD_TYPE.AMEX

  if (
    /^(6011|622(12[6-9]|1[3-9]\\d|[2-8]\\d{2}|9[0-1]\\d|92[0-5]|64[4-9])|65)/.exec(
      creditCardNumber
    ) != null
  )
    return CREDIT_CARD_TYPE.DISCOVER

  if (/^36/.exec(creditCardNumber) != null) return CREDIT_CARD_TYPE.DINERS

  if (/^30[0-5]/.exec(creditCardNumber) != null)
    return CREDIT_CARD_TYPE.DINERS_CARTE_BLANCHE

  if (/^35(2[89]|[3-8]\\d)/.exec(creditCardNumber) != null)
    return CREDIT_CARD_TYPE.JCB

  return ''
}

export const formatAmexCardNumber = (creditCardNumber: string) => {
  const FIRST_PART_COUNT = 4
  const SECOND_PART_COUNT = 10

  if (creditCardNumber.length > SECOND_PART_COUNT) {
    return `${creditCardNumber.slice(
      0,
      FIRST_PART_COUNT
    )} ${creditCardNumber.slice(
      FIRST_PART_COUNT,
      SECOND_PART_COUNT
    )} ${creditCardNumber.slice(SECOND_PART_COUNT)}`
  }

  if (creditCardNumber.length > FIRST_PART_COUNT) {
    return `${creditCardNumber.slice(
      0,
      FIRST_PART_COUNT
    )} ${creditCardNumber.slice(FIRST_PART_COUNT)}`
  }

  return creditCardNumber
}

export const formatCreditCardNumber = (creditCardNumberRaw: string) => {
  const creditCardNumber = creditCardNumberRaw.replace(/\D/g, '')
  const PARTS_COUNT = 4
  const PART_LENGTH = 4
  const parts = []

  if (getCreditCardType(creditCardNumberRaw) === CREDIT_CARD_TYPE.AMEX) {
    return formatAmexCardNumber(creditCardNumber)
  }

  for (
    let counter = 0;
    counter < creditCardNumber.length && parts.length < PARTS_COUNT;
    counter += PART_LENGTH
  ) {
    parts.push(creditCardNumber.substring(counter, counter + PART_LENGTH))
  }
  return parts.join(' ')
}

export const formatExpirationDate = (expirationDateRaw: string) => {
  const expirationDate = expirationDateRaw.replace(/\D/g, '')
  const PARTS_COUNT = 2
  const PART_LENGTH = 2
  const parts = []
  for (
    let counter = 0;
    counter < expirationDate.length && parts.length < PARTS_COUNT;
    counter += PART_LENGTH
  ) {
    parts.push(expirationDate.substring(counter, counter + PART_LENGTH))
  }
  return parts.join('/')
}
