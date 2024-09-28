import { startServerAndCreateNextHandler } from '@as-integrations/next'
import jwt from 'jsonwebtoken'
import path from 'path'
import dayjs from 'dayjs'
import { ApolloServer } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { NextRequest } from 'next/server'
import typeDefs from './schema'
import resolvers from './resolvers'

import * as fs from "fs"

let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'myGraph@prod',
    }),
  ]
} else {
  plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  const headers = request.headers.get('Authorization')
  const token = headers?.split(' ')[1] || ''
  // key file has to be at the root of the folder
  const certPath = path.join(process.cwd(), 'public.pem')
  const cert = fs.readFileSync(certPath)

  const jwtData = await jwt.verify(token, cert) as any

  // console.log(`checking headers: ${JSON.stringify(headers)}`)
  console.log(`checking token: ${token}`)
  console.log(`checking jwtData: ${JSON.stringify(jwtData)}`)

  // checking expiry date on jwt token
  const expirationTime = dayjs.unix(jwtData.exp);
  const currentTime = dayjs();

  if (currentTime.isAfter(expirationTime)) {
    console.log('The timestamp has expired.');
  } else {
    console.log('The timestamp is still valid.');
  }

  return handler(request)
}
