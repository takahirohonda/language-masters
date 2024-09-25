import { Route, Routes, Link } from 'react-router-dom'
import { SignIn } from './pages/Playground/RestApi/SignIn/SignIn'
import { SignUp } from './pages/Playground/RestApi/SignUp/SignUp'
import {
  PLAYGROUND_REST_API_SIGNIN,
  PLAYGROUND_REST_API_SIGNUP,
} from './const/routes'
import { LayoutMain } from './components/Laytout/LayoutMain'

import { Home } from './pages/Home/Home'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" element={<Home />} />
        <Route path={PLAYGROUND_REST_API_SIGNIN} element={<SignIn />} />
        <Route path={PLAYGROUND_REST_API_SIGNUP} element={<SignUp />} />
      </Route>
    </Routes>
  )
}
