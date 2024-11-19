import { z } from 'zod'
import { isNumber } from './formValidation'

export const testFormValueSchema = z.object({
  age: z.string().min(1, { message: 'Age required' }).refine(isNumber, {
    message: 'Age needs to be number',
  }),
  title: z.string().min(1, { message: 'Title is required' }),
})

export type TestFormValues = z.infer<typeof testFormValueSchema>
