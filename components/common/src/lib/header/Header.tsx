import clsx from 'clsx'
import { BrandHeader } from '../typography'
import { Button } from '../button/Button'
import { redirect } from 'next/navigation'
import { Nav } from './Nav'
import { MobileNav } from './MobileNav'

interface HeaderProps {
  brandName?: string
  BrandIcon?: React.ReactNode
}
export const Header = ({ brandName, BrandIcon }: HeaderProps) => {
  return (
    <nav
      className={clsx(`
      h-[76px]
      flex
      justify-between
      items-center
      w-full
    `)}
    >
      <div className="flex">
        <div className="flex mr-[48px]">
          <BrandHeader />
        </div>
      </div>
      <div className="hidden lg:flex grow items-center">
        <Nav />
      </div>
      <div className="flex lg:hidden grow items-center justify-end">
        <MobileNav />
      </div>
    </nav>
  )
}
