import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  margin: '12px auto',
})

const Pager = ({ current, setCurrent, total }) => {
  return (
    <div>
      <input type='text' value={current} onChange={({e}) => setCurrent(e.target.value)} />
      <span>/</span>
      {total}
    </div>
  )
}

const PageButton = ({ isPrev, onClick, disabled }) => {
  return (
      <button disabled={disabled} tabIndex={isPrev ? '-1' : '1'} onClick={onClick}>
        {isPrev ? "<" : ">"}
      </button>
  )
}

const Pagination = ({ current, setCurrent, pageSize, total }) => {
  return (
    <Container>
      <PageButton isPrev={true} onClick={() => setCurrent(current - 1)} disabled={current === 1} />
      <Pager current={current} setCurrent={setCurrent} total={Math.ceil(total / pageSize)} />
      <PageButton isPrev={false} onClick={() => setCurrent(current + 1)} disabled={current === Math.ceil(total / pageSize)} />
    </Container>
  )
}

export default Pagination