import { Outlet } from 'react-router-dom'
import {
  PLAYGROUND_REST_API_SIGNIN,
  PLAYGROUND_REST_API_SIGNUP,
} from '../../const/routes'

export const LayoutMain = () => (
  // theme config for centering container not working. Need to fix it
  <main className="container mx-auto py-[16px] h-screen">
    <a href={PLAYGROUND_REST_API_SIGNIN}>test sign-in</a>
    <a href={PLAYGROUND_REST_API_SIGNUP}>test sign-up</a>
    <Outlet />
  </main>
)
