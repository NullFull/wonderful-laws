import React from 'react'
import styled from '@emotion/styled'

const Container = styled.ul({
  display: 'flex',
  flexDirection: 'row',
  margin: '12px auto',
})

const Pager = ({ current, total }) => {
  return (
    <li>
      <input type='text' value={current} />
      <span>/</span>
      {total}
    </li>
  )
}

const Button = ({ isPrev }) => {
  return (
    <li>
      <button tabIndex={isPrev ? '-1' : '1'}>
        {isPrev ? '&#60' : '&#62'}
      </button>
    </li>
  )
}

const Pagination = ({ current, pageSize, total }) => {
  return (
    <Container>
      <Button isPrev={true} />
      <Pager current={current} total={total} />
      <Button isPrev={false} />
    </Container>
  )
}

export default Pagination