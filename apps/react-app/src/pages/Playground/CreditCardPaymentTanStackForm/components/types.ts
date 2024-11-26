import { ReactFormExtendedApi, Validator } from '@tanstack/react-form'
import { type CreditCardPaymentFormValues } from '@language-masters/credit-card-payment-form'

export type CreditCardPaymentFormTanStackFormPropType = ReactFormExtendedApi<
  CreditCardPaymentFormValues,
  Validator<CreditCardPaymentFormValues, unknown>
>

export type CommonPropsTypeForCCFormInput = {
  form: CreditCardPaymentFormTanStackFormPropType
}
