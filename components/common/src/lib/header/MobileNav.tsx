'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { MobileNavBurger } from './MobileNavBurger'

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <MobileNavBurger
        onClick={() => setIsOpen((prevState) => !prevState)}
        isOpen={isOpen}
      />
      {isOpen && (
        <div
          className={clsx(`
          absolute
          bottom-0
          left-0
          h-screen
          w-full
          bg-white
          'animation-growLeft'
        `)}
        >
          <div
            className={clsx(`
              flex
              flex-col
              m-[24px]
          `)}
          ></div>
        </div>
      )}
    </>
  )
}
