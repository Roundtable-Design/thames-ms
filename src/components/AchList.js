import React, { useState } from 'react'
import AchCard from './AchCard'
import AchClickable from './AchClickable'
import AchFilter from './AchFilter'
import API from '../api'


export default ({ achs, setAchs }) => {
  const [ filter, setFilter ] = useState(null)

  return (
    <>
      <AchFilter setFilter={setFilter} />

      {achs.map((ach, i) =>
        (!filter || ach.Type == filter)  &&
        <AchCard
          ach={ach}
          onEdit={(field, value) => {
            achs[i][field] = value
            setAchs(achs)

            let copy = {...ach}
            delete copy.id
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
    </>
  )
}


function freshAch() {
  return {
    Name: 'Untitled',
    About: 'No description',
    Type: 'Other'
  }
}
