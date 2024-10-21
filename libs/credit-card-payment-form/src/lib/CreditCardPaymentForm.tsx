import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import {
  CreditCardPaymentFormValues,
  creditCardPaymentFormValueSchema,
} from './CreditCardPaymentForm.types'
import { CardNameInput } from './components/CardNameInput'
import { CardNumberInput } from './components/CardNumberInput'
import { Button, Typography } from '@mui/material'
import { ExpiryDateInput } from './components/ExpiryDateInput'
import { CvvInput } from './components/CvvInput'

export interface CreditCardPaymentFormProps {
  handleOnSubmit: (values: CreditCardPaymentFormValues) => Promise<void>
}

export const CreditCardPaymentForm = ({
  handleOnSubmit,
}: CreditCardPaymentFormProps) => {
  const methods = useForm<CreditCardPaymentFormValues>({
    mode: 'all',
    resolver: zodResolver(creditCardPaymentFormValueSchema),
  })

  return (
    <div className={clsx(`flex justify-center`)}>
      <FormProvider {...methods}>
        <div
          className={clsx(`flex flex-col gap-[24px] md:w-[400px] mx-[16px]`)}
        >
          <Typography variant="h4" component="h2">
            Credit Card Payment
          </Typography>
          <form
            onSubmit={methods.handleSubmit(handleOnSubmit)}
            className={clsx(`
          flex
          flex-col
          gap-[24px]
        `)}
          >
            <CardNameInput />
            <CardNumberInput />
            <div className={clsx(`flex gap-[16px]`)}>
              <div className="w-[60%]">
                <ExpiryDateInput />
              </div>
              <div className="w-[40%]">
                <CvvInput />
              </div>
            </div>
            <Button type="submit" variant="contained" size="large">
              Pay Now
            </Button>
          </form>
        </div>
      </FormProvider>
    </div>
  )
}
