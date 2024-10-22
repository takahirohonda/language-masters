import { Outlet } from 'react-router-dom'

import { useEffect } from 'react'
import { NavBar } from './Navbar'

export const LayoutMain = () => {
  useEffect(() => {
    console.log('checking to see if LayoutMain is called')
  }, [])

  return (
    // theme config for centering container not working. Need to fix it
    <main className="container mx-auto py-[16px] h-screen bg-primary-black">
      <NavBar />
      <Outlet />
    </main>
  )
}
