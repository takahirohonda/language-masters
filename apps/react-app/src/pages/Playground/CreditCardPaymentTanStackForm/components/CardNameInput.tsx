import { TextField } from '@mui/material'
import { CommonPropsTypeForCCFormInput } from './types'

export const CardNameInput = ({ form }: CommonPropsTypeForCCFormInput) => {
  return (
    <form.Field name="name">
      {(field) => {
        const hasError =
          field.state.meta.isTouched && !!field.state.meta.errors.length
        return (
          <TextField
            id={field.name}
            label="Name"
            variant="outlined"
            value={field.state.value}
            error={hasError}
            helperText={hasError && field.state.meta.errors[0]}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            fullWidth
          />
        )
      }}
    </form.Field>
  )
}
