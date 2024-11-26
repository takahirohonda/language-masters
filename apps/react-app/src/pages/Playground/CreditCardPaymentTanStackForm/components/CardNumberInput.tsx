import { TextField } from '@mui/material'
import { CommonPropsTypeForCCFormInput } from './types'

import { formatCreditCardNumber } from '@language-masters/credit-card-payment-form'

export const CardNumberInput = ({ form }: CommonPropsTypeForCCFormInput) => {
  return (
    <form.Field name="pan">
      {(field) => {
        const hasError =
          field.state.meta.isTouched && !!field.state.meta.errors.length
        return (
          <TextField
            id={field.name}
            label="Card number"
            variant="outlined"
            value={field.state.value}
            error={hasError}
            helperText={hasError && field.state.meta.errors[0]}
            onChange={(e) => {
              field.handleChange(formatCreditCardNumber(e.target.value))
            }}
            onBlur={field.handleBlur}
            fullWidth
          />
        )
      }}
    </form.Field>
  )
}
