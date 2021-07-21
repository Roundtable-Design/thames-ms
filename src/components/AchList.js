import React from 'react'
import AchCard from './AchCard'
import AchClickable from './AchClickable'
import styled from 'styled-components'

export default ({ achs, setAchs }) => {

  return (
    <>
      {achs.map((ach, i) =>
        <>
          <AchCard
            ach={ach}
            onEdit={(field, value) => {
              achs[i][field] = value
              setAchs(achs)
            }}
            />
        </>
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
    About: 'No description'
  }
}
