import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import "./App.css";

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editior from './pages/Editor';

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor/:projectID"  element={isLoggedIn ? <Editior /> : <Navigate to="/login"/>} />
          <Route path="*" element={isLoggedIn ? <NoPage />: <Navigate to="/login"/>} />
        </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
