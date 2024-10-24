import clsx from 'clsx'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import { H1Main, TextLarge } from '@language-masters/components-common'
import { LANDING_PAGE_H1, LANDING_PAGE_TEXT } from '../const'
import { SignUpButton } from '../components/Buttons'
import { GoToDashboardButtonLink } from '../components/Links/GoToDashboardButtonLink'

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

// this will create
{
  /* <title>Language Masters</title>
        <meta property="og:title" content="My page title" key="home-title" />
        <link rel="icon" href="/favicon-96x96.png" /> */
}
export const metadata: Metadata = {
  title: 'Language Masters',
  icons: {
    icon: '/favicon-96x96.png',
  },
}

const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-auto lg:w-[60%] flex text-center">
          <H1Main>{LANDING_PAGE_H1}</H1Main>
        </div>
        <div
          className={clsx(`
            w-auto
            lg:w-[40%] 
            flex
            flex-col
            items-center 
            gap-[24px] 
            mt-[18px] 
            ml-[0px] 
            lg:ml-[16px]`)}
        >
          <TextLarge>{LANDING_PAGE_TEXT}</TextLarge>
          <div>
            <SignedIn>
              <GoToDashboardButtonLink />
            </SignedIn>
            <SignedOut>
              <SignUpButton size="large" />
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
