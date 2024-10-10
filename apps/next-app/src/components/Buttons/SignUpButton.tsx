'use client'

import { useRouter } from 'next/navigation'
import { Button, ButtonSize } from '@language-masters/components-common'
import { useCallback } from 'react'
export const SignUpButton = ({ size }: { size: ButtonSize }) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push('/sign-up')
  }, [router])

  return <Button text="Sign Up" size={size} onClick={handleClick} />
}
