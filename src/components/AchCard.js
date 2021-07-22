import React, { useState } from 'react'
import AchClickable from './AchClickable'
import styled from 'styled-components'


const CardWrapper = styled.div`
  padding-bottom: 1rem ;
  box-shadow: 1rem;
  }
`

export default ({ ach, onEdit }) => {
  const [ expanded, setExpanded ] = useState(false)

  return (
    <CardWrapper>
      <AchClickable
        onKeyPress={e => e.which == 13 && e.preventDefault()}
        onBlur={({ target }) => onEdit(target.getAttribute('field'), target.innerText) + setExpanded(false)}
        onClick={() => setExpanded(true)}
      >
        <h2 field='Name' contentEditable>{ach.Name}</h2>
        <p field='About' contentEditable>{expanded ? ach.About : shorten(ach.About)}</p>
      </AchClickable>
    </CardWrapper>
  )
}

function shorten(text) {

  let i = 37;
  if (text.length > 37) {
    while((text[i] != " " && i > 0)) {
      i --
    }
  }
  return text.slice(0, i)
}
