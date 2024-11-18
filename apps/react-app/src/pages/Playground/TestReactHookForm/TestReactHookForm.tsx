import { simulateAjaxCall } from '../../../utils/Tools/simulateAjaxCall'
import { useCallback } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TestFormValues } from './TestReactHookForm.types'

export const TestReactHookForm = () => {
  const { register, handleSubmit } = useForm<TestFormValues>()

  const submitHandler = useCallback(async (values: TestFormValues) => {
    await simulateAjaxCall({ data: values })
    console.log(`Post request with ${JSON.stringify(values)}`)
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormControl fullWidth>
          <InputLabel id="age-label">Age</InputLabel>
          <Select
            labelId="age-label"
            id="age-select"
            label="Age"
            {...register('age')}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  )
}
