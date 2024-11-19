# Hook form example

```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Header from './Header'

export function App() {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState('')

  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <Header />
      <input {...register('firstName')} placeholder="First name" />
      <select {...register('category', { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <textarea {...register('aboutYou')} placeholder="About you" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  )
}
```

## Select component

[Material UI](https://mui.com/material-ui/react-select/)
[Chakra UI](https://www.chakra-ui.com/docs/components/select)

Both sees to take compositional approaches -e.g. not passing label prop or content prop. Instead composing by using label or item components.

## Some tips

We can spread with register function.

```ts
const { onChange, onBlur, name, ref } = register('firstName');
// include type check against field path with the name you have supplied.

<input
  onChange={onChange} // assign onChange event
  onBlur={onBlur} // assign onBlur event
  name={name} // assign name prop
  ref={ref} // assign ref prop
/>
// same as above
<input {...register('firstName')} />
```

Overriding onChange or onBlur

```ts
register('firstName', {
  onChange: (e) => console.log(e),
  onBlur: (e) => console.log(e),
})
```
