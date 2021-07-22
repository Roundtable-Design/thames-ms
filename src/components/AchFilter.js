import React from 'react'
import Select from 'react-select'

export default ({ setFilter, options }) => {
  console.log("AchFilter")
  return (
    <Select options={options} onChange={({ value }) => setFilter(value)} />
  )
}
