import { useFormContext } from 'react-hook-form'
import { CreditCardPaymentFormValues } from '../CreditCardPaymentForm.types'
import { TextField } from '@mui/material'

// https://mui.com/material-ui/react-text-field/
export const CardNameInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreditCardPaymentFormValues>()

  const hasError = Boolean(errors.name)
  const errorMessage = errors.name?.message
  return (
    <TextField
      id="name"
      label="Name"
      variant="outlined"
      error={hasError}
      helperText={errorMessage}
      fullWidth
      {...register('name')}
    />
  )
}
