import { Route, Routes } from 'react-router-dom'
import { SignIn as RestApiSignInTest } from './pages/Playground/RestApi/TestJwtAuth/SignIn'
import {
  CLERK_AUTH_TEST,
  PLAYGROUND_HIP_HOP_SAMPLER,
  PLAYGROUND_REST_API_SIGNIN,
  PLAYGROUND_TEST_CANVAS,
  PLAYGROUND_TEST_MEDIA_RECORDER,
  SIGN_IN,
  TEST_REACT_HOOK_FORM,
} from './const/routes'
import { LayoutMain } from './components/LayoutMain/LayoutMain'

import { Home } from './pages/Home/Home'
import { ClerkTest } from './pages/ClerkTest/ClerkTest'
import { SignIn } from './pages/SignIn/SignIn'
import { TestReactHookForm } from './pages/Playground/TestReactHookForm/TestReactHookForm'
import { TestCanvasPage } from './pages/Playground/TestCanvas/TestCanvasPage'
import { TestMediaRecorder } from './pages/Playground/TestMediaRecorder/TestMediaRecorder'
import { HipHopSampler } from './pages/Playground/HipHopSampler/HipHopSampler'

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
        <Route path={PLAYGROUND_TEST_CANVAS} element={<TestCanvasPage />} />
        <Route
          path={PLAYGROUND_TEST_MEDIA_RECORDER}
          element={<TestMediaRecorder />}
        />
        <Route path={TEST_REACT_HOOK_FORM} element={<TestReactHookForm />} />
        <Route path={PLAYGROUND_HIP_HOP_SAMPLER} element={<HipHopSampler />} />
      </Route>
    </Routes>
  )
}
