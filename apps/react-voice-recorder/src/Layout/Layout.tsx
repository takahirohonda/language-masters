import { Outlet } from 'react-router-dom'

export const Layout = () => (
  <main className="container mx-auto py-[16px] h-screen">
    <Outlet />
  </main>
)
