import React, {createContext, useReducer} from 'react'
import produce from 'immer'


const GAME_STATES = {
    INIT: 'i',
    PLAYING: 'p',
    COMPLETED: 'c'
}

const CASE_STATES = {
    BRIEF: 'b',
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
        이OO은 피해자가 생리 중이라는 이유로 성관계 요구를 거부하자 “자위행위만 하겠다”라고 속여
        피해자의 몸에 올라탄 후 피해자를 강간 했습니다.
    `,
    questions: [{
        id: 1,
        kind: '폭행·협박 여부',
        question: `
            이OO은 “자위행위만 하게 해달라”고 부탁해 피해자의 허락을 받았는데, 피해자의 몸에 올라탄 상태에서 갑자기 말을바꿔 성기를 삽입했습니다.
            폭행 또는협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['있었다', '없었다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 2,
        kind: '동의 여부',
        question: `피해자는 이OO과의 성관계에 동의한 것일까요?`,
        choices: ['동의한것이다', '동의한것은 아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 3,
        kind: '판결',
        question: `당신이 판사라면 이 사건을 어떻게 판결 하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `…피해자의 의사에 반하여 피해자를 간음한 사실을 인정할 수 있으나…`,
        `…피해자의 항거를 불가능하게 하거나 현저히 곤란하게 할 정도의 유형력을 행사하였다는 점이 합리적인 의심의 여지가 없이 증명되었다고 보기는 어렵다…`,
    ]
}, {
    id: 2,
    summary: `
        피고인 최OO은 사업가로 피해자의 삼촌입니다. 최OO은 조카인 피해자를 “취업시켜주겠다”라고 사무실로 불러내 강간했습니다.             
    `,
    questions: [{
        id: 4,
        kind: '폭행·협박 여부',
        question: `
            피해자는 삼촌인 최OO이 갑자기 자신의 옷을 벗기자 무섭고 당황스러워서 저항하지 못했다고 진술했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['있었다', '없었다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 6,
        kind: '판결',
        question: `당신이 판사라면 이 사건을 어떻게 판결 하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `…피고인이 피해자의 항거를 불가능하게 하거나 현저히 곤란하게 한 상태에서 맨투맨티나 스키니진을 벗겼다고 보기는 어렵다.…`,
        `…피해자가 객관적으로는 반항하거나 도망갈 수 있는 상황이었는데 주관적으로 더 큰 일이 일어날까봐 무섭게 생각하고 당황스러워 그렇게 못했다…`
    ],
}, {
    id: 3,
    summary: `
        피고인 김OO은 군 장교입니다. 김OO은 고립된 군부대에서 직속부하인 피해자를 강간했습니다.
        사건 당시 피해자는 군부대 내 유일한 여군이었습니다.
    `,
    questions: [{
        id: 7,
        kind: '위력 여부',
        question: `
            군대는 ‘상사가 명령하면 부하는 복종해야 한다’라는 상명하복 문화가 있습니다.
            김OO은 피해자가 저항하기 어려운 권력을 가지고 있었을까요?
        `,
        choices: ['그렇다', '아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 8,
        kind: '폭행·협박 여부',
        question: `
            김OO은 피해자의 몸을 누르고 팔을 잡아 강제로 성관계를 했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['있었다', '없었다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 9,
        kind: '판결',
        question: `당신이 판사라면 이 사건을 어떻게 판결 하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `…상대방의 몸을 누르거나 팔을 잡는 행위는 성관계를 시작하면서 수반되는 일반적인 동작이어서 위와 같은 행위가 있었다는 사정만으로 강간의 수단인 폭행이 인정된다고 단정하기 어렵다…`
    ],
}, {
    id: 4,
    summary: `
        첫 번째 사건에서 피고인 박OO은 피해자를 흉기로 위협하여 강간하고 성관계 영상을 촬영했습니다.
        며칠 뒤 두 번째 사건에서 박OO은 피해자를 만나 또 다시 강간했습니다.
    `,
    questions: [{
        id: 10,
        kind: `첫 번째 사건 폭행·협박 여부`,
        question: `
            첫 번째 사건에서 박OO은 흉기를 들고 피해자에게 성관계를 요구했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['그렇다', '아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 11,
        kind: `첫 번째 사건 판결`,
        question: `당신이 판사라면 첫 번째 사건을 어떻게 판결하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 12,
        kind: `두 번째 사건 폭행·협박 여부`,
        question: `
            두 번째 사건에서 피해자는 직접적인 폭행‧협박은 없었지만, 박OO이 첫 번째 사건에서 촬영한 성관계 영상을 가지고 있고, 며칠 전 흉기로 협박한 기억 때문에 너무 무서웠다고 진술했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['그렇다', '아니다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 14,
        kind: `두 번째 사건 판결`,
        question: `당신이 판사라면 두 번째 사건을 어떻게 판결하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `…협박으로 인한 피해자의 억압된 상태가 며칠 후까지 그대로 지속되었을 것인지 의문이다.…`,
        `…2차 성관계 당시에는 별다른 폭행·협박이 없었다.…`
    ]
}, {
    id: 5,
    summary: `
        첫 번째 사건에서 피고인 정OO은 피해자를 강간하려다가 피해자의 저항으로 실패해 강간미수에 그쳤습니다.
        수십 분 후 두 번째 사건에서 정OO은 자신의 성기를 피해자의 입에 넣어 강제로 구강성교를 했습니다
    `,
    questions: [{
        id: 15,
        kind: `첫 번째 사건 폭행·협박 여부`,
        question: `
            첫 번째 사건에서 정OO은 피해자를 침대에 강제로 눕히고 성관계를 요구했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?`,
        choices: ['그렇다', '아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 16,
        kind: `첫 번째 사건 판결`,
        question: `당신이 판사라면 첫 번째 사건을 어떻게 판결하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 17,
        kind: `두 번째 사건 폭행·협박 여부`,
        question: `
            두 번째 사건에서 정OO은 피해자에게 삽입성교를 하지 않는 대신 구강성교를 해달라고 요구했습니다.
            피해자는 구강성교를 해주지 않으면 강제로 삽입성교를 당할 수도 있다고 생각했습니다.
            폭행 또는 협박이 있었다고 볼 수 있을까요?
        `,
        choices: ['있었다', '없었다'],
        realAnswer: 1,
        userAnswer: null
    }, {
        id: 18,
        kind: `두 번째 사건 동의 여부`,
        question: `
            두 번째 사건에서 피해자는 경찰이 올때까지 시간을 벌어야 한다는 생각으로 정OO의 구강성교 요구에 강하게 저항하지 않았다고 진술했습니다.
            피해자는 정OO과의 구강성교에 동의한 것일까요?
        `,
        choices: ['동의한것이다', '동의한것은 아니다'],
        realAnswer: 0,
        userAnswer: null
    }, {
        id: 19,
        kind: `두 번째 사건 판결`,
        question: `당신이 판사라면 두 번째 사건을 어떻게 판결하겠습니까?`,
        choices: ['유죄', '무죄'],
        realAnswer: 1,
        userAnswer: null
    }],
    reasons: [
        `…구강성교 행위는 피해자가 경찰이 찾아올 때까지 시간을 벌기 위하여 한 것으로서 피고인의 폭행·협박에 의한 것으로 보기 어렵다…`,
    ]
}]


const reducer = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.SET_ANSWER:
            const {caseId, questionId, answer} = action.payload

            const kase = draft.cases.find(c => c.id === caseId)
            const question = kase.questions.find(q => q.id === questionId)
            question.userAnswer = answer
            return

        case ACTIONS.NEXT:
            const currentState = draft.state[0]

            const startBrief = () => draft.state = [GAME_STATES.PLAYING, CASE_STATES.BRIEF]
            const askQuestion = () => draft.state = [GAME_STATES.PLAYING, CASE_STATES.QUESTION]
            const finishGame = () => draft.state = [GAME_STATES.COMPLETED]

            switch (currentState) {
                case GAME_STATES.INIT:
                    startBrief()
                    return
                case GAME_STATES.PLAYING:
                    const subState = draft.state[1]

                    const lastCase = draft.cases.slice(-1)[0]
                    const currentCase = draft.cases[draft.caseIdx]

                    switch (subState) {
                        case CASE_STATES.BRIEF:
                            askQuestion()
                            return
                        case CASE_STATES.QUESTION:
                            const lastQuestion = currentCase.questions.slice(-1)[0]
                            const currentQuestion = currentCase.questions[draft.questionIdx]

                            const isLastQuestion = () => currentQuestion.id === lastQuestion.id
                            const nextQuestion = () => draft.questionIdx += 1
                            const showSummary = () => draft.state[1] = CASE_STATES.SUMMARY

                            isLastQuestion() ? showSummary() : nextQuestion()
                            return
                        case CASE_STATES.SUMMARY:
                            const isLastCase = () => currentCase.id === lastCase.id
                            const nextCase = () => {
                                draft.questionIdx = 0
                                draft.caseIdx += 1
                                startBrief()
                            }

                            isLastCase() ? finishGame() : nextCase()
                            return
                    }
            }
    }
})


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
    const lastCase = () => state.cases.slice(-1)[0]
    const isLastCase = () => lastCase().id === currentCase().id

    return [state, {next, setAnswer}, {currentCase, currentQuestion, isLastCase}]
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
