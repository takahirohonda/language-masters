import { Button, Typography } from '@mui/material'
import clsx from 'clsx'
import { useForm } from '@tanstack/react-form'
import {
  creditCardPaymentFormValueSchema,
  type CreditCardPaymentFormValues,
} from '@language-masters/credit-card-payment-form'
import { useCallback } from 'react'
import { simulateAjaxCall } from '../../../utils/Tools/simulateAjaxCall'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { CardNameInput } from './components/CardNameInput'
import { CardNumberInput } from './components/CardNumberInput'
import { ExpiryDateInput } from './components/ExpiryDateInput'
import { CvvInput } from './components/CvvInput'
interface CreditCardPaymentFormValuesForSubmitArgs {
  value: CreditCardPaymentFormValues
}

export const CreditCardPaymentFormTanStack = () => {
  const submitHandler = useCallback(
    async ({ value }: CreditCardPaymentFormValuesForSubmitArgs) => {
      await simulateAjaxCall({ data: value })
      console.log(`Post request with ${JSON.stringify(value)}`)
    },
    []
  )
  const form = useForm({
    onSubmit: submitHandler,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: creditCardPaymentFormValueSchema,
      // onBlur: creditCardPaymentFormValueSchema,
    },
  })
  return (
    <div className={clsx(`flex justify-center mt-[80px]`)}>
      <div className={clsx(`flex flex-col gap-[24px] md:w-[400px] mx-[16px]`)}>
        <Typography variant="h4" component="h2">
          Payment TanStack Form
        </Typography>
        <form
          className={clsx(`
          flex
          flex-col
          gap-[24px]
        `)}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <CardNameInput form={form} />
          <CardNumberInput form={form} />
          <div className={clsx(`flex gap-[16px]`)}>
            <div className="w-[60%]">
              <ExpiryDateInput form={form} />
            </div>
            <div className="w-[40%]">
              <CvvInput form={form} />
            </div>
          </div>
          <Button type="submit" variant="contained" size="large">
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  )
}
