import { useEffect, useState } from 'react'

export const TestWindowObject = () => {
  const [value, setValue] = useState('')
  useEffect(() => {
    const string = Boolean(window.Cypress).toString()
    setValue(string)
  }, [])

  return <p>{value}</p>
}
