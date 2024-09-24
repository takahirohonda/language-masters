import clsx from 'clsx'
import Link from 'next/link'
export type ButtonSize = 'large' | 'medium'

interface ButtonProps {
  text: string
  href: string
  size?: 'large' | 'medium'
  type?: 'button' | 'submit' | 'reset'
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
export const ButtonLink = ({
  text,
  size = 'medium',
  href,
  type = 'button',
}: ButtonProps) => {
  return (
    <Link
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
      href={href}
    >
      {text}
    </Link>
  )
}
