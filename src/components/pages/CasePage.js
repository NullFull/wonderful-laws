import React, {useState} from 'react'
import styled from '@emotion/styled'
import {useGameState, CASE_STATES} from 'hooks/game'
import Page from 'components/layouts/Page'
import Button from 'components/Button'
import Choices from 'components/Choices'


const Actions = styled.div({
    textAlign: 'right',
})


const Ask = styled.h3({})


const Question = ({kase, question}) => {
    const [selected, setSelected] = useState(null)

    const {actions} = useGameState()

    return (
        <div css={{
            [Actions]: {
                padding: '20px 0'
            }
        }}>
            <Ask>{question.question}</Ask>
            <Choices>
                {question.choices.map((choice, i) => (
                    <Choices.Choice key={`choice-${question.id}-${i}`}>
                        <label>
                            <input
                                name="choices"
                                type="radio"
                                value={i}
                                onChange={e => setSelected(e.target.value)}
                            />
                            {choice}
                        </label>
                    </Choices.Choice>
                ))}
            </Choices>
            <Actions>
                <Button onClick={() => {
                    actions.setAnswer(kase.id, question.id, parseInt(selected))
                    actions.next()
                }}>다음</Button>
            </Actions>
        </div>
    )
}


const Table = styled.table({

})

const Summary = ({kase}) => {
    const {actions} = useGameState()

    return (
        <div css={{
            [Table]: {
                margin: '0 auto',
            }
        }}>
            <Table>
                <thead>
                    <tr>
                        <th>나의 선택</th>
                        <th>판결</th>
                    </tr>
                </thead>
                <tbody>
                {kase.questions.map(question => (
                    <tr key={`result-${kase.id}-${question.id}`}>
                        <td>{question.choices[question.userAnswer]}</td>
                        <td>{question.choices[question.realAnswer]}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div>
                <h3>실제 판결문 중</h3>
                {kase.reasons.map(reason => <p>{reason}</p>)}
            </div>
            <Actions>
                <Button onClick={() => {
                    actions.next()
                }}>다음 사건 보기</Button>
            </Actions>
        </div>
    )
}


const CasePage = ({kase}) => {
    const {state, selectors} = useGameState()
    const question = selectors.currentQuestion()

    return (
        <Page>
            <h2>사건 No. {kase.id}</h2>
            <h3>사건개요</h3>
            <p>{kase.summary}</p>
            <>
                {state.state[1] === CASE_STATES.QUESTION && <Question kase={kase} question={question} />}
                {state.state[1] === CASE_STATES.SUMMARY && <Summary kase={kase} />}
            </>
        </Page>
    )
}


export default CasePage
