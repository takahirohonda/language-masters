'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { MobileNavBurger } from './MobileNavBurger'
import { ActionLinks, PageLinks } from './Nav'

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
          right-0
          h-screen
          w-full
          bg-primary-black
          animation-growLeft
        `)}
        >
          <div className="container">
            <div
              className={clsx(`
              flex
              flex-col
              m-[24px]
              gap-[12px]
              h-full
              mt-[80px]
              items-start
          `)}
            >
              <PageLinks />
              <ActionLinks />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
