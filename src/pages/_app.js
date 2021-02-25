import { Global } from '@emotion/react'
import React from 'react'
import { GameProvider } from 'hooks/game'


const App = ({ Component, pageProps }) => {
    return (
        <GameProvider>
            <Global
                styles={{
                    '*': {
                        boxSizing: 'border-box',
                    },
                    html: {
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
