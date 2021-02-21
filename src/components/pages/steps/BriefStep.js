import React from 'react'
import Hr from 'components/Hr'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import { useGameState } from 'hooks/game'


const BriefStep = ({kase}) => {
    const {actions} = useGameState()

    return (
        <div>
            <h3>검사의 주장</h3>
            <p>{kase.summary}</p>
            <Hr />
            <Page.Actions>
                <Button onClick={() => actions.next()}>다음</Button>
            </Page.Actions>
        </div>
    )
}


export default BriefStep
