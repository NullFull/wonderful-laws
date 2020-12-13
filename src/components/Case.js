import React, {useState} from 'react'
import {useGameState, CASE_STATES} from 'hooks/game'
import style from './Case.styl'


const Question = ({kase, question}) => {
    const [selected, setSelected] = useState(null)

    const {actions} = useGameState()

    return (
        <div className={style.question}>
            <div>{question.question}</div>
            <div>
                <ul>
                    {question.choices.map((choice, i) => (
                        <li key={`choice-${question.id}-${i}`}>
                            <label>
                                <input
                                    name="choices"
                                    type="radio"
                                    value={i}
                                    onChange={e => setSelected(e.target.value)}
                                />
                                {choice}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.actions}>
                <button onClick={() => {
                    actions.setAnswer(kase.id, question.id, parseInt(selected))
                    actions.next()
                }}>다음</button>
            </div>
        </div>
    )
}


const CaseSummary = ({kase}) => {
    const {actions} = useGameState()

    return (
        <div style={{
            textAlign: 'center'
        }}>
            <table style={{margin: '0 auto'}}>
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
            </table>
            <div>
                <h3>실제 판결문 중</h3>
                {kase.reasons.map(reason => <p>{reason}</p>)}
            </div>

            <button onClick={() => {
                actions.next()
            }}>다음 사건 보기</button>
        </div>
    )
}


const Case = ({kase}) => {
    const {state, selectors} = useGameState()
    const question = selectors.currentQuestion()

    return (
        <div>
            <h2>사건 No. {kase.id}</h2>
            <h3>사건개요</h3>
            <p className={style.summary}>{kase.summary}</p>
            <div>
                {state.state[1] === CASE_STATES.QUESTION && <Question kase={kase} question={question} />}
                {state.state[1] === CASE_STATES.SUMMARY && <CaseSummary kase={kase} />}
            </div>
        </div>
    )
}


export default Case
