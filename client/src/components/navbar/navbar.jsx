import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiLogIn } from 'react-icons/bi'
import { useSelector } from "react-redux"
import './navbar.styles.scss'


const Navbar = () => {
  const state  = useSelector((state) => state.auth.id)
  
  const conmponent = (
    <nav className='flex navbar'>
          <ul className='flex'>
            <li><RiNotification3Line style={{height:'1.3rem',width:'auto'}}/></li>
            <li className='flex nav_profile'>
              <img src="https://picsum.photos/200" alt="" />
              <span>{state}</span>
              <MdKeyboardArrowDown/>
            </li>
            <li className='flex'>
              <BiLogIn/>
              &nbsp;Iziet
            </li>
          </ul>
    </nav>
  )
  return conmponent
}

export default Navbar