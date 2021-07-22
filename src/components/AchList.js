import React, { useState } from 'react'
import AchCard from './AchCard'
import AchClickable from './AchClickable'
import AchFilter from './AchFilter'
import API from '../api'
import styled from 'styled-components'

const options = [
  { value: null, label: 'None' },
  { value: 'Competition', label: 'Competition' },
  { value: 'Masterclass', label: 'Masterclass' },
  { value: 'Online course', label: 'Online course' },
  { value: 'Personal project', label: 'Personal project' },
  { value: 'Reading', label: 'Reading' },
  { value: 'Work experience', label: 'Work experience' },
  { value: 'Other', label: 'Other' },
]

const ListWrapper = styled.div`
  padding-bottom: 1rem;
`

export default ({ achs, setAchs }) => {
  const [ filter, setFilter ] = useState(null)

  return (
    <ListWrapper>
      <AchFilter options={options} setFilter={setFilter} />

      {achs.map((ach, i) =>
        (!filter || ach.Type == filter)  &&
        <AchCard
          ach={ach}
          onEdit={(field, value) => {
            achs[i][field] = value
            setAchs(achs)

            let copy = {...ach}
            delete copy.id
            delete copy.student_id
            API.update(`/achievement/${ach.id}`, copy)
          }}
        />
      )}

      <AchClickable onClick={() => {
        achs.push(freshAch())
        setAchs([...achs])
      }}>
        Add achievement
      </AchClickable>
    </ListWrapper>
  )
}


function freshAch() {
  createNew = new object {
    Name: 'Untitled',
    About: 'No description',
    Type: 'Other'
  }
  return {
    API.create(`/achievement`, createNew)
  }
}
