import React from 'react'
import styled from '@emotion/styled'


const Page = styled.div({
    margin: '0 auto',
    padding: '20px',
    maxWidth: '414px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#042A78',
})

Page.Body = styled.div({

})

Page.Actions = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 0',
    '*': {
        flexGrow: 0,
        marginBottom: '8px',
    }
})

export default Page
