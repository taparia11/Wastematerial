import React from 'react'
import Addnote from './Addnote'

const People = (props) => {
    const {showAlert} = props
  return (
    <Addnote showAlert={showAlert}/>
  )
}

export default People