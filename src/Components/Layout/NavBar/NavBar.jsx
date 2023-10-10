import { React, useRef,useState,useEffect, useContext } from "react";
import "./NavBar.css";
import logo from "../../../assets/logo_m.jpg";
import { Link } from "react-router-dom";
import MenuItems from "../../dropdown/MenuItems";
import {DataNav} from "../../../Data";
import LoginModel from "../../../Auth/LoginModel/LoginModel";
import { useGetDataProtected } from "../../../App/api/useGetData";
import { toast } from 'react-toastify'
import { ContextUser } from "../../../App/context/UserContext";
import { useNavigate } from 'react-router-dom';
import userLogo from "../../../assets/user-logo.jpg";
function NavBar() {
  const navigate = useNavigate()
  const menuRef = useRef();
  const profileRef = useRef();
  const loginBtnRef = useRef();
  const mobRef = useRef();
  const hamBgRef = useRef();
  const hamburgerRef = useRef();
  const removeRef = useRef();
  const loginRef = useRef();
  const {user,setUser,setUserRef,setLogout} = useContext(ContextUser)
  useEffect(() => {
    if (user.success) {
      
      loginBtnRef.current.classList.add("login-hidden")
      loginRef.current.classList.add("login-hidden")
      hamburgerRef.current.classList.add("hamburger-login")
      removeRef.current.classList.remove("login-hidden")
    }
    
  }, [user]);

  const menubar = () => {
    hamBgRef.current.classList.add("show");
    menuRef.current.classList.add("opened");
    mobRef.current.classList.add("show");
    mobRef.current.classList.add("closed-mod");
    setUserRef(mobRef.current)
    
  };
  const closeham = () => {
    hamBgRef.current.classList.remove(("show"));
    menuRef.current.classList.remove("opened");
    mobRef.current.classList.remove("show");
    mobRef.current.classList.remove("closed-mod");
  }
  const closeHamMob = () => {
    hamBgRef.current.classList.remove(("show"));
    menuRef.current.classList.remove("opened");
  }
  

  const profileOption = () => {
    profileRef.current.classList.toggle("hidden");
  }
  const hideProfile = () => {
    profileRef.current.classList.add("hidden");
  }

  const logout = () => {
    useGetDataProtected(`/logout`)
    .then((data) =>{
      if (data.success) {
        loginBtnRef.current.classList.remove("login-hidden")
        hamburgerRef.current.classList.remove("hamburger-login")
        loginRef.current.classList.remove("login-hidden")
        removeRef.current.classList.add("login-hidden")
        profileRef.current.classList.add("hidden");
        localStorage.removeItem("token");
        localStorage.removeItem("Role");
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        setUser([])
        navigate("/")
      }
     
   })
   .catch((error) =>{
     toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
   })
  }
  
  return (
   <>
    <div className="nav-container">
      <div className="logo-container" onClick={closeham}>
        <Link to="/">
          <img width={"90%"} height={"90%"} src={logo} alt="" />
        </Link>
      </div>
      <div className="main-nav-container">
        <nav>
          <ul className="nav-list">
          <li className="menu-items"><Link to={user.length === 0 ?"/":"/mainDasboard"}>
          Home
        </Link></li>
            {DataNav.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          <li className="menu-items"><Link to="about">
          About Us
        </Link></li>
          <li className="menu-items"><Link to="/contact">
          Contact US
        </Link></li>
          </ul>
        </nav>
      </div>
      <div className="hamburger " ref={hamburgerRef}>
        <div className="login-icon mob-login-out " ref={loginRef}>
          <LoginModel />
            <button className="rgt-button nav-button">
              <Link to="/register/teacher">
                Sign Up
                <i className="zmdi zmdi-arrow-right" />
              </Link>
            </button>
        </div>

        <button
          ref={menuRef}
          className="menu hide"
          onClick={menubar}
          aria-label="Main Menu"
        >
          <svg width="55" height="55" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
        <div className="nav-profile login-hidden" ref={removeRef}>
        <>
  <a onClick={profileOption} className="display-picture " >
   { user?.data?.avatar? <img src={user?.data?.avatar}alt="" />: <img src={userLogo} alt="" />}
  </a>
  {/*Profile Image*/}
  <div ref={profileRef} className="profile-card hidden">
    {/*ADD TOGGLE HIDDEN CLASS ATTRIBUTE HERE*/}
    <ul className="profile-ul">
      {/*MENU*/}
     {user?.data?.role==="admin"? <li>
        <i className="fa fa-user pro-icon-fix" ></i>
        <Link onClick={hideProfile} to="/dashboard">Admin Dashboard</Link>
      </li> : ""}
      <li>
        <i className="fa fa-user pro-icon-fix" ></i>
        <Link onClick={hideProfile} to="/profileUpdate">Profile</Link>
      </li>
      <li>
  
        <a onClick={logout} style={{cursor:"pointer"}}>🚀 Log Out</a>
      </li>
    </ul>
  </div>
</>


        </div>
      </div>
    </div>
    <div className="ham-mob  hide-mod" ref={mobRef}>
    <button onClick={closeham} aria-label="close" className="x">
      ❌
    </button>
    <div onClick={closeHamMob} className="login-icon mob-login " ref={loginBtnRef}>
          <LoginModel  closeHam={closeHamMob}/>
            <button className="rgt-button nav-button">
              <Link to="/register" onClick={closeham}>
                Sign Up
                <i className="zmdi zmdi-arrow-right" />
              </Link>
            </button>
        </div>
    <nav>
          <ul className="nav-list">
          <li className="menu-items" onClick={closeham}><Link to={user.length === 0 ?"/":"/mainDasboard"}>
          Home
        </Link></li>
            {DataNav.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems closeHamMob={closeHamMob} items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          <li className="menu-items" onClick={closeham}><Link to="about">
          About Us
        </Link></li>
          <li className="menu-items" onClick={closeham}><Link to="/contact">
          Contact US
        </Link></li>
          </ul>
        </nav>
    </div>

    <div ref={hamBgRef} className="ham-mob-bg  hide-mod"></div>
</>
   
  );
}

export default NavBar;
