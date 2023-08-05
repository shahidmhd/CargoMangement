import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Company from './Pages/Company';
import Service from './Pages/Service';
import Invoice from './Pages/Invoice';
import Login from './Login/Login';
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import Print from './Pages/Print';
import Invoicetable from './Pages/Invoicetable';

function App() {

  const token = localStorage.getItem('token')
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={token ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/invoice'
            element={token ? <Invoice /> : <Navigate to='/login' />}
          />
          <Route
            path='/company'
            element={token ? <Company /> : <Navigate to='/login' />}
          />
          <Route
            path='/Service'
            element={token ? <Service /> : <Navigate to='/login' />}
          />
          <Route
            path='/print/:id'
            element={<Print/>}
          />
           <Route
            path='/table'
            element={<Invoicetable/>}
          />
          
          <Route path="*" element={<Notfound/>} />
          {/* <Route exact path='/invoice' element={<Invoice />} /> */}
          {/* <Route exact path='/login' element={<Login />} /> */}
          {/* <Route exact path='/company' element={<Company/>} /> */}
          {/* <Route exact path='/Service' element={<Service/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
