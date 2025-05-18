import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import SideMenu from './Components/SideMenu/SideMenu';
import Addproducts from './Components/Addproducts/Addproducts';
import Listproducts from './Components/Listproducts/Listproducts';
import Listusers from './Components/Listusers/Listusers';

const MainApp = () => {
  return (
    <div>
      <NavBar />
      <SideMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/addproducts" />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="/listproducts" element={<Listproducts />} />
        <Route path="/listusers" element={<Listusers />} />
      </Routes>
    </div>
  );
};

export default MainApp;
