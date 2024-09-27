import { RedirectToSignIn, useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {

  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/')
    }
  }, [isSignedIn, navigate])

  return (<RedirectToSignIn />)
}