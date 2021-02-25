import React, {useState} from 'react'
import Page from 'components/layouts/Page'
import Hr from 'components/Hr'
import Button from 'components/Button'
import Choices from 'components/Choices'
import { useGameState } from 'hooks/game'
import { COLORS } from 'styles'


const QuestionStep = ({kase, question}) => {
    // const {actions} = useGameState()
    const [selected, setSelected] = useState(null)

    return (
        <div>
            <h4>{question.kind}</h4>
            <p>{question.question}</p>
            <Choices>
                {question.choices.map((choice, i) => (
                    <Choices.Choice
                        key={`choice-${question.id}-${i}`}
                        name={`choices-${question.id}`}
                        style={{color: COLORS[i % 2 === 0 ? 'pos' : 'neg']}}
                        value={i}
                        onChange={e => setSelected(e.target.value)}
                    >
                        {choice}
                    </Choices.Choice>
                ))}
            </Choices>
            <Hr />
            {/*<Page.Actions>*/}
            {/*    <Button*/}
            {/*        disabled={!selected}*/}
            {/*        onClick={() => {*/}
            {/*            actions.setAnswer(kase.id, question.id, parseInt(selected))*/}
            {/*            actions.next()*/}
            {/*        }}>다음</Button>*/}
            {/*</Page.Actions>*/}
        </div>
    )
}


export default QuestionStep
