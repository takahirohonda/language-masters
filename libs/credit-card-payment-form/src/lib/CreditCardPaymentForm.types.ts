import { z } from 'zod'
import {
  isIdentityStringValid,
  isPastDate,
  isValidCreditCardExpirationDate,
  isValidCreditCardNumber,
  isValidCVV,
} from './formValidation'
export const creditCardPaymentFormValueSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .refine(isIdentityStringValid, {
      message: 'Card name is invalid',
    }),
  pan: z
    .string()
    .min(1, { message: 'Credit card number is required' })
    .refine(isValidCreditCardNumber, {
      message: 'Invalid credit card number',
    }),
  expiry: z
    .string()
    .min(1, { message: 'Expiry date is required' })
    .refine(isValidCreditCardExpirationDate, {
      message: 'Expiry date is invalid',
    })
    .refine((value) => !isPastDate(value), {
      message: 'Expiry date cannot be in the past',
    }),
  cvv: z
    // required_error doesn't work with zodResolver
    // .string({
    //   required_error: 'CVV is required',
    // })
    .string()
    .min(1, { message: 'CVV is required' })
    .refine(isValidCVV, {
      message: 'CVV is invalid',
    }),
})

export type CreditCardPaymentFormValues = z.infer<
  typeof creditCardPaymentFormValueSchema
>
