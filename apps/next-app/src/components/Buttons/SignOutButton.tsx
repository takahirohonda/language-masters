'use client'

import { Button, ButtonSize } from '@language-masters/components/common'
import { useCallback } from 'react'

import { useClerk } from '@clerk/nextjs'
import clsx from 'clsx'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleClick = useCallback(() => {
    signOut({ redirectUrl: '/' })
  }, [signOut])

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(`
        text-white
        text-large
       hover:text-link-blue
      `)}
    >
      Sign Out
    </button>
  )
}
