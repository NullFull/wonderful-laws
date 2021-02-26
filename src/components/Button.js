import React from 'react'
import { STYLES } from 'styles'


const Button = ({ full=false, style=STYLES.BUTTON.PRIMARY, ...props }) => (
    <button {...props} css={{
        ...style,
        borderRadius: '20px',
        minWidth: '202px',
        fontSize: '20px',
        lineHeight: '25px',
        padding: '10px 60px',
        cursor: 'pointer',
        outline: 'none',
        width: full ? '100%' : 'initial',
        opacity: props.disabled ? 0.5 : 1
    }} />
)

export default Button
