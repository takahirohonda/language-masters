import { startServerAndCreateNextHandler } from '@as-integrations/next'
import jwt from 'jsonwebtoken'
import path from 'path'

import { ApolloServer } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { NextRequest } from 'next/server'
import typeDefs from './schema'
import resolvers from './resolvers'

import * as fs from 'fs'

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

const handler = startServerAndCreateNextHandler<NextRequest>(server)

const handlerWithAuthContext = startServerAndCreateNextHandler<NextRequest>(
  server,
  {
    context: async (req) => {
      if (req.method === 'POST') {
        let body = null
        try {
          const rawBody = await req.text()
          body = JSON.parse(rawBody)
        } catch (error) {
          console.warn('Unable to parse request body', error)
        }

        const operationName = body?.operationName || ''
        // Skip token validation for IntrospectionQuery
        if (operationName === 'IntrospectionQuery') {
          return { req } // No token validation for introspection
        }

        const authorizationInHeaders = req.headers.get('Authorization')
        const token = (authorizationInHeaders?.split('Bearer')[1] ?? '').trim()
        // key file has to be at the root of the folder
        const certPath = path.join(process.cwd(), 'public.pem')

        const cert = fs.readFileSync(certPath)
        const jwtData = await jwt.verify(token, cert)
        console.log(`checking token: ${token}`)
        console.log(`checking jwtData: ${JSON.stringify(jwtData)}`)
        return {
          req,
          jwtData,
        }
      }
    },
  }
)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handlerWithAuthContext(request)
}
