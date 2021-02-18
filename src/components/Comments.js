import React from 'react'
import styled from '@emotion/styled'


const Comment = () => {
    return (
        <div css={{
            textAlign: 'left',
            fontSize: '18px',
            lineHeight: '25px',
            letterSpacing: '-0.05em',
            padding: '0 20px',
        }}>
            <p>냉ㄴ멍ㄴ ㄴㅇ코메넝 ㅔㅁ낸상삭 새아ㅐ각나ㅐ용 내느ㅐㄴ 온 으ㅔㅈ ㅓㅏ니ㅓㅇ ㅣㅓㅣ전ㅇ</p>
            <p>-***</p>
        </div>
    )
}


const Ul = styled.ul({
    borderTop: '1px solid #042A78',
})


const Li = styled.li({
    listStyle: 'none',
    borderBottom: '1px solid #042A78',
})


const Comments = () => {
    return (
        <Ul>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
            <Li>
                <Comment />
            </Li>
        </Ul>
    )
}


export default Comments
