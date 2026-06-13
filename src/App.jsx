import { useState } from 'react'
import Coverpage from './component/Coverpage'
import Mytask from './pages/Mytask'
import Newtask from './pages/Newtask'
import Editask from './pages/Editask'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
        
        {/* <Mytask/> */}
        {/* <Newtask/> */}
        {/* <Editask/> */}
      <Router>
          <Routes>
              <Route path="/" element={<Coverpage/>} />
              <Route path="/mytask" element={<Mytask/> } />
              <Route path="/newtask" element={<Newtask/> } />
              <Route path="/editask" element={<Editask/> } />
          </Routes>
      </Router>
    </>
  )
}

export default App
