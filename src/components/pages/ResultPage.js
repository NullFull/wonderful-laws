import React from 'react'
import {useRouter} from 'next/router'
import {useGameState} from 'hooks/game'
import Page from 'components/layouts/Page'
import Flow from 'components/layouts/Flow'


const ResultPage = () => {
    const router = useRouter()
    const {state} = useGameState()

    const setChoice = option => {
        // TODO :
        // client.post(`/api/votes?select=${option}`)
        router.push('/result?')
    }

    const total = state.cases.map(c => c.questions.length).reduce((a, b) => a + b)
    const score = state.cases.map(
        c => c.questions.filter(
            q => q.userAnswer === q.realAnswer
        ).length
    ).reduce((a, b) => a + b)

    return (
        <Page>
            <Flow.V>
            {/*<div style={{textAlign: 'center'}}>*/}
            {/*    <h3>일치율</h3>*/}
            {/*    <p>{score} / {total}</p>*/}
            {/*</div>*/}
                <h3>지금 법 이대로 괜찮은가요?</h3>
                <div>
                    <button onClick={() => setChoice(2)}>개정해야해요</button>
                    <button onClick={() => setChoice(1)}>지금도 괜찮네요</button>
                </div>
            </Flow.V>
        </Page>
    )
}


export default ResultPage
