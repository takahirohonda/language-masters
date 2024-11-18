import { z } from 'zod'
import { isNumber } from './formValidation'

export const testFormValueSchema = z.object({
  age: z.string().min(1, { message: 'Ageis required' }).refine(isNumber, {
    message: 'Age is invalid',
  }),
})

export type TestFormValues = z.infer<typeof testFormValueSchema>
