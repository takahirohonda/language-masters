import {
  CreditCardPaymentForm,
  type CreditCardPaymentFormValues,
} from '@language-masters/credit-card-payment-form'
import { simulateAjaxCall } from '../../../utils/Tools/simulateAjaxCall'
import { useCallback } from 'react'

export const CreditCardPaymentHookForm = () => {
  const submitHandler = useCallback(
    async (values: CreditCardPaymentFormValues) => {
      await simulateAjaxCall({ data: values })
      console.log(`Post request with ${JSON.stringify(values)}`)
    },
    []
  )

  return (
    <div>
      <CreditCardPaymentForm handleOnSubmit={submitHandler} />
    </div>
  )
}
