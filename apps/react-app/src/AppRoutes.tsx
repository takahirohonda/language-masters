import { Route, Routes, Link } from 'react-router-dom'
import { SignIn } from './pages/Playground/RestApi/TestJwtAuth/SignIn'
import { PLAYGROUND_REST_API_SIGNIN } from './const/routes'
import { LayoutMain } from './components/Laytout/LayoutMain'

import { Home } from './pages/Home/Home'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" element={<Home />} />
        <Route path={PLAYGROUND_REST_API_SIGNIN} element={<SignIn />} />
      </Route>
    </Routes>
  )
}
