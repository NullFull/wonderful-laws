import React from 'react'
import styled from '@emotion/styled'
import Form from 'components/Form'
import Button from 'components/Button'
import Comments from 'components/Comments'
import Screen from 'components/Screen'
import Page from 'components/layouts/Page'


const Share = styled.div({
    textAlign: 'center',
})

const Commentary = styled.p({})

const Sign = styled.div({
    textAlign: 'center',
})


const Stats = styled.div({

})


const Bar = ({ width }) => (
    <div css={{
        width: width,
        height: '100%',
        background: 'gray'
    }}/>
)

const RatioBar = ({ ratio }) => {
    return (
        <div css={{
            border: '1px solid gray',
            height: '20px',
        }}>
            <div css={{
                width: `${ratio * 100}%`,
                height: '100%',
                background: 'gray',
            }} />
        </div>
    )
}

const Result = () => {
    const [formOpened, setFormOpened] = React.useState(false)

    const submit = () => {

    }

    // TODO : 실제 데이터 반영
    return (
        <Screen>
            <Page css={{
                section: {
                    padding: '20px',
                    '> h3': {
                        textAlign: 'center',
                    }
                },
            }}>
                <section>
                    <h3>지금의 강간법 이대로 괜찮은가요?</h3>
                    <div>
                        <RatioBar ratio={2000 / 2500} />
                        <ul css={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            li: {
                                listStyle: 'none',
                            }
                        }}>
                            <li>개정해야해요 (2,000)</li>
                            <li>지금도 괜찮아요 (500)</li>
                        </ul>
                    </div>
                </section>

                {/*<section>*/}
                {/*    <Share>*/}
                {/*        <Button>공유하기</Button>*/}
                {/*        <div style={{textAlign: 'center'}}>*/}
                {/*            <h3>공유하기</h3>*/}
                {/*            <div>*/}
                {/*                <input value="https://assdaadsads주소주소" />*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <button>Facebook</button>*/}
                {/*                <button>Twitter</button>*/}
                {/*                <button>Kakao</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </Share>*/}
                {/*</section>*/}

                <section>
                    <Commentary>강간죄 개정의 필요성에 대해서 더 자세히 알고 싶은 분들은 <a href="asd">제작자 커멘터리</a>를 봐주세요.</Commentary>
                </section>

                <section>
                    <h3>우리의 참여로 강간죄를 고칠 수 있습니다</h3>
                    <Sign>
                        <p>
                            법개정을 위해서는 많은 사람들의 관심이 필요합니다.
                            <br />
                            당신의 소중한 참여를 기다립니다.
                        </p>

                        {!formOpened && <Button onClick={() => setFormOpened(true)}>서명하기</Button>}

                        <p>지금까지 ㅇㅇ명이 개정 서명에 참여하였습니다</p>

                        {formOpened && <Form />}
                    </Sign>
                </section>

                <Comments />
            </Page>
        </Screen>
    )
}


export default Result
