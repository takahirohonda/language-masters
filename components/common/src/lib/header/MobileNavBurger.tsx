'use client'

import clsx from 'clsx'

interface NavBurgerProps {
  isOpen: boolean
  transform: string
}

const NavBurger = ({ isOpen, transform }: NavBurgerProps) => (
  <div
    className={clsx(`
      border
      border-b-2
      ${isOpen ? 'border-white' : 'border-white'}
      ${isOpen && transform}
      w-[24px]
    `)}
  />
)

interface MobileNavBurgerProps {
  onClick: () => void
  isOpen: boolean
}

export const MobileNavBurger = ({ onClick, isOpen }: MobileNavBurgerProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(`
      flex
      flex-col
      gap-[8px]
      z-[100]
    `)}
    >
      <NavBurger
        isOpen={isOpen}
        transform="transform transition-transform duration-300 rotate-45 translate-y-[4px]"
      />
      <NavBurger
        isOpen={isOpen}
        transform="transform transition-transform duration-300 -rotate-45 -translate-y-[6px]"
      />
    </button>
  )
}
