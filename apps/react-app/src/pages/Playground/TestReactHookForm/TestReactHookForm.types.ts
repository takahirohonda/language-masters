import { z } from 'zod'
import { isNumber } from './formValidation'

export const testFormValueSchema = z.object({
  age: z.coerce
    .number({
      message: 'Age needs to be number',
    })
    .int()
    .min(1, { message: 'Age required' }),
  age2: z.string().min(1, { message: 'Age2 required' }).refine(isNumber, {
    message: 'age has to be a number',
  }),
  title: z.string().min(1, { message: 'Title is required' }),
  phone: z.string(),
})

export type TestFormValues = z.infer<typeof testFormValueSchema>
