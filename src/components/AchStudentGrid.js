import React, { useState } from 'react'
import styled from 'styled-components'
import AchFilter from './AchFilter'
import API from "../api";


const StudentsWrapper = styled.div`
  display: flex;
`
const StudentsColumn = styled.div`
  min-width: 5rem;
  padding: 2rem;
`

const StudentName = styled.h1`
  font-weight: bold;
`

const AchWrapper = styled.div`
  border: 1px;
  border-radius: 3px;
`

const typeOptions = [
  { value: null, label: 'None' },
  { value: 'Competition', label: 'Competition' },
  { value: 'Masterclass', label: 'Masterclass' },
  { value: 'Online course', label: 'Online course' },
  { value: 'Personal project', label: 'Personal project' },
  { value: 'Reading', label: 'Reading' },
  { value: 'Work experience', label: 'Work experience' },
  { value: 'Other', label: 'Other' },
]

const subjectOptions = [
  { value: null, label: 'None' },
  { value: 'Art', label: 'Art' },
  { value: 'Maths', label: 'Maths' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'English', label: 'English' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Computer Science', label: 'Computer Science'},
  { value: 'History', label: 'History'},
  { value: 'Geography', label: "Geography"},
  { value: 'French', label: 'French'},
  { value: 'Spanish', label: 'Spanish'},
  { value: 'Buisness Studies', label: 'Buisness Studies'},
  { value: 'Sport', label: 'Sport'},
  { value: 'Other', label: 'Other' },
]


export default ({ students }) => {
  const [ typeFilter, setTypeFilter ] = useState(null)
  const [ subjectFilter, setSubjectFilter ] = useState(null)
  const [ achievements, setAchievements ] = useState(null)
  let studentAchievements;
  React.useEffect(() => {
    if(!achievements) {      (async () => {
        setAchievements( await API.get(`all`))
      })();
    }
  });

  return achievements && (
    <StudentsWrapper>
      <AchFilter options={typeOptions} setFilter={setTypeFilter}/>
      <AchFilter options={subjectOptions} setFilter={setSubjectFilter}/>
      { students.content?.map((student, i) =>
        <StudentsColumn href={`./achievements/${student.id}`}>
         <StudentName>{student.Forname} {student.Surname}</StudentName>
          {achievements?.map((achievement, j) =>
            (student.id == achievements.student_id) &&
            (!typeFilter || achievement.Type == typeFilter)  &&
            (!subjectFilter || achievement.Associations == subjectFilter) &&
            <AchWrapper>
              <h2>{achievement.Name}</h2>
              <p>{achievement.Date}</p>
            </AchWrapper>
        )}
        </StudentsColumn>
      )};
    </StudentsWrapper>
  )
}
