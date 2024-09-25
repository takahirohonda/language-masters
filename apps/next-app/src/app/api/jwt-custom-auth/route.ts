import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || 'default'
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      email: 'user',
      password: 'password',
    },
    secret
  )
  const jwtData = jwt.verify(token, secret)

  return NextResponse.json({
    token,
    decodedData: JSON.stringify(jwtData),
  })
}

type ApiRequest = {
  username: string
  password: string
} & NextApiRequest

export async function POST({ username, password }: ApiRequest) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      username,
      password,
    },
    secret
  )
  return NextResponse.json({ token })
}
