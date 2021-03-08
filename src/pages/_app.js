import React, { useEffect } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { GoogleFonts } from 'next-google-fonts'
import { GameProvider } from 'hooks/game'
import ogImage from 'assets/og-game.png'


const App = ({ Component, pageProps }) => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.gtag = window.gtag || function() { dataLayer.push(arguments) }
        gtag('js', new Date())
        gtag('config', 'G-VR909W593M')
    }, [])

    return (
        <GameProvider>
            <DefaultSeo
                title="이상한 나라의 강간죄. 당신의 선택과 판결은?"
                description="사건을 살펴보고 정의로운 판결을 내려보세요. "
                canonical="https://wonderful-law.korea.wtf/"
                openGraph={{
                    type: 'website',
                    url: 'https://wonderful-law.korea.wtf/',
                    images: [{
                        url: ogImage,
                        alt: '이상한 나라의 성범죄 사건들. 당신의 판결은?'
                    }]
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-VR909W593M"/>
            </Head>
            <GoogleFonts href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" />
            <Global
                styles={{
                    '*': {
                        boxSizing: 'border-box',
                    },
                    html: {
                        background: '#CBE1F8',
                        padding: 0,
                        fontFamily: 'sans-serif',
                    },
                    'body, ol, ul, li': {
                        margin: 0,
                        padding: 0,
                    },
                    'ol, ul, li': {
                        listStyle: 'none'
                    }
                }}
            />
            <Component {...pageProps} />
        </GameProvider>
    )
}

export default App
