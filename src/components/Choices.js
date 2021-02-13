import styled from '@emotion/styled'


const Choice = styled.li({
    listStyle: 'none',
    border: '2px solid black',
    height: '30px',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
})


const Choices = styled.ul({
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: '1fr 1fr',
})


Choices.Choice = Choice


export default Choices
