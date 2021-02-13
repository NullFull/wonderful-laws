import React from 'react'
import {useGameState} from 'hooks/game'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import Flow from 'components/layouts/Flow'
import intro from 'assets/intro.png'


const Logo = () => (
  <div>
      <img src={intro} alt="이상한 나라의 강간죄" style={{width: '324px'}} />
  </div>
)

const SplashPage = () => {
    const {actions} = useGameState()

    return (
        <Page>
            <Flow.V>
                <Logo />
                <p>
                    이상한 나라에 오신 것을 환영합니다.
                    당신은 이상한 나라에 오셨습니다. 이제부터 당신은 판사가 되어 강간죄 사건을 살펴보게 될 것입니다.
                </p>
                <Button onClick={() => actions.next()}>시작하기</Button>
            </Flow.V>
        </Page>
    )
}


export default SplashPage
