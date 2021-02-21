import React from 'react'


const Button = props => (
    <button {...props} css={{
        background: '#157EFA',
        color: 'white',
        border: '2px solid #042A78',
        borderRadius: '20px',
        minWidth: '202px',
        fontSize: '20px',
        lineHeight: '25px',
        padding: '10px 60px',
        cursor: 'pointer',
        outline: 'none',
        opacity: props.disabled ? 0.5 : 1
    }} />
)

export default Button
