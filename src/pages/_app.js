import React from 'react'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { GameProvider } from 'hooks/game'
import ogImage from 'assets/og-game.png'


const App = ({ Component, pageProps }) => {
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
