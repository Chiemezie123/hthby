import React,{useEffect} from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage/LandingPage';
import Main from './components/Main/Main';
import './App.css'
import CallbackHandler from './components/Callback/CallbackHandler';
import Logout from './components/logout/Logout';

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element= {<LandingPage/>}/>
          <Route path='/callback' element={<CallbackHandler/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/logout'element={<Logout/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
