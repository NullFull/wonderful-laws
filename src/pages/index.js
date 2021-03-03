import React from 'react'
import {useGameState, GAME_STATES} from 'hooks/game'
import Screen from 'components/Screen'
import CasePage from 'components/pages/CasePage'
import SplashPage from 'components/pages/SplashPage'


const Game = () => {
    const {state} = useGameState()

    return (
        <Screen>
            {state.state[0] === GAME_STATES.INIT && <SplashPage />}
            {state.state[0] === GAME_STATES.PLAYING && <CasePage />}
        </Screen>
    )
}

export default Game
