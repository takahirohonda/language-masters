import { simulateAjaxCall } from '../../../utils/Tools/simulateAjaxCall'
import { useCallback } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { FieldError, useForm } from 'react-hook-form'
import { TestFormValues, testFormValueSchema } from './TestReactHookForm.types'
import { zodResolver } from '@hookform/resolvers/zod'

export const TestReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormValues>({
    mode: 'all',
    resolver: zodResolver(testFormValueSchema),
  })

  const submitHandler = useCallback(async (values: TestFormValues) => {
    await simulateAjaxCall({ data: values })
    console.log(`Post request with ${JSON.stringify(values)}`)
  }, [])

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-[20px] w-[50%] mx-auto"
      >
        <FormControl fullWidth>
          <InputLabel id="age-label">Age</InputLabel>
          <Select
            labelId="age-label"
            id="age-select"
            label="Age"
            error={Boolean(errors.title)}
            {...register('age')}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {Boolean(errors.age as FieldError) && (
            <FormHelperText error>{errors.age?.message}</FormHelperText>
          )}
        </FormControl>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          fullWidth
          {...register('title')}
        ></TextField>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  )
}
