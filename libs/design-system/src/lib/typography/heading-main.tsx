import clsx from 'clsx'

export const H1Main = ({ children }: { children: React.ReactNode }) => (
  <h1
    className={clsx(`
      text-[52px]
      md:text-[68px]
      yellow-light-blue-gradient
    `)}
  >
    {children}
  </h1>
)
