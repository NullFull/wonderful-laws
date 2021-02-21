import React from 'react'
import styled from '@emotion/styled'
import {useGameState} from 'hooks/game'
import Button from 'components/Button'
import Page from 'components/layouts/Page'
import intro from 'assets/intro.png'


const Logo = () => (
  <div>
      <img src={intro} alt="이상한 나라의 강간죄" style={{width: '324px'}} />
  </div>
)

const Title = styled.h1({
    fontSize: '24px',
    lineHeight: '30px',
})

const SplashPage = () => {
    const {actions} = useGameState()

    return (
        <Page>
            <Page.Body>
                <Logo />
                <Title>당신의 판단과 선택은?</Title>
                <p>
                    이상한 나라에 오신 것을 환영합니다.
                    <br />
                    이제부터 당신은 판사가 되어
                    <br/>
                    강간죄 사건을 살펴보게 될 것입니다.
                </p>
                <p>
                  당신이 생각하는 가장 정의로운 판결을 내려주세요
                </p>
            </Page.Body>
            <Page.Actions css={{ marginTop: '32px' }}>
                <Button onClick={() => actions.next()}>시작하기</Button>
            </Page.Actions>
        </Page>
    )
}


export default SplashPage
