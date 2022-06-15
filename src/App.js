import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type:type 
    })

    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar title ="FABLAB" />
      <Alert alert={alert}/>
      <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}  />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          {/* <Route exact path="/login" element={<Login />}/> */}
          </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
