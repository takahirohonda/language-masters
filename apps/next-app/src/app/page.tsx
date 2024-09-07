import clsx from 'clsx'
import { H1Main } from '@language-masters/components/common'
import { LANDING_PAGE_H1 } from './const'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Language Masters</title>
        <meta property="og:title" content="My page title" key="home-title" />
        <link rel="icon" href="/favicon-96x96.png" />
      </Head>
      <div className="flex">
        <H1Main text={LANDING_PAGE_H1} />
      </div>
    </>
  )
}

export default Home
