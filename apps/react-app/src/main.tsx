import './styles.css'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ApolloProvider } from '@apollo/client'
import { AppRoutes } from './AppRoutes'
import { CLERK_PUBLISHABLE_KEY } from './const/env'
import { getClient } from './utils/ApolloClient'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const client = getClient()

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ClerkProvider>
    </ApolloProvider>
  </StrictMode>
)
