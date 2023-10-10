import React from 'react'
import Footer from "./Components/Layout/Footer/Footer";
import NavBar from "./Components/Layout/NavBar/NavBar";
import { Link, Outlet } from "react-router-dom"
function MainLayout() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout
