import React from 'react'
import styled from '@emotion/styled'


const Comment = () => {
    return (
        <div>
            <p>냉ㄴ멍ㄴ ㄴㅇ코메넝 ㅔㅁ낸상삭 새아ㅐ각나ㅐ용 내느ㅐㄴ 온 으ㅔㅈ ㅓㅏ니ㅓㅇ ㅣㅓㅣ전ㅇ</p>
            <p>-작성자</p>
        </div>
    )
}


const Li = styled.li({
    listStyle: 'none',
})


const Comments = () => {
    return (
        <ul>
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
        </ul>
    )
}


export default Comments
