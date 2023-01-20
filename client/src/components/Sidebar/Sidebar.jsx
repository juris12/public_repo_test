import './Sidebar.styles.scss'
import { AiOutlineAreaChart } from 'react-icons/ai';
import Individiuallink from './Individiual_link'
import { NavLink} from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';
import { ImBooks } from 'react-icons/im';
import { AiFillHome } from 'react-icons/ai';

const Sidebar = () => {
  const stylecc={display:'flex',flexdirection:'row',alignitems:'center'}
  const color = 'rgb(69, 69, 69)'
  const content = (
    <nav className='home_sidebar'>
        <ul className='sidebar_links'>
              <li>
                <NavLink to='/admin/' style={({ isActive }) =>({...stylecc,color:!isActive?color:'#000'})}>
                  <AiFillHome/>
                  <span>Mājas</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/admin/catalog' style={({ isActive }) =>({...stylecc,color:!isActive?color:'#000'})}>
                  <ImBooks/>
                  <span>Katalogs</span>
                </NavLink>
              </li>
              <Individiuallink name='Klienti' sublinks={[
                {name:'Klientu grupas',url:'/admin/statistic'},
                {name:'Klienti',url:'/admin/user'},
                {name:'Iestatījumi',url:'/admin/statistic'}
              ]}/>
              <li>
                <NavLink to='/admin/statistic' style={({ isActive }) =>({...stylecc,color:!isActive?color:'#000'})}>
                  <AiOutlineAreaChart/>
                  <span>Statistika</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/admin/setings' style={({ isActive }) =>({...stylecc,color:!isActive?color:'#000'})}>
                  <AiFillSetting/>
                  <span>Iestatījumi</span>
                </NavLink>
              </li>
          </ul>    
    </nav>
  )
  return content
}

export default Sidebar