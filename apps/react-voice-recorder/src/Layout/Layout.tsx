import clsx from 'clsx'
import { Outlet } from 'react-router-dom'

export const Layout = () => (
  <div
    className={clsx(`
   min-h-screen
    bg-slate-800
    text-white
  `)}
  >
    <div
      className={clsx(`
    container
    mx-auto
    py-[16px]
   
    `)}
    >
      <main>
        <Outlet />
      </main>
    </div>
  </div>
)
