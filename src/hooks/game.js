import React, {createContext, useReducer} from 'react'


const GAME_STATES = {
    INIT: 'i',
    PLAYING: 'p',
    COMPLETED: 'c'
}

const CASE_STATES = {
    QUESTION: 'q',
    SUMMARY: 's'
}

const ACTIONS = {
    NEXT: 'n',
    SET_ANSWER: 's'
}

const cases = [{
    id: 1,
    summary:`
        피해자는 직속 상관인 장교로 부터 강간 당했다고 진술했다.
        당시 피해자는 해군 함정이라는 고립된 공간의 유일한 여군이었다.
    `,
    questions: [{
        id: 1,
        question: '피고인에게 피해자가 저항하기 곤란한 권력 관계가 있다고 판단하십니까?',
        choices: ['있었다', '없었다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 2,
        question: '사건 당시 피고인은 피해자의 팔을 잡고 몸을 눌렀다. 이를 강간의 수단인 폭행으로 볼 수 있을까?',
        choices: ['폭행이다', '아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 3,
        question: '이 사건이 강간인지 아닌지 당신의 판결은?',
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        '...상대방의 몸을 누르거나 팔을 잡는 행위는 성관계를 시작하면서 수반되는 일반적인 동작이어서 ... 강간의 수단인 폭행이 인정된다고 단정하기 어렵다...',
    ]
}, {
    id: 2,
    summary: `
        피고인은 취업 준비 중인 조카를 '취업 시켜주겠다'고 사무실로 불러내 강간했다.
        피해자는 삼촌인 피고인의 보복이 두렵고 부모님이 상처받을까 봐 수년 동안 신고하지 못했다.             
    `,
    questions: [{
        id: 4,
        question: '피해자는 피고인이 피해자의 스키니진을 어떻게 벗겼는지 구체적으로 설명하지 못했다. 피해자의 진술을 사실로 인정할까?',
        choices: ['인정', '불인정'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 5,
        question: '피해자는 피고인이 스키니진을 벗기는 동안 저항하지 않았다. 이를 동의 여부로 볼 수 있을까?',
        choices: ['동의한것이다', '동의한것은 아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 6,
        question: '이 사건이 강간인지 아닌지 당신의 판결은?',
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `...피고인이 피해자의 항거를 불가능하게 하거나 현저히 곤란하게 한 상태에서 ... 벗겼다고 보기는 어렵다...`,
        `...피해자가 객관적으로는 반항하거나 도망갈 수 있는 상황...`
    ],
}, {
    id: 3,
    summary: `
        피고인은 동거 중인 피해자가 생리 중이라는 이유로 성관계를 거부하자,
        피해자의 몸에 올라탄 상태에서 자위행위만 하겠다고 해 허락을 받은 후,
        기습적으로 성기를 삽입하여 강간했다.
    `,
    questions: [{
        id: 7,
        question: `피고인의 행위는 피해자의 의사에 반하는 것인가?`,
        choices: ['그렇다', '아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 8,
        question: `피고인이 갑자기 성기를 삽입한 것은 항거가 불가능한 유형력으로 볼 수 있을까?`,
        choices: ['그렇다', '아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 9,
        question: '이 사건이 강간인지 아닌지 당신의 판결은?',
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `...피해자의 의사에 반하여 피해자를 간음한 사실을 인정할 수 있으나...`,
        `...피해자의 항거를 불가능하게 하거나 현저히 곤란하게 할 정도의 유형력을 행사하였다 ... 보기는 어렵다...`
    ],
}, {
    id: 4,
    summary: `
        피고인은 피해자를 흉기로 위협하여 1차 강간하고 피해자의 신체를 활영했다.
        며칠 뒤 직접적인 폭행, 협박 없이 피해자를 2차 강간했다. 
    `,
    questions: [{
        id: 10,
        question: `피고인이 흉기로 위협하고 피해자의 신체를 촬영한 것은 며칠 뒤에도 피해자가 저항하지 못할 만한 폭행, 협박일까?`,
        choices: ['그렇다', '아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 11,
        question: `1차 강간에 대한 당신의 판결은?`,
        choices: ['유죄', '무죄'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 12,
        question: '2차 강간에 대한 당신의 판결은?',
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `...협박으로 인한 피해자의 억압된 상태가 며칠 후 까지 그대로 지속되었을 것인지 의문이다...`,
        `...2차 성관계 당시에는 별다른 폭행, 협박이 없었다...`
    ]
}, {
    id: 5,
    summary: `
        피고인은 피해자를 강간하려다가 피해자가 저항하여 실패하자,
        '삽입은 하지 않을테니 구강성교를 해달라'고 재차 요구했다.
        피해자는 그 사이 몰래 경찰에 신고했고 경찰이 올 때 까지 시간을 벌기 위해 강하게 저항하지 않았다.
    `,
    questions: [{
        id: 13,
        question: `'삽입은 하지 않을테니 구강성교를 해달라'고 요구한 것은 협박으로 볼 수 있을까?`,
        choices: ['그렇다', '아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 14,
        question: `경찰이 오는 시간을 벌기 위한 이유로 강하게 저항하지 않았다면 구강성교는 동의한 것으로 볼 수 있을까?`,
        choices: ['동의한것이다', '동의한것은 아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 15,
        question: '이 사건이 강간인지 아닌지 당신의 판결은?',
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `...구강성교 행위는 피해자가 경찰이 찾아올 때까지 시간을 벌기 위하여 한 것으로서 피고인의 폭행, 협박에 의한 것으로 보기 어렵다...`,
    ]
}]


const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_ANSWER:
            const {caseId, questionId, answer} = action.payload

            return {
                ...state,
                cases: state.cases.map(kase => kase.id !== caseId ? kase : {
                    ...kase,
                    questions: kase.questions.map(question => question.id !== questionId ? question : {
                        ...question,
                        userAnswer: answer
                    })
                })
            }

        case ACTIONS.NEXT:
            switch (state.state[0]) {
                case GAME_STATES.INIT:
                    return {
                        ...state,
                        state: [GAME_STATES.PLAYING, CASE_STATES.QUESTION]
                    }
                case GAME_STATES.PLAYING:
                    const lastCase = state.cases.slice(-1)[0]
                    const currentCase = state.cases[state.caseIdx]

                    switch (state.state[1]) {
                        case CASE_STATES.QUESTION:
                            const lastQuestion = currentCase.questions.slice(-1)[0]
                            const currentQuestion = currentCase.questions[state.questionIdx]

                            return currentQuestion.id === lastQuestion.id ? {
                                ...state,
                                state: [state.state[0], CASE_STATES.SUMMARY]
                            } : {
                                ...state,
                                questionIdx: state.questionIdx + 1
                            }
                        case CASE_STATES.SUMMARY:
                            return currentCase.id === lastCase.id ? {
                                ...state,
                                state: [GAME_STATES.COMPLETED]
                            } : {
                                ...state,
                                state: [state.state[0], CASE_STATES.QUESTION],
                                caseIdx: state.caseIdx + 1,
                                questionIdx: 0
                            }
                    }
            }
    }
}


const useGameReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
        state: [GAME_STATES.INIT],
        caseIdx: 0,
        questionIdx: 0,
        cases
    })

    const next = () => dispatch({
        type: ACTIONS.NEXT
    })
    const setAnswer = (caseId, questionId, answer) => dispatch({
        type: ACTIONS.SET_ANSWER,
        payload: {caseId, questionId, answer}
    })

    const currentCase = () => state.cases[state.caseIdx]
    const currentQuestion = () => currentCase().questions[state.questionIdx]

    return [state, {next, setAnswer}, {currentCase, currentQuestion}]
}


const GameContext = createContext(null)

const GameProvider = ({children}) => {
    const [state, actions, selectors] = useGameReducer()

    return (
        <GameContext.Provider value={{state, actions, selectors}}>{children}</GameContext.Provider>
    )
}

const useGameState = () => React.useContext(GameContext)


export {CASE_STATES, GAME_STATES, GameProvider, useGameState}
