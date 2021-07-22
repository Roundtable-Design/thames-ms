import React from 'react'
import Select from 'react-select'

export default ({ setFilter, options }) => {

  return (
    <Select options={options} onChange={({ value }) => setFilter(value)} />
  )
}
