import {
  CreditCardPaymentForm,
  type CreditCardPaymentFormValues,
} from '@language-masters/credit-card-payment-form'

export const TestReactHookForm = () => {
  const submitHandler = async((values: CreditCardPaymentFormValues) => {
    simulateAjaxCall
  })
  return (
    <div>
      <CreditCardPaymentForm />
    </div>
  )
}
