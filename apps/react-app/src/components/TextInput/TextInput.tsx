import clsx from 'clsx'

interface TextInputProps {
  inputId: string
  labelText: string
  placeholder?: string
}

// This can be removed... I was testing it for hook-form.
export const TextInput = ({
  inputId,
  labelText,
  placeholder,
  ...props
}: TextInputProps) => {
  return (
    <div>
      <label htmlFor={inputId}>{labelText}</label>
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        {...props}
        className={clsx(`
            
          `)}
      ></input>
    </div>
  )
}
