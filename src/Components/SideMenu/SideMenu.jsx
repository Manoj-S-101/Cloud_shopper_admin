import React, { useEffect, useState } from 'react'
import './SideMenu.css'
import { Link, useLocation } from 'react-router-dom'

const SideMenu = () => {
  const location = useLocation();
  const getMenuFromPath = (pathname) => {
    if (pathname === "/addproducts") return "addproducts";
    if (pathname === "/listproducts") return "listproducts";
    if (pathname === "/listusers") return "listusers";
  };
  const [menu, setMenu] = useState(getMenuFromPath(location.pathname));

  useEffect(() => {
    setMenu(getMenuFromPath(location.pathname));
  }, [location.pathname]);
  const onActiveStyle ={
    backgroundColor:" rgb(236, 236, 236)"
  }
  return (
    <div className='sidemenu'>
      <Link to={'/addproducts'}><button className='Add-products menu' style={menu === "addproducts" ? onActiveStyle : {}}>Add Product</button></Link>
      <Link to={'/listproducts'}><button className='List-products menu' style={menu === "listproducts" ? onActiveStyle : {}}>List Products</button></Link>
      <Link to={'/listusers'}><button className='List-users menu' style={menu === "listusers" ? onActiveStyle : {}}>List Users</button></Link>
    </div>
  )
}

export default SideMenu
