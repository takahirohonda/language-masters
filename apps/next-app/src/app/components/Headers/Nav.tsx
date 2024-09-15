import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'
import { SignUpButton } from '../Buttons'

export const PageLinks = () => (
  <>
    <Link className="hover:text-link-blue" href="/">
      Home
    </Link>
    <Link className="hover:text-link-blue" href="/">
      Pricing
    </Link>
  </>
)

export const ActionLinks = () => (
  <>
    <SignedOut>
      <Link href="/sign-in">Sign In</Link>
      <SignUpButton size="medium" />
    </SignedOut>
    <SignedIn>
      <SignOutButton />
      <UserButton />
    </SignedIn>
  </>
)

export const Nav = () => {
  return (
    <>
      <div className="flex gap-[16px] grow">
        <PageLinks />
      </div>
      <div className="flex gap-[24px] items-center">
        <ActionLinks />
      </div>
    </>
  )
}
