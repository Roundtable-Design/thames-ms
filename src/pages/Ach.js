import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AchClickable from '../components/AchClickable'
import AchList from '../component/AchList'


let dummy_ach_list = [

  { Name: 'test', About: 'thing' }

]

export default () => {
  const { id } = useParams()
  const [ achs, setAchs ] = useState()

  // replace with with a request to the api later

  setAchs(dummy_ach_list)

  return (
    <>
      <h1>Record of Achievement</h1>
      <AchList achs={achs} setAchs={setAchs} />
    </>
  )
}
