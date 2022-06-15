import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About'
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from './Components/Alert';
import People from './Components/People';
import Staff from './Components/Staff'
import { NextUIProvider } from '@nextui-org/react';



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
    <NextUIProvider>
    
    <NoteState>
    <Router>
      <Navbar title ="Waste Collector" />
      <Alert alert={alert}/>
      <Routes>
          <Route exact path="/" element={<People showAlert={showAlert} />} />
          <Route exact path="/home" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/staff" element={<Login showAlert={showAlert}/>}  />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          {/* <Route exact path="/login" element={<Login />}/> */}
          </Routes>
    </Router>
    </NoteState>
    </NextUIProvider>
    </>
  );
}

export default App;
