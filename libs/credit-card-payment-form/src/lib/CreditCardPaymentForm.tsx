import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreditCardPaymentFormValue,
  creditCardPaymentFormValueSchema,
} from './CreditCardPaymentForm.types'

export interface CreditCardPaymentFormProps {
  handleOnSubmit: (values: CreditCardPaymentFormValue) => Promise<void>
}

export const CreditCardPaymentForm = ({
  handleOnSubmit,
}: CreditCardPaymentFormProps) => {
  const methods = useForm<CreditCardPaymentFormValue>({
    mode: 'onBlur',
    resolver: zodResolver(creditCardPaymentFormValueSchema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <input type="input" />
      </form>
    </FormProvider>
  )
}
