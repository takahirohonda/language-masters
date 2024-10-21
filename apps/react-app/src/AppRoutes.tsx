import { Route, Routes } from 'react-router-dom'
import { SignIn as RestApiSignInTest } from './pages/Playground/RestApi/TestJwtAuth/SignIn'
import {
  CLERK_AUTH_TEST,
  PLAYGROUND_REST_API_SIGNIN,
  SIGN_IN,
  TEST_REACT_HOOK_FORM,
} from './const/routes'
import { LayoutMain } from './components/LayoutMain/LayoutMain'

import { Home } from './pages/Home/Home'
import { ClerkTest } from './pages/ClerkTest/ClerkTest'
import { SignIn } from './pages/SignIn/SignIn'
import { TestReactHookForm } from './pages/Playground/TestReactHookForm/TestReactHookForm'

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
        <Route path={TEST_REACT_HOOK_FORM} element={<TestReactHookForm />} />
      </Route>
    </Routes>
  )
}
