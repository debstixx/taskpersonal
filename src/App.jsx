import { useState } from 'react'
import Coverpage from './component/Coverpage'
import Mytask from './pages/Mytask'
import Newtask from './pages/Newtask'
import Editask from './pages/Editask'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Trash from './pages/Trash'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './component/ProtectedRoute'


function App() {

  return (
    <>
        
        {/* <Mytask/> */}
        {/* <Newtask/> */}
        {/* <Editask/> */}
        {/* <Profile/> */}
        {/* <Trash/> */}
      <Router>
          <Routes>
            {/*Public Routes */}
                <Route path="/" element={<Coverpage/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/register" element={<Register/>}/>

            {/*Protected Routes - All wrapped inside */}
                <Route path="/mytask" element={<ProtectedRoute><Mytask/></ProtectedRoute>}/>
                <Route path="/newtask" element={<ProtectedRoute><Newtask/></ProtectedRoute>}/>
                <Route path="/editask/:taskId" element={<ProtectedRoute><Editask/></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="/trash" element={<ProtectedRoute><Trash/></ProtectedRoute>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
