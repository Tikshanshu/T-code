import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage/>}/>
        </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
