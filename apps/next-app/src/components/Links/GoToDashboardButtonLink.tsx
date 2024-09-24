import Link from 'next/link'
import clsx from 'clsx'

export const GoToDashboardButtonLink = () => {
  return (
    <Link
      href="./dashboard/admin"
      className={clsx(
        `
        py-[16px]
        px-[38px]
        text-white
        text-center
        rounded-full
        hover:brightness-90
        red-purple-button-gradient

        `
      )}
    >
      Go to Dashboard
    </Link>
  )
}
