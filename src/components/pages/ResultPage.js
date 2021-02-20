import React from 'react'
import styled from '@emotion/styled'
import {useRouter} from 'next/router'
import {useGameState} from 'hooks/game'
import Page from 'components/layouts/Page'
import Commentary from 'components/Commentary'
import { COLORS } from 'styles'


const Title = styled.h3({
    margin: 0,
    padding: '14px',
    color: 'white',
    fontSize: '24px',
    lineHeight: '33px',
    letterSpacing: '-0.05em',
})


const Votes = styled.div({
    padding: '14px',
    display: 'grid',
    gap: '7px',
    gridTemplateColumns: '1fr 1fr',
})


const Vote = styled.button({
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '25px',
    textAlign: 'center',
    letterSpacing: '-0.05em',
    background: 'white',
    border: '1px solid #157EFA',
    borderRadius: '999px',
    padding: '3px 10px',
    cursor: 'pointer',
    outline: 'none',
})


const Modal = props => {
    const router = useRouter()

    const setChoice = async value => {
        fetch('/api/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value,
            })
        })

        router.push('/result?')
    }

    return (
        <div {...props} css={{
            margin: '0 auto',
            maxWidth: '340px',
            background: '#042A78',
            padding: '12px',
        }}>
            <Title>
                지금 법 이대로
                <br />
                괜찮은가요?
            </Title>
            <Votes>
                <Vote style={{ color: COLORS.pos }} onClick={() => setChoice(1)}>괜찮아요</Vote>
                <Vote style={{ color: COLORS.neg }} onClick={() => setChoice(2)}>개정해야해요</Vote>
            </Votes>
        </div>
    )
}


const ResultPage = () => {
    const {state} = useGameState()

    const total = state.cases.map(c => c.questions.length).reduce((a, b) => a + b)
    const score = state.cases.map(
        c => c.questions.filter(
            q => q.userAnswer === q.realAnswer
        ).length
    ).reduce((a, b) => a + b)

    return (
        <Page>
            {/*<div style={{textAlign: 'center'}}>*/}
            {/*    <h3>일치율</h3>*/}
            {/*    <p>{score} / {total}</p>*/}
            {/*</div>*/}
            <Modal />
            <Commentary />
            <Modal/>
        </Page>
    )
}


export default ResultPage
