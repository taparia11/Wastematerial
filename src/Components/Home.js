import React from 'react'
import { Notes } from './Notes'


function Home(props) {
  const {showAlert} = props
 
  return (
    <div>
      <h1>This is Home</h1>
     
      <Notes  showAlert={showAlert}/>
    </div>
    
  )
}

export default Home