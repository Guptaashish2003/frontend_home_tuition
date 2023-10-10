
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar } from './Components';
import { useStateContext } from './contexts/ContextProvider';
function OtherLayout() {
    const { setCurrentColor,  activeMenu, currentColor,  } = useStateContext();

    useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      if (currentThemeColor ) {
        setCurrentColor(currentThemeColor);

      }
    }, []);
  return (
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 " style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
        

          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            <Outlet/>
          </div>
          <Footer />
        </div>
      </div>


  )
}

export default OtherLayout
