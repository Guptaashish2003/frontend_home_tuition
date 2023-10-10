import React, { useContext, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {  UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useGetDataProtected } from '../App/api/useGetData';
import { ContextUser } from '../App/context/UserContext';
import userLogo from "../assets/user-logo.jpg";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray bg-transparent border-none cursor-pointer"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const {user,setUser} = useContext(ContextUser)
  useEffect(() => {
    useGetDataProtected(`/me`)
    .then((data) =>{
     setUser(data);
   })
   .catch((error) =>{
     toast.error(error.response.data.message, { autoClose: 500, theme: 'colored' })
   })
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
      
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
             { user?.data?.avatar? <img className="rounded-full w-8 h-8" src={user?.data?.avatar}alt="" />: <img className="rounded-full w-8 h-8" src={userLogo} alt="" />}

            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
              {user?.data?.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>


        {isClicked.userProfile && (<UserProfile logo={user?.data?.avatar} user={user?.data}  />)}
      </div>
    </div>
  );
};

export default Navbar;
