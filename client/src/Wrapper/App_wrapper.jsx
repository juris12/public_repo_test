import '../components/navbar/navbar.styles.scss'
import { Navbar, Sidebar } from '../components'
import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

const AppWrap = ( Component ) => function HOC() {
  const [screenSize, setScreenSize] = useState(1000)
  const [activeMenu,setActiveMenu] = useState(true)

  useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
      window.addEventListener('resize',handleResize);
      handleResize();
      return () => window.removeEventListener('resize',handleResize);
  },[])
  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  },[screenSize]);
  return (
    <div style={{position: 'realativ'}}>
    <div className='menu' style={{backgroundColor: !activeMenu&&'rgb(142, 201, 201)'}} onClick={() => setActiveMenu(!activeMenu)}>
        <AiOutlineMenu/>
    </div>
    <div>
      {activeMenu&&<Navbar/>}
      <div style={{display:'flex',margin:activeMenu&&'62px 0px 0px 0px'}}>
          <Component activeMenu={activeMenu}/>    
          {activeMenu&&<Sidebar/>}
      </div>
    </div></div>
  )
}

export default AppWrap