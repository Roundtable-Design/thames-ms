import React from 'react'
import styled from 'styled-components'
import theme from '../theme'


export default styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  padding: .3rem 1rem;
  > * { outline: none }

  :hover {
    background: ${theme.color.light};
    cursor: pointer;
  }
`
