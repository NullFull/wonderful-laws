import React from 'react'
import styled from '@emotion/styled'
import Hr from 'components/Hr'
import Form from 'components/Form'
import Button from 'components/Button'
import Comments from 'components/Comments'
import Screen from 'components/Screen'
import Page from 'components/layouts/Page'
import { COLORS } from 'styles'


const Header = styled.h1({
    margin: 0,
    padding: '26px',
    background: '#042A78',
    color: 'white',
    fontSize: '24px',
    lineHeight: '33px',
    textAlign: 'center',
})


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


const Label = ({ item }) => (
    <li css={{ listStyle: 'none', color: item.color }}>
        <div css={{ fontWeight: 'bold' }}>
            {item.label}
        </div>
        <div css={{ fontWeight: 300 }}>
            ({item.n.toLocaleString()})
        </div>
    </li>
)


const Labels = ({ data }) => (
    <div>
        <ul css={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
        }}>
            {data.map(item => <Label item={item} />)}
        </ul>
    </div>
)


const Result = () => {
    const [formOpened, setFormOpened] = React.useState(false)
    const [votes, setVotes] = React.useState(null)
    const [comments, setComments] = React.useState(null)

    const fetchComments = async () => {
        const response = await fetch('/api/signs')
        const data = await response.json()

        setComments(data)
    }

    const fetchVotes = async () => {
        const response = await fetch('/api/votes')
        const data = await response.json()

        setVotes([
            {
                label: '괜찮아요',
                color: COLORS.pos,
                n: data['1'],
            },
            {
                label: '바꿔야해요',
                color: COLORS.neg,
                n: data['2'],
            },
        ])
    }

    React.useEffect(() => {
        fetchVotes()
        fetchComments()
    }, [])

    return (
        <Screen>
            <Header>
                지금 법 이대로
                <br />
                괜찮은가요?
            </Header>
            <Page css={{
                section: {
                    padding: '20px 0',
                },
                wordBreak: 'keep-all',
            }}>
                <section>
                    {votes &&
                    <>
                        <Labels data={votes} />
                        <RatioBar data={votes} />
                    </>
                    }
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
                            <Form onSubmitted={() => fetchComments()} /> :
                            <Button onClick={() => setFormOpened(true)}>서명하기</Button>
                        }
                    </div>
                </section>

                <section>
                    {comments &&
                    <>
                        <p>지금까지 <strong>{comments.count}명</strong>이 개정 서명에 참여하였습니다</p>
                        <Comments comments={comments.items} />
                    </>
                    }
                </section>
            </Page>
        </Screen>
    )
}


export default Result
