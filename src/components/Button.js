import React from 'react'


const Button = props => (
  <button {...props} style={{
    background: '#157EFA',
    color: 'white',
    border: '2px solid #042A78',
    borderRadius: '20px',
    minWidth: '202px',
    fontSize: '20px',
    lineHeight: '25px',
    padding: '12px 60px',
  }} />
)

export default Button
