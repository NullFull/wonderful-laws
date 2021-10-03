import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div({
  textAlign: 'center'
})

const Ul = styled.ul({
  display: 'inline-block',
  margin: '12px auto',
})

const Li = styled.li({
  float: 'left',
  height: '24px',
  marginRight: '8px',
  fontSize: '14px'
})

const Input = styled.input({
  height: '100%',
  padding: '0 6px',
  border: '1px solid #d9d9d9',
  borderRadius: '2px',
  textAlign: 'center',
  transition: 'border-color .3s',
})

const Button = styled.button({
  display: 'block',
  height: '100%',
  backgroundColor: 'transparent',
  border: '0',
})

const Pager = ({ current, setCurrent, total }) => {
  return (
    <Li title={`${current}/${total}`}>
      <Input size='3' type='text' value={current} onChange={({e}) => setCurrent(e.target.value)} />
      <span style={{margin: '0 10px 0 5px'}}>/</span>
      {total}
    </Li>
  )
}

const PageButton = ({ isPrev, onClick, disabled }) => {
  return (
    <Li>
      <Button disabled={disabled} tabIndex={isPrev ? '-1' : '1'} onClick={onClick}>
        {isPrev ? "<" : ">"}
      </Button>
    </Li>
  )
}

const Pagination = ({ current, setCurrent, pageSize, total }) => {
  return (
    <Container>
      <Ul>
        <PageButton isPrev={true} onClick={() => setCurrent(current - 1)} disabled={current === 1} />
        <Pager current={current} setCurrent={setCurrent} total={Math.ceil(total / pageSize)} />
        <PageButton isPrev={false} onClick={() => setCurrent(current + 1)} disabled={current === Math.ceil(total / pageSize)} />
      </Ul>
    </Container>
  )
}

export default Pagination