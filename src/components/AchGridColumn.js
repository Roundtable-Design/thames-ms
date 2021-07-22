import React, { useState } from 'react'
import styled from 'styled-components'


const StudentWrapper = styled.div`
  display: flex;
`
const StudentsColumn = styled.div`
  min-width: 5rem;
  max-widthL: 10rem;
`

export default  ({ students }) => {
  return (
    <StudentsWrapper>
      {Students.map((student, i) =>
        <StudentsColumn>
         <h1>{student.Name}</h1>
         {student.Achievements.map((achievement, j) =>
           <h2>{achievement.Name}</h2>
           <p>{achievement.Date}</p>
         )}
        </StudentsColumn>
      )}
    <StudentsWrapper/>
  )
}
