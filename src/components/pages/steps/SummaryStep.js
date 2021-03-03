import React from 'react'
import styled from '@emotion/styled'
import Hr from 'components/Hr'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import { useGameState } from 'hooks/game'
import { COLORS } from 'styles'


const Scrollable = styled.div({
    overflow: 'auto',
})

const Table = styled.table({
    borderCollapse: 'collapse',
    border: '2px solid #042A78',
    borderLeftStyle: 'hidden',
    borderRightStyle: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    th: {
        fontWeight: 'normal',
    },
    thead: {
        th: {
            width: '50%',
            border: '2px solid #042A78',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '20px 0 20px',
        },
    },
    tbody: {
        th: {
            borderTop: '1px solid #042A78',
            fontSize: '14px',
            padding: '6px 0',
        },
        td: {
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '0 0 14px',
        }
    }
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
                            <th>
                                내가 생각하는
                                <br />
                                판결
                            </th>
                            <th>
                                이상한 나라의
                                <br />
                                판결
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {kase.questions.map(question => {
                        const colors = [COLORS.pos, COLORS.neg]
                        const realColor = colors[question.realAnswer]
                        const userColor = question.userAnswer === null ? 'inherit' : colors[question.userAnswer]

                        return(
                            <>
                                <tr>
                                    <th colSpan={2}>{question.kind}</th>
                                </tr>
                                <tr key={`result-${kase.id}-${question.id}`} style={{ color: '#969da6' }}>
                                    <td style={{ color: userColor }}>
                                        {question.choices[question.userAnswer] || '선택안함'}
                                    </td>
                                    <td style={{ color: realColor }}>
                                        {question.choices[question.realAnswer] || '판단안함'}
                                    </td>
                                </tr>
                            </>
                    )})}
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
