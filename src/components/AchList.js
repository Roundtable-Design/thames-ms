import React from 'react'
import AchCard from './AchCard'
import AchClickable from './AchClickable'
import styled from 'styled-components'
import API from '../api'

const ListWrapper = styled.div`
  padding-bottom: 1rem;
`

export default ({ achs, setAchs }) => {

  return (
    <ListWrapper>
      {achs.map((ach, i) =>
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
    </ListWrapper>
  )
}


function freshAch() {
  return {
    Name: 'Untitled',
    About: 'No description'
  }
}
