'use client'

import { Button } from '../button'

export const Nav = () => {
  return (
    <>
      <div className="flex gap-[16px] grow">
        <a className="hover:text-link-blue" href="/">
          Home
        </a>
        <a className="hover:text-link-blue" href="/">
          Pricing
        </a>
      </div>
      <div className="flex gap-[24px] items-center">
        <a>Sign In</a>
        <Button text="Sign Up" />
      </div>
    </>
  )
}
