import React from 'react'
import Page from 'components/layouts/Page'
import Hr from 'components/Hr'
import Button from 'components/Button'
import Choices from 'components/Choices'
import { useGameState } from 'hooks/game'
import { COLORS, STYLES } from 'styles'


const Brief = ({ kase }) => (
    <div>
        <h3>검사의 주장</h3>
        <p>{kase.summary}</p>
    </div>
)

const Question = ({ question }) => {
    const lines = question.split('\n')
    return lines.map(line => <p>{line}</p>)
}

const Quiz = ({ kase, question }) => {
    const {actions} = useGameState()

    return (
        <div>
            <h4>{question.kind}</h4>
            <Question question={question.question} />
            <Choices>
                {question.choices.map((choice, i) => (
                    <Choices.Choice
                        name={`choice-${question.id}`}
                        key={`choice-${question.id}-${i}`}
                        style={{color: COLORS[i % 2 === 0 ? 'pos' : 'neg']}}
                        value={i}
                        onChange={e => {
                            actions.setAnswer(kase.id, question.id, e.target.value)
                        }}
                    >
                        {choice}
                    </Choices.Choice>
                ))}
            </Choices>
        </div>
    )
}

const QuestionStep = ({ kase }) => {
    const {actions} = useGameState()
    const notSelected = kase.questions.some(q => q.userAnswer === null)

    return (
        <div>
            <Brief kase={kase} />
            <Hr />

            {kase.questions.map(question => (
                <div key={question.id}>
                    <Quiz kase={kase} question={question} />
                    <Hr />
                </div>
            ))}

            <Page.Actions>
                <Button full disabled={notSelected} onClick={() => actions.next()}>
                    판결하기
                </Button>
                <Button full style={STYLES.BUTTON.TRANSPARENT} onClick={() => actions.next()}>
                    판결 없이 결과 보기
                </Button>
            </Page.Actions>
        </div>
    )
}


export default QuestionStep
