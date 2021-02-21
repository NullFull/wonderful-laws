import React from 'react'
import styled from '@emotion/styled'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import { useGameState } from 'hooks/game'


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


const SummaryStep = ({kase}) => {
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
            <Page.Actions>
                <Button onClick={() => {
                    actions.next()
                }}>다음 사건 보기</Button>
            </Page.Actions>
        </div>
    )
}


export default SummaryStep
