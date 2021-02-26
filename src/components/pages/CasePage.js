import React from 'react'
import styled from '@emotion/styled'
import {useGameState, CASE_STATES} from 'hooks/game'
import ProgressBar from 'components/ProgressBar'
import Page from 'components/layouts/Page'
import QuestionStep from './steps/QuestionStep'
import SummaryStep from './steps/SummaryStep'


const Title = styled.h2({
    fontSize: '36px',
    lineHeight: '45px',
    letterSpacing: '-0.1em',
})


const CasePage = () => {
    const {state, selectors} = useGameState()

    const kase = selectors.currentCase()

    return (
        <Page>
            <ProgressBar kases={state.cases} current={kase} />
            <Title>사건{kase.id}</Title>

            {state.state[1] === CASE_STATES.QUESTION && <QuestionStep kase={kase} />}
            {state.state[1] === CASE_STATES.SUMMARY && <SummaryStep kase={kase} />}
        </Page>
    )
}


export default CasePage
