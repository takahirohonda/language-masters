# Playing with TanStackForm...

## Installation

Installing tanstack form with Zod adapter.

```bash
yarn add @tanstack/react-form @tanstack/zod-form-adapter
```

## In progress to do...

We can use a plugin system and flatten the form... `pluginExpirationDate` will have the input formatter. Return onChange and it will override onChange from bindField function.

```tsx
<form.Field
  ...
  children={(field) => (
    <TextField
      {...bindField(field)}
      {...pluginExpirationDate(field)}
    >
  )}
>
```

```tsx
import type { FieldApi } from '@tanstack/react-form'

export function bindField<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TField extends FieldApi<any, any, any, any, any>,
>(
  field: TField
): {
  name: TField['name']
  value: TField['state']['value']
  onChangeValue: TField['handleChange']
  onBlur: () => void
  error: string
} {
  return {
    name: field.name,
    value: field.state.value,
    onChangeValue: field.handleChange,
    onBlur: field.handleBlur,
    error: field.state.meta.errors[0],
  }
}
```

## Concepts

https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts

```tsx
import { useForm } from '@tanstack/react-form'

export default function App() {
  const form = useForm({
    defaultValues: {
      fullName: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field name="fullName" children={(field) => <input name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

## With Zod

```tsx
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import type { FieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? <em>{field.state.meta.errors.join(',')}</em> : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const userSchema = z.object({
  firstName: z.string().refine((val) => val !== 'John', {
    message: '[Form] First name cannot be John',
  }),
  lastName: z.string().min(3, '[Form] Last name must be at least 3 characters'),
})

type User = z.infer<typeof userSchema>

export default function App() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    } as User,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userSchema,
    },
  })

  return (
    <div>
      <h1>Zod Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onChange: z.string().min(3, '[Field] First name must be at least 3 characters'),
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: z.string().refine(
                async (value) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return !value.includes('error')
                },
                {
                  message: "[Field] No 'error' allowed in first name",
                }
              ),
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>First Name:</label>
                  <input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        />
      </form>
    </div>
  )
}
```
