import React from 'react'
import styled from '@emotion/styled'


const Comment = ({ comment} ) => {
    return (
        <div css={{
            textAlign: 'left',
            fontSize: '18px',
            lineHeight: '25px',
            letterSpacing: '-0.05em',
            padding: '0 20px',
        }}
            key={comment.id}
        >
            <p>{comment.comment}</p>
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


const Comments = ({ comments }) => {
    return (
        <Ul>
            {comments.map(comment => (
                <Li key={comment.id}>
                    <Comment comment={comment} />
                </Li>
            ))}
        </Ul>
    )
}


export default Comments
