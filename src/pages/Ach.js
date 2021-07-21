import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AchClickable from '../components/AchClickable'
import AchList from '../components/AchList'


let dummy_ach_list = [

  { Name: 'test', About: 'thing' }

]

export default () => {
  const { id } = useParams()
  const [ achs, setAchs ] = useState(null)

  // replace with with a request to the api later

  !achs && setAchs(dummy_ach_list)

  return achs && (
    <>
      <h1>Record of Achievement</h1>
      <AchList achs={achs} setAchs={setAchs} />
    </>
  )
}
