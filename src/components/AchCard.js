import React, { useState } from 'react'
import AchClickable from './AchClickable'
import styled from 'styled-components'

const CardWrapper = styled.div`
  padding-bottom: 1rem ;
  box-shadow: 1rem;
  }
`

export default ({ ach, onEdit }) => {

  return (
    <CardWrapper>
      <AchClickable
        onKeyPress={e => e.which == 13 && e.preventDefault()}
        onBlur={({ target }) => onEdit(target.getAttribute('field'), target.innerText)}
      >
        <h2 field='Name' contentEditable>{ach.Name}</h2>
        <p field='About' contentEditable>{ach.About}</p>
      </AchClickable>
    </CardWrapper>
  )
}
