import React from 'react'
import styled from '@emotion/styled'


const Flow = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})


Flow.V = styled(Flow)({
    flexDirection: 'column',
})


export default Flow
