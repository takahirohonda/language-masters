import { Route, Routes, Link } from 'react-router-dom'
import { SignIn as RestApiSignInTest } from './pages/Playground/RestApi/TestJwtAuth/SignIn'
import {
  CLERK_AUTH_TEST,
  PLAYGROUND_REST_API_SIGNIN,
  SIGN_IN,
} from './const/routes'
import { LayoutMain } from './components/Laytout/LayoutMain'

import { Home } from './pages/Home/Home'
import { ClerkTest } from './pages/ClerkTest/ClerkTest'
import { SignIn } from './pages/SignIn/SignIn'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" element={<Home />} />
        <Route path={SIGN_IN} element={<SignIn />} />
        <Route path={CLERK_AUTH_TEST} element={<ClerkTest />} />
        <Route
          path={PLAYGROUND_REST_API_SIGNIN}
          element={<RestApiSignInTest />}
        />
      </Route>
    </Routes>
  )
}
