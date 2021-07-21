import React from 'react'
import Select from 'react-select'

const options = [
  { value: null, label: 'None' },
  { value: 'Competition', label: 'Competition' },
  { value: 'Masterclass', label: 'Masterclass' },
  { value: 'Online course', label: 'Online course' },
  { value: 'Personal project', label: 'Personal project' },
  { value: 'Reading', label: 'Reading' },
  { value: 'Work experience', label: 'Work experience' },
  { value: 'Other', label: 'Other' },
]


export default ({ setFilter }) => {

  return (
    <Select options={options} onChange={({ value }) => setFilter(value)} />
  )
}
