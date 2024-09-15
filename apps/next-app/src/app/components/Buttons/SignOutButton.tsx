import { Button, ButtonSize } from '@language-masters/components/common'
import { useCallback } from 'react'

import { useClerk } from '@clerk/nextjs'
export const SignOutButton = ({ size }: { size: ButtonSize }) => {
  const { signOut } = useClerk()

  const handleClick = useCallback(() => {
    signOut({ redirectUrl: '/' })
  }, [signOut])

  return <Button text="Sign Out" onClick={handleClick} size={size} />
}
