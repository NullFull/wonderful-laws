import React from 'react'
import { Global } from '@emotion/react'
import {GameProvider, useGameState, GAME_STATES} from 'hooks/game'
import Screen from 'components/Screen'
import SplashPage from 'components/pages/SplashPage'
import CasePage from 'components/pages/CasePage'
import ResultPage from 'components/pages/ResultPage'


const Game = () => {
    const {state, selectors} = useGameState()

    return (
        <Screen>
            {state.state[0] === GAME_STATES.INIT && <SplashPage />}
            {state.state[0] === GAME_STATES.PLAYING && <CasePage kase={selectors.currentCase()} />}
            {state.state[0] === GAME_STATES.COMPLETED && <ResultPage />}
        </Screen>
    )
}


const Index = () => (
    <GameProvider>
        <Global
            styles={{
                html: {
                    padding: 0,
                    fontFamily: 'sans-serif',
                    boxSizing: 'border-box',
                },
                'body, ul, li': {
                    margin: 0,
                    padding: 0,
                },
            }}
        />
        <Game />
    </GameProvider>
)


export default Index

