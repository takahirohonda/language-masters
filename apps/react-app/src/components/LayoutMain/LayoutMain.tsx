import { Outlet } from 'react-router-dom'

import { NavBar } from './Navbar'

export const LayoutMain = () => {
  return (
    // theme config for centering container not working. Need to fix it
    <main className="container mx-auto py-[16px] h-screen bg-primary-black">
      <div className="mx-[16px]">
        <NavBar />
        <Outlet />
      </div>
    </main>
  )
}
