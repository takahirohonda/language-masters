import { Outlet } from 'react-router-dom'
import {
  PLAYGROUND_REST_API_SIGNIN,
  CLERK_AUTH_TEST,
} from '../../const/routes'

export const LayoutMain = () => (
  // theme config for centering container not working. Need to fix it
  <main className="container mx-auto py-[16px] h-screen">
    <a href={PLAYGROUND_REST_API_SIGNIN}>test sign-in</a>
    <a href={CLERK_AUTH_TEST}>test clerk auth</a>
    <Outlet />
  </main>
)
