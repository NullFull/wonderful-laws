import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div({
  textAlign: 'center',
  marginBottom: '20px'
})

const Ul = styled.ul({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '12px auto',
})

const Li = styled.li({
  height: '24px',
  marginRight: '8px',
  fontSize: '14px'
})

const Input = styled.input({
  height: '100%',
  padding: '0 4px',
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

const Pager = ({ current, setCurrent, pageCount }) => {
  return (
    <Li title={`${current}/${pageCount}`}>
      <Input size='2' type='text' value={current} onChange={(e) => setCurrent(e.target.value)} />
      <span style={{margin: '0 10px 0 5px'}}>/</span>
      <span>{pageCount}</span>
    </Li>
  )
}

const PageButton = ({ isPrev, onClick, disabled }) => {
  return (
    <Button disabled={disabled} tabIndex={isPrev ? '-1' : '1'} onClick={onClick}>
      {isPrev ? "<" : ">"}
    </Button>
  )
}

const Pagination = ({ current, setCurrent, pageSize, total }) => {
  const pageCount = Math.ceil(total / pageSize)

  const prev = () => setCurrent(current - 1)
  const next = () => setCurrent(current + 1)

  return (
    <Container>
      <Ul>
        <Li>
          <PageButton isPrev={true} onClick={prev} disabled={current === 1} />
        </Li>
        <Pager current={current} setCurrent={setCurrent} pageCount={pageCount} />
        <Li>
          <PageButton isPrev={false} onClick={next} disabled={current === pageCount} />
        </Li>
      </Ul>
    </Container>
  )
}

export default Pagination