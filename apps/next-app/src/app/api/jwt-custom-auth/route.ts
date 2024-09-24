import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: NextApiRequest) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  return new Response(secret)
}

export async function POST(request: NextApiRequest) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  return new Response(secret)
}
