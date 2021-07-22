import React, { useState } from 'react'
import styled from 'styled-components'


const StudentWrapper = styled.div`
  display: flex;
`
const StudentsColumn = styled.div`
  min-width: 5rem;
  max-widthL: 10rem;
`

const StudentName = styled.h1`
  font-weight: bold;
`

const AchWrapper = styled.div`
  border: 1px;
  border-radius: 3px;
`

export default ({ students }) => {
  return (
    <StudentsWrapper>
      {Students.map((student, i) =>
        <StudentsColumn href = './achievements/${student.id}'>
         <StudentName>{student.Name}</StudentName>
         {student.Achievements.map((achievement, j) =>
          <AchWrapper>
            <h2 href = >{achievement.Name}</h2>
            <p>{achievement.Date}</p>
          </AchWrapper>
         )}
        </StudentsColumn>
      )}
    <StudentsWrapper/>
  )
}
