import { useFormContext } from 'react-hook-form'
import { CreditCardPaymentFormValues } from '../CreditCardPaymentForm.types'
import { TextField } from '@mui/material'
import { ChangeEvent, useCallback } from 'react'
import { formatCreditCardNumber } from '../inputFormatter'

export const CardNumberInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreditCardPaymentFormValues>()

  const hasError = Boolean(errors.pan)
  const errorMessage = errors.pan?.message
  const { onChange, ...rest } = register('pan')
  const onChangeCardNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = formatCreditCardNumber(e.target.value)
      onChange(e)
    },
    [onChange]
  )
  return (
    <TextField
      id="pan"
      label="Card number"
      variant="outlined"
      error={hasError}
      helperText={errorMessage}
      fullWidth
      onChange={onChangeCardNumber}
      {...rest}
    />
  )
}
