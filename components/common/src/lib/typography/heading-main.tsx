import clsx from 'clsx'

export const H1Main = ({ text }: { text: string }) => (
  <h1
    className={clsx(`
      text-[68px]
      yellow-light-blue-gradient
    `)}
  >
    {text}
  </h1>
)
