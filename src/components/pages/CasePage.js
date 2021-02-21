import React from 'react'
import styled from '@emotion/styled'
import {useGameState, CASE_STATES} from 'hooks/game'
import ProgressBar from 'components/ProgressBar'
import Page from 'components/layouts/Page'
import BriefStep from './steps/BriefStep'
import SummaryStep from './steps/SummaryStep'
import QuestionStep from './steps/QuestionStep'


const Title = styled.h2({
    fontSize: '36px',
    lineHeight: '45px',
    letterSpacing: '-0.1em',
})


const CasePage = () => {
    const {state, selectors} = useGameState()

    const kase = selectors.currentCase()
    const question = selectors.currentQuestion()

    return (
        <Page>
            <ProgressBar kases={state.cases} current={kase} />
            <Title>사건{kase.id}</Title>
            {state.state[1] === CASE_STATES.BRIEF && <BriefStep kase={kase} />}
            {state.state[1] === CASE_STATES.QUESTION && <QuestionStep key={question.id} kase={kase} question={question} />}
            {state.state[1] === CASE_STATES.SUMMARY && <SummaryStep kase={kase} />}
        </Page>
    )
}


export default CasePage
