import React from 'react'
import styled from '@emotion/styled'
import Hr from 'components/Hr'
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
        fontSize: '14px',
        padding: '10px 15px',
        border: '1px solid black',
    },
})

const Reasons = styled.div({
    padding: '20px',
    p: {
        textAlign: 'left',
        marginBottom: '8px',
    }
})

const Comment = styled.div({
    textAlign: 'left',
    border: '2px solid #042A78',
    background: 'white',
    padding: '0 20px',
})

const LinkTo = styled.a({
    margin: '16px 0'
})


const SummaryStep = ({kase}) => {
    const {actions, selectors} = useGameState()

    const nextLabel = selectors.isLastCase() ? '결과보기' : '다음 사건 보기'

    return (
        <div css={{
            [Table]: { margin: '0 auto' }
        }}>
            <Scrollable>
                <Table>
                    <thead>
                    <tr>
                        <th/>
                        <th>내가 생각하는 판결</th>
                        <th>이상한 나라의 판결</th>
                    </tr>
                    </thead>
                    <tbody>
                    {kase.questions.map(question => (
                        <tr key={`result-${kase.id}-${question.id}`}>
                            <th>{question.kind}</th>
                            <td>{question.choices[question.userAnswer]}</td>
                            <td>{question.choices[question.realAnswer]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Scrollable>
            <Reasons>
                <h3>이상한 나라의 실제 판결문 중</h3>
                {kase.reasons.map(reason => <p>{reason}</p>)}
            </Reasons>
            <Comment>
                <p>{kase.comment}</p>
            </Comment>
            <Hr />
            <Page.Actions>
                <Button onClick={() => actions.next()}>
                    {nextLabel}
                </Button>
            </Page.Actions>
            <Page.Actions>
                <LinkTo target="_blank" href="/result">뭔가 이상하게 느껴진다면?</LinkTo>
            </Page.Actions>
        </div>
    )
}


export default SummaryStep
