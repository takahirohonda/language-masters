import { useFormContext } from 'react-hook-form'
import { CreditCardPaymentFormValues } from '../CreditCardPaymentForm.types'
import { TextField } from '@mui/material'

export const CvvInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreditCardPaymentFormValues>()

  const hasError = Boolean(errors.cvv)
  const errorMessage = errors.cvv?.message
  return (
    <TextField
      id="cvv"
      label="CVV"
      variant="outlined"
      error={hasError}
      helperText={errorMessage}
      fullWidth
      {...register('cvv')}
    />
  )
}
