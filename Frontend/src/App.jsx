import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Company from './Pages/Company';
import Service from './Pages/Service';
// import Login from './Login/Login';
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import Print from './Pages/Print';
import Invoicetable from './Pages/Invoicetable';
import Detailpage from './Pages/Detailpage';
import Loginpage from './Pages/Loginpage';
import { useSelector } from 'react-redux'
import Report from './Pages/Report';
import Billing from './Pages/Billing';
import Changepassword from './Components/Changepassword/Changepassword';


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
            path='/detail/:id'
            element={token ? <Detailpage /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/Report'
            element={token ? <Report/> : <Navigate to={'/login'} />}
          />
           <Route
            path='/invoice'
            element={token ? <Billing/> : <Navigate to={'/login'} />}
          />
            <Route
            path='/change-password'
            element={<Changepassword/>}
          />
      
          <Route path="*" element={<Notfound />} />
        </Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
