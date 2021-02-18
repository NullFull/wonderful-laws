import React from 'react'
import styled from '@emotion/styled'
import Hr from 'components/Hr'
import Form from 'components/Form'
import Button from 'components/Button'
import Comments from 'components/Comments'
import Screen from 'components/Screen'
import Page from 'components/layouts/Page'
import { COLORS } from '../styles'


const RatioBar = ({ data }) => {
    const total = data.reduce((a, b) => a.n + b.n)

    return (
        <div css={{
            height: '20px',
            display: 'flex',
        }}>
            {data.map((number, i) => (
                <div
                    key={number.label}
                    style={{
                        width: `${number.n / total * 100}%`,
                        height: '100%',
                        background: number.color,
                    }}
                />
            ))}
        </div>
    )
}


const Result = () => {
    const [formOpened, setFormOpened] = React.useState(false)
    const [stats, setStats] = React.useState([{
        label: '괜찮아요',
        n: 321,
    }, {
        label: '바꿔야해요',
        n: 2123,
    }])
    stats.forEach((item, i) => item.color = COLORS[i % 2 === 0 ? 'pos' : 'neg'])

    // TODO : 실제 데이터 반영
    return (
        <Screen>
            <Page css={{
                section: {
                    padding: '20px 0',
                },
                wordBreak: 'keep-all',
            }}>
                <section>
                    <h3>
                        지금의 강간법
                        <br />
                        이대로 괜찮은가요?
                    </h3>
                    <div>
                        <ul css={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            li: {
                                listStyle: 'none',
                            }
                        }}>
                            {stats.map(item => (
                                <li key={item.label} style={{ color: item.color }}>
                                    <div style={{ fontWeight: 'bold' }}>
                                        {item.label}
                                    </div>
                                    <div style={{ fontWeight: 300 }}>
                                        ({item.n.toLocaleString()})
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <RatioBar data={stats} />
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
                    <Hr />
                    <h3 style={{ fontWeight: 'normal' }}>
                        우리의 참여로 <strong>강간죄</strong>를
                        <br />
                        고칠 수 있습니다
                    </h3>
                    <Hr />
                    <p>
                        <strong>
                            법개정을 위해서는 많은 사람들의 관심이 필요합니다.
                            당신의 소중한 참여를 기다립니다.
                        </strong>
                    </p>
                    <div>
                        {formOpened ?
                            <Form/> :
                            <Button onClick={() => setFormOpened(true)}>서명하기</Button>
                        }
                    </div>
                </section>

                <section>
                    <p>지금까지 <strong>ㅇㅇ명</strong>이 개정 서명에 참여하였습니다</p>
                    <Comments />
                </section>
            </Page>
        </Screen>
    )
}


export default Result
