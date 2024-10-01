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
  // this doesn't fix the issue
  // introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

// https://www.apollographql.com/docs/apollo-server/data/context/
const handlerWithAuthContext = startServerAndCreateNextHandler<NextRequest>(
  server,
  {
    context: async (req) => {
      let body = null

      if (req.method === 'POST') {
        try {
          const rawBody = await req.text()
          body = JSON.parse(rawBody)
          console.log(`Request Body: ${JSON.stringify(body)}`)
        } catch (error) {
          console.warn('Unable to parse request body', error)
        }
      }
      if (body?.operationName === 'IntrospectionQuery') {
        console.log('Skipping authentication for introspection query.')
        return { req }
      }

      try {
        const authorizationInHeaders = req.headers.get('Authorization')
        const token = (authorizationInHeaders?.split('Bearer ')[1] ?? '').trim()

        // Read your public key from the file system
        const certPath = path.join(process.cwd(), 'public.pem')
        const cert = fs.readFileSync(certPath)

        // Verify the token
        const jwtData = await jwt.verify(token, cert)
        console.log(`Token: ${token}`)
        console.log(`JWT Data: ${JSON.stringify(jwtData)}`)

        return {
          req,
          jwtData, // Include JWT data in context
        }
      } catch (e) {
        console.error('Authentication error:', e)
        return { req } // Return request without JWT data
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
