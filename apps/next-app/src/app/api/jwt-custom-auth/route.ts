import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
  const token = request.headers.get('authorization') || ''
  console.log(
    `checking token in the request header: ${JSON.stringify(request.headers)}`
  )
  console.log(
    `checking token in the request header: ${JSON.stringify(request)}`
  )
  if (!token) {
    return NextResponse.json({ error: 'not authorised' }, { status: 400 })
  }
  const jwtData = jwt.verify(token.split(' ')[1], secret)
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
    { token }
    // no longer required, it's in the config.
    // {
    //   status: 200,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //   },
    // }
  )
}
