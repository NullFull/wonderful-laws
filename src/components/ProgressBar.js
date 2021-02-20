import React from 'react'
import styled from '@emotion/styled'

const Bar = styled.div({
    height: '5px',
    backgroundColor: 'rgba(0,0,0,0.14)',
    position: 'relative',
})

const Progression = styled.div({
    position: 'absolute',
    transition: 'width 0.5s ease',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#0d00a1'
})

const Ol = styled.ol({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
})

const Li = styled.li({
    position: 'absolute',
    left: 0,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    transform: 'translateX(-50%)'
})

const Circle = styled.div(props => ({
    width: '26px',
    height: '26px',
    padding: '10px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.fill ? '#ffffb1' : '#fff',
    color: props.fill ? '#0d00a1' : '#aaa',
    border: `1px solid ${props.fill ? '#0d00a1' : '#aaa'}`,
    fontSize: '13px'
}))

const ProgressBar = ({kases, current}) => {
    const stepWidth = 100 / (kases.length - 1);
    return (
        <Bar>
            <Progression css={{
                width: `${(current.id-1)*stepWidth}%`
            }}/>
            <Ol>
                {kases.map((step,i) => (
                    <Li
                        key={i}
                        css={{
                            left: `${i*stepWidth}%`,
                        }}
                    >
                        <Circle fill={step.id<=current.id}>{step.id}</Circle>
                    </Li>
                ))}
            </Ol>
        </Bar>
    )
}


export default ProgressBar
