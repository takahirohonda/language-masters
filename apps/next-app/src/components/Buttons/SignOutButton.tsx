'use client'

import { Button, ButtonSize } from '@language-masters/components/common'
import { useCallback } from 'react'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleClick = useCallback(() => {
    signOut({ redirectUrl: '/' })
  }, [signOut])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white text-large"
    >
      Sign Out
    </button>
  )
}