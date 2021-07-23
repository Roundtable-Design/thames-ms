import API from '../api.js'
import StudentGrid from '../components/AchStudentGrid'
import React, { useState } from 'react'


export default () => {
  const [ students, setStudents ] = useState(false)

  React.useEffect(() => {
    if(!students) {
      (async () => {
        setStudents( await API.get('./students'))
      })();
    }
  });

  return students ? (
    <StudentGrid students={students}/>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
