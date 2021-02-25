import React from 'react'
import styled from '@emotion/styled'
import Hr from 'components/Hr'
import Page from 'components/layouts/Page'
import { useGameState } from 'hooks/game'


const Case = styled.button({
    border: '2px solid black',
    borderRadius: '5px',
    marginBottom: '20px',
    padding: '10px',
    cursor: 'pointer',
    background: 'transparent',
    fontSize: '16px',
})


const ListPage = () => {
    const {state, actions} = useGameState()

    return (
        <Page>
            <h1>사건 목록</h1>
            <p>사건을 선택하여 판결을 내려주세요</p>
            <Hr />
            <ul>
                {state.cases.map((kase, i) => (
                    <li key={kase.id}>
                        <Case onClick={() => actions.showCase(kase.id)}>
                            <h3>사건 {i + 1}</h3>
                            <p>{kase.summary}</p>
                        </Case>
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default ListPage
