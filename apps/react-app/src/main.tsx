import '@language-masters/design-system-styles'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppRoutes } from './AppRoutes'
import { CLERK_PUBLISHABLE_KEY } from './const/env'
import { ApolloProviderWithClerkAuth } from './utils/ApolloProvider/ApolloProviderWithClerkAuth'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <ApolloProviderWithClerkAuth>
          <AppRoutes />
        </ApolloProviderWithClerkAuth>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
