import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import SideMenu from './Components/SideMenu/SideMenu';
import Addproducts from './Components/Addproducts/Addproducts';
import Listproducts from './Components/Listproducts/Listproducts';
import Listusers from './Components/Listusers/Listusers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import React from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    localStorage.getItem('auth-token')?setLoggedIn(true):setLoggedIn(false);
  },[])
  return (
    <BrowserRouter>
          <NavBar />
          {
            loggedIn&&<SideMenu/>
          }
        <Routes>
          <Route path='/login' element={<Login/>}/>
        <Route path="/addproducts" element={loggedIn&&<Addproducts />} />
        <Route path="/listproducts" element={loggedIn&&<Listproducts />} />
        <Route path="/listusers" element={loggedIn&&<Listusers />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
