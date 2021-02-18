import { Global } from '@emotion/react'
import React from 'react'


const App = ({ Component, pageProps }) => {
    return (
        <>
            <Global
                styles={{
                    '*': {
                        boxSizing: 'border-box',
                    },
                    html: {
                        padding: 0,
                        fontFamily: 'sans-serif',
                    },
                    'body, ul, li': {
                        margin: 0,
                        padding: 0,
                    },
                }}
            />
            <Component {...pageProps} />
        </>
    )
}


export default App
