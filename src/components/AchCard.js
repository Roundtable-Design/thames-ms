import React, { useState } from 'react'
import AchClickable from './AchClickable'


export default ({ ach, onEdit }) => {

  return (
    <AchClickable
      onKeyPress={e => e.which == 13 && e.preventDefault()}
      onBlur={({ target }) => onEdit(target.getAttribute('field'), target.innerText)}
    >
      <h2 field='Name' contentEditable>{ach.Name}</h2>
      <p field='About' contentEditable>{ach.About}</p>
    </AchClickable>
  )
}
