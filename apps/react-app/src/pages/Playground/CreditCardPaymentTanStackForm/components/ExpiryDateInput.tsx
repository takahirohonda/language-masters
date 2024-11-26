import { formatExpirationDate } from '@language-masters/credit-card-payment-form'
import { CommonPropsTypeForCCFormInput } from './types'

import { TextField } from '@mui/material'

export const ExpiryDateInput = ({ form }: CommonPropsTypeForCCFormInput) => {
  return (
    <form.Field name="expiry">
      {(field) => {
        const hasError =
          field.state.meta.isTouched && !!field.state.meta.errors.length
        return (
          <TextField
            id={field.name}
            label="Expiry Date"
            variant="outlined"
            placeholder="MM/YY"
            value={field.state.value}
            error={hasError}
            helperText={hasError && field.state.meta.errors[0]}
            onChange={(e) => {
              field.handleChange(formatExpirationDate(e.target.value))
            }}
            onBlur={field.handleBlur}
            fullWidth
          />
        )
      }}
    </form.Field>
  )
}
