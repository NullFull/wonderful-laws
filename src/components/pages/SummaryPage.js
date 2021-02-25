import React from 'react'
import Page from 'components/layouts/Page'
import { useGameState } from 'hooks/game'
import SummaryStep from './steps/SummaryStep'


const SummaryPage = () => {
    const {state, actions, selectors} = useGameState()

    const kase = selectors.currentCase()

    return (
        <Page>
            <h1>사건{kase.id}</h1>
            <SummaryStep kase={kase} />
        </Page>
    )
}

export default SummaryPage
