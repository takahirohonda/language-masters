import Link from 'next/link'
import { Button } from '../button'

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
    <Link href="/sign-in">Sign In</Link>
    <Button text="Sign Up" />
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
