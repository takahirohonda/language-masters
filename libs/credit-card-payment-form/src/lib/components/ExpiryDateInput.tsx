import { useFormContext } from 'react-hook-form'
import { CreditCardPaymentFormValues } from '../CreditCardPaymentForm.types'
import { TextField } from '@mui/material'
import { ChangeEvent, useCallback } from 'react'
import { formatExpirationDate } from '../inputFormatter'

export const ExpiryDateInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreditCardPaymentFormValues>()

  const hasError = Boolean(errors.expiry)
  const errorMessage = errors.expiry?.message

  const { onChange, ...rest } = register('expiry')

  const onChangeExpiryDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = formatExpirationDate(e.target.value)
      onChange(e)
    },
    [onChange]
  )
  return (
    <TextField
      id="expiry"
      label="Expiry Date"
      variant="outlined"
      placeholder="MM/YY"
      error={hasError}
      helperText={errorMessage}
      fullWidth
      onChange={onChangeExpiryDate}
      {...rest}
    />
  )
}
