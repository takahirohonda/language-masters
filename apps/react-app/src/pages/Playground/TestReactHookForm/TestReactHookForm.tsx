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
import { Controller, FieldError, useForm } from 'react-hook-form'
import { TestFormValues, testFormValueSchema } from './TestReactHookForm.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

export const TestReactHookForm = () => {
  const {
    register,
    handleSubmit,
    control,
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
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
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
        />
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <PhoneInput
              defaultCountry="au"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  )
}
