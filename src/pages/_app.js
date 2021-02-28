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
        </>
    )
}


export default App
