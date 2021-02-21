import React, {useState,useEffect} from 'react'
import styled from '@emotion/styled'
import {useGameState, CASE_STATES} from 'hooks/game'
import Hr from 'components/Hr'
import Button from 'components/Button'
import Choices from 'components/Choices'
import { COLORS } from 'styles'


const Actions = styled.div({
    margin: '16px 0',
    padding: '16px 0',
})


const Question = ({kase, question}) => {
    const [selected, setSelected] = useState(null)
    const {actions} = useGameState()

    useEffect(() => {
        setSelected(null)
    }, [question.id])

    return (
        <div>
            <h3>{question.question}</h3>
            <Choices>
                {question.choices.map((choice, i) => (
                    <Choices.Choice
                        key={`choice-${question.id}-${i}`}
                        style={{color: COLORS[i % 2 ===0 ? 'pos' : 'neg']}}
                        value={i}
                        onChange={e => setSelected(e.target.value)}
                    >
                        {choice}
                    </Choices.Choice>
                ))}
            </Choices>
            <Hr />
            <Actions>
                <Button
                    disabled={!selected}
                    onClick={() => {
                        actions.setAnswer(kase.id, question.id, parseInt(selected))
                        actions.next()
                }}>다음</Button>
            </Actions>
        </div>
    )
}


const Scrollable = styled.div({
    overflow: 'auto',
})


const Table = styled.table({
    borderCollapse: 'collapse',
    borderLeftStyle: 'hidden',
    borderRightStyle: 'hidden',
    whiteSpace: 'nowrap',
    th: {
        fontWeight: 'normal',
    },
    'th, td': {
        padding: '10px 15px',
        border: '1px solid black',
    },
})


const Summary = ({kase}) => {
    const {actions} = useGameState()

    return (
        <div css={{
            [Table]: {
                margin: '0 auto',
            }
        }}>
            <Scrollable>
                <Table>
                    <thead>
                        <tr>
                            <th/>
                            <th>나의 판결</th>
                            <th>실제 판결</th>
                        </tr>
                    </thead>
                    <tbody>
                    {kase.questions.map(question => (
                        <tr key={`result-${kase.id}-${question.id}`}>
                            <th>ghj</th>
                            <td>{question.choices[question.userAnswer]}</td>
                            <td>{question.choices[question.realAnswer]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Scrollable>
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
        <>
            <h2 style={{
                fontSize: '36px',
                lineHeight: '45px',
                letterSpacing: '-0.1em',
            }}>사건{kase.id}</h2>
            <h3>검사의 주장</h3>
            <p>{kase.summary}</p>
            <>
                {state.state[1] === CASE_STATES.QUESTION && <Question kase={kase} question={question} />}
                {state.state[1] === CASE_STATES.SUMMARY && <Summary kase={kase} />}
            </>
        </>
    )
}


export default CasePage
