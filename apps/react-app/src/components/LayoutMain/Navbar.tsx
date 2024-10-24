import {
  CLERK_AUTH_TEST,
  PLAYGROUND_REST_API_SIGNIN,
  TEST_REACT_HOOK_FORM,
} from '../../const/routes'
import { Link } from '@mui/material'
export const NavBar = () => {
  return (
    <div className="flex gap-[16px] text-[18px]">
      <Link color="primary" href="/">
        Home
      </Link>
      <Link color="primary" href={PLAYGROUND_REST_API_SIGNIN}>
        Test Rest API Signin
      </Link>
      <Link color="primary" href={CLERK_AUTH_TEST}>
        Test Clerk
      </Link>
      <Link color="primary" href={TEST_REACT_HOOK_FORM}>
        Test hook-form
      </Link>
    </div>
  )
}
