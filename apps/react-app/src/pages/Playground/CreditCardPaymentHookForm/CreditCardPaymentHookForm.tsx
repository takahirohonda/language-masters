import {
  CreditCardPaymentForm,
  type CreditCardPaymentFormValues,
} from '@language-masters/credit-card-payment-form'
import { simulateAjaxCall } from '../../../utils/Tools/simulateAjaxCall'
import { useCallback } from 'react'
import { Typography } from '@mui/material'

export const CreditCardPaymentHookForm = () => {
  const submitHandler = useCallback(
    async (values: CreditCardPaymentFormValues) => {
      await simulateAjaxCall({ data: values })
      console.log(`Post request with ${JSON.stringify(values)}`)
    },
    []
  )

  return (
    <div className="flex flex-col mt-[80px] gap-[24px] justify-center ">
      <div className="flex flex-col">
        <Typography variant="h4" component="h2">
          Hook Form Example
        </Typography>
        <CreditCardPaymentForm handleOnSubmit={submitHandler} />
      </div>
    </div>
  )
}
