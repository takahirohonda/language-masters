import { TextField } from '@mui/material'
import { CommonPropsTypeForCCFormInput } from './types'

export const CvvInput = ({ form }: CommonPropsTypeForCCFormInput) => {
  return (
    <form.Field name="cvv">
      {(field) => {
        const hasError =
          field.state.meta.isTouched && !!field.state.meta.errors.length
        return (
          <TextField
            id={field.name}
            label="CVV"
            variant="outlined"
            value={field.state.value}
            error={hasError}
            helperText={hasError && field.state.meta.errors.join(', ')}
            onChange={(e) => field.handleChange(e.target.value)}
            fullWidth
          />
        )
      }}
    </form.Field>
  )
}
