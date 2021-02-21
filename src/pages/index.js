import React from 'react'
import {GameProvider, useGameState, GAME_STATES} from 'hooks/game'
import Screen from 'components/Screen'
import CasePage from 'components/pages/CasePage'
import SplashPage from 'components/pages/SplashPage'
import ResultPage from 'components/pages/ResultPage'


const Game = () => {
    const {state} = useGameState()

    return (
        <Screen>
            {state.state[0] === GAME_STATES.INIT && <SplashPage />}
            {state.state[0] === GAME_STATES.PLAYING && <CasePage />}
            {state.state[0] === GAME_STATES.COMPLETED && <ResultPage />}
        </Screen>
    )
}


const Index = () => (
    <GameProvider>
        <Game />
    </GameProvider>
)


export default Index

