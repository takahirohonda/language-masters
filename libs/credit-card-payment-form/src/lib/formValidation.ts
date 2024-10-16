// These validators need to be split into NX module in the future
export const isValidMonth = (value: string) => {
  const month = Number(value)
  return Number.isInteger(month) && month >= 1 && month <= 12
}

export const isValidCreditCardExpirationDate = (value: string) => {
  return /^(\d{2})\/(\d{2})$/.test(value) && isValidMonth(value.split('/')[0])
}

export const isPastDate = (value: string) => {
  const monthYearArray = value.split('/')

  if (monthYearArray.length !== 2) {
    return true
  }

  const month = Number(monthYearArray[0])
  const year = Number(monthYearArray[1])
  const now = new Date()
  const currentYear = Number(now.getFullYear().toString().slice(2))
  const currentMonth = now.getMonth() + 1

  return year < currentYear || (year === currentYear && month < currentMonth)
}

export const isValidCVV = (value: string) => {
  return /^\d{3}$/.test(value) || /^\d{4}$/.test(value)
}

export const isValidCreditCardNumber = (value: string) => {
  return (
    /^\d{4} \d{4} \d{4} \d{4}$/.test(value) || /^\d{4} \d{6} \d{5}$/.test(value)
  )
}

export const isIdentityStringValid = (value: string): boolean =>
  /^(?=.{2,40}$)([a-zA-Z]+[-' ])*[a-zA-Z]+$/.test(value)
