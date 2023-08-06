import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Company from './Pages/Company';
import Service from './Pages/Service';
import Invoice from './Pages/Invoice';
// import Login from './Login/Login';
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import Print from './Pages/Print';
import Invoicetable from './Pages/Invoicetable';
import Detailpage from './Pages/Detailpage';
import Loginpage from './Pages/Loginpage';
import { useSelector } from 'react-redux'


const App = () => {
  const token = useSelector((state) => state.Authslice.token);

  return (
    <>
      < BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={token ? <Home /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/login'
            element={token ? <Navigate to={'/'} /> : <Loginpage />}
          />
          <Route
            path='/invoice'
            element={token ? <Invoice /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/company'
            element={token ? <Company /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/Service'
            element={token ? <Service /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/print/:id'
            element={token ? <Print /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/table'
            element={token ? <Invoicetable /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/detail'
            element={token ? <Detailpage /> : <Navigate to={'/login'} />}
          />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
