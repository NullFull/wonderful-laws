import React from 'react'
import {GameProvider, useGameState, GAME_STATES} from 'hooks/game'
import Screen from 'components/Screen'
import SplashPage from 'components/pages/SplashPage'
import CasePage from 'components/pages/CasePage'
import ResultPage from 'components/pages/ResultPage'
import Page from 'components/layouts/Page'
import ProgressBar from 'components/ProgressBar'


const Game = () => {
    const {state, selectors} = useGameState()
    const currentCase = selectors.currentCase()

    return (
        <Screen>
            {state.state[0] === GAME_STATES.INIT && <SplashPage />}
            {state.state[0] === GAME_STATES.PLAYING && (
                <Page>
                    <ProgressBar kases={state.cases} current={currentCase}/>
                    <CasePage kase={currentCase} />
                </Page>
            )}
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

