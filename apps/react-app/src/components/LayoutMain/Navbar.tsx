import {
  CLERK_AUTH_TEST,
  CREDIT_CARD_PAYMENT_FORM_TEST,
  PLAYGROUND_HIP_HOP_SAMPLER,
  PLAYGROUND_REST_API_SIGNIN,
  PLAYGROUND_TEST_CANVAS,
  PLAYGROUND_TEST_MEDIA_RECORDER,
  TEST_REACT_HOOK_FORM,
} from '../../const/routes'
import { Link } from '@mui/material'
export const NavBar = () => {
  return (
    <div className="flex gap-[16px] text-[18px] h-[42px] items-center mb-[16px]">
      <Link color="primary" href="/">
        Home
      </Link>
      <Link color="primary" href={PLAYGROUND_REST_API_SIGNIN}>
        Test Rest API Signin
      </Link>
      <Link color="primary" href={CLERK_AUTH_TEST}>
        Test Clerk
      </Link>
      <Link color="primary" href={CREDIT_CARD_PAYMENT_FORM_TEST}>
        CC Payment Form
      </Link>
      <Link color="primary" href={TEST_REACT_HOOK_FORM}>
        Test hook-form
      </Link>
      <Link color="primary" href={PLAYGROUND_TEST_CANVAS}>
        Test Canvas
      </Link>
      <Link color="primary" href={PLAYGROUND_TEST_MEDIA_RECORDER}>
        Test Media Recorder
      </Link>
      <Link color="primary" href={PLAYGROUND_HIP_HOP_SAMPLER}>
        Hip Hop Sampler
      </Link>
    </div>
  )
}
