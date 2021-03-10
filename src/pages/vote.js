import React from 'react'
import Head from 'next/head'
import Screen from 'components/Screen'
import ResultPage from 'components/pages/ResultPage'


const Vote = () => {
    return (
        <Screen>
          <Head>
            <link rel="preload" href="/api/signs" as="fetch" />
            <link rel="preload" href="/api/votes" as="fetch" />
          </Head>
          <ResultPage />
        </Screen>
    )
}

export default Vote
