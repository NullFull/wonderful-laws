import React from 'react'
import {useGameState} from 'hooks/game'


const Splash = () => {
    const {actions} = useGameState()

    return (
        <div style={{
            textAlign: 'center',
        }}>
            <div>
                <h1>이상한 나라의 강간죄</h1>
                <h2>당신의 선택과 판결은?</h2>
                <p>
                    당신은 이상한 나라에 오셨습니다. 이제부터 당신은 판사가 되어 강간죄 사건을 살펴보게 될 것입니다.
                </p>
                <button onClick={() => actions.next()}>시작하기</button>
            </div>
        </div>
    )
}


export default Splash
