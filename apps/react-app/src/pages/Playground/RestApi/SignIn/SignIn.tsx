import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignInFormValues } from './SignIn.types'
import { useCallback, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { LOCAL_NEXT_URL } from './SignIn.utils'

export const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInFormValues>()
  const [token, setToken] = useState<string | undefined>()

  const submitHandler: SubmitHandler<SignInFormValues> = useCallback(
    async ({ username, password }: SignInFormValues) => {
      console.log(JSON.stringify({ username, password }))
      const response = await fetch(LOCAL_NEXT_URL, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      const resFormatted = await response.json()
      console.log(`checking the API response: %0`, resFormatted)
      setToken(resFormatted.token)
    },
    []
  )

  const onClickHandler = useCallback(async () => {
    const response = await fetch(LOCAL_NEXT_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }, [])

  return (
    <section className="flex flex-col h-full">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={clsx(
          `flex flex-col gap-[16px] max-w-[400px] min-w-[400px] p-[16px] mx-auto mt-[60px]`
        )}
      >
        <h1 className={clsx(`text-2xl text-center`)}>Sign In</h1>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          {...register('username')}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          {...register('password')}
        />
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </form>
      {token && (
        <Button type="button" onClick={onClickHandler}>
          Make API Request With Token
        </Button>
      )}
    </section>
  )
}
