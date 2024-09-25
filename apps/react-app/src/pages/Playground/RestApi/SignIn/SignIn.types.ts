import { z } from 'zod'

const SingInFormValueSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type SignInFormValues = z.infer<typeof SingInFormValueSchema>
