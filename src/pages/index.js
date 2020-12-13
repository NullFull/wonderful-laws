import React from 'react'
import {GameProvider, useGameState, GAME_STATES} from 'hooks/game'
import Splash from 'components/Splash'
import Case from 'components/Case'
import Result from 'components/Result'
import style from './index.module.styl'


const Game = () => {
    const {state, selectors} = useGameState()

    return (
        <div className={style.app}>
            {state.state[0] === GAME_STATES.INIT && <Splash />}
            {state.state[0] === GAME_STATES.PLAYING && <Case kase={selectors.currentCase()} />}
            {state.state[0] === GAME_STATES.COMPLETED && <Result />}
        </div>
    )
}

export default function Index() {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    )
}
