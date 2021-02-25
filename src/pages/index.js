import React from 'react'
import {GameProvider, useGameState, GAME_STATES} from 'hooks/game'
import Screen from 'components/Screen'
import ListPage from 'components/pages/ListPage'
import CasePage from 'components/pages/CasePage'
import SplashPage from 'components/pages/SplashPage'
import ResultPage from 'components/pages/ResultPage'
import SummaryPage from 'components/pages/SummaryPage'


const Game = () => {
    const {state} = useGameState()

    return (
        <Screen>
            {state.state[0] === GAME_STATES.INIT && <SplashPage />}
            {state.state[0] === GAME_STATES.LIST && <ListPage />}
            {state.state[0] === GAME_STATES.CASE && <CasePage />}
            {state.state[0] === GAME_STATES.SUMMARY && <SummaryPage />}
            {state.state[0] === GAME_STATES.COMPLETED && <ResultPage />}
        </Screen>
    )
}


export default Game

