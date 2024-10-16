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
    .string({
      required_error: 'This field is required',
    })
    .refine(isIdentityStringValid, {
      message: 'Card name is invalid',
    }),
  pan: z
    .string({
      required_error: 'This field is required',
    })
    .refine(isValidCreditCardNumber, {
      message: 'Invalid credit card number',
    }),
  expiry: z
    .string({
      required_error: 'Expiry date is required',
    })
    .refine(isValidCreditCardExpirationDate, {
      message: 'Expiry date is invalid',
    })
    .refine((value) => !isPastDate(value), {
      message: 'Expiry date is invalid',
    }),
  cvv: z
    .string({
      required_error: 'CVV is required',
    })
    .refine(isValidCVV, {
      message: 'CVV is invalid',
    }),
})

export type CreditCardPaymentFormValue = z.infer<
  typeof creditCardPaymentFormValueSchema
>
