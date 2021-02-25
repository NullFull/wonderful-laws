import React from 'react'
import styled from '@emotion/styled'
import {useGameState} from 'hooks/game'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import BriefStep from './steps/BriefStep'
import QuestionStep from './steps/QuestionStep'


const Title = styled.h2({
    fontSize: '36px',
    lineHeight: '45px',
    letterSpacing: '-0.1em',
})


const CasePage = () => {
    const {state, actions, selectors} = useGameState()

    const kase = selectors.currentCase()

    return (
        <Page>
            <Title>사건{kase.id}</Title>

            <BriefStep kase={kase} />
            {kase.questions.map(q => (
                <QuestionStep key={q.id} kase={kase} question={q} />
            ))}

            <Page.Actions>
                <Button style={{width: '100%'}} onClick={() => actions.showSummary(kase.id)}>
                    판결 하기
                </Button>
            </Page.Actions>
            <Page.Actions>
                <Button style={{width: '100%', background: 'none', color: 'black'}} onClick={() => actions.showSummary(kase.id)}>
                    판결 없이 결과 보기
                </Button>
                <Button style={{width: '100%', background: 'none', color: 'black'}} onClick={() => actions.showList()}>
                    다른 사건 보기
                </Button>
            </Page.Actions>
        </Page>
    )
}


export default CasePage
