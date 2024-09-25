import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
  const token = request.headers.authorization || ''
  const jwtData = jwt.verify(token, secret)
  if (jwtData) {
    return NextResponse.json({
      message: 'you are authorised!',
      decodedData: JSON.stringify(jwtData),
    })
  }

  return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
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
  return NextResponse.json(
    { token },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}
