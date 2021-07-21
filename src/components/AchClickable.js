import React from 'react'
import styled from 'styled-components'
import theme from '../theme'


export default styled.div`
  border: 3px solid black;
  background: white;
  padding: .3rem 1rem;
  > * { outline: none }

  :hover {
    background: ${theme.color.light};
    cursor: pointer;
  }
`
