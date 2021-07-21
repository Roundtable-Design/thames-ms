import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AchClickable from '../components/AchClickable'
import AchList from '../components/AchList'
import API from '../api'


let dummy_ach_list = [

  { Name: 'test', About: 'thing' }

]


export default () => {

  const { id } = useParams()
  const [ achs, setAchs ] = useState(null)
  const [ courses, setCourses ] = useState(null)

  useEffect(() => {
    !achs && userData(id, setAchs, setCourses)
  })

  return achs && (
    <>
      <h1>Record of Achievement</h1>
      <AchList achs={achs} setAchs={setAchs} />
    </>
  )
}


async function userData(id, setAchs, setCourses) {

  let achs = (await API.get(`/achievements/${id}`))
    .content.map(({ fields }) => fields)

  let about = achs.map(({ About }) => About).join(' ')
  let courses = await API.update('/recommend', { about })

  setAchs(achs)
  setCourses(courses)
}
