'use client'
import clsx from 'clsx'

type ButtonSize = 'large' | 'medium'

interface ButtonProps {
  text: string
  size?: 'large' | 'medium'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const getButtonSizeStyle = (size: ButtonSize) => {
  const MEDIUM = 'py-[8px] px-[24px]'
  switch (size) {
    case 'large':
      return 'py-[16px] px-[38px]'
    case 'medium':
      return MEDIUM
    default:
      return MEDIUM
  }
}
export const Button = ({
  text,
  size = 'medium',
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        `
        text-white
        text-center
        rounded-full
        hover:brightness-90
        primary-button-gradient
        `,
        getButtonSizeStyle(size)
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
