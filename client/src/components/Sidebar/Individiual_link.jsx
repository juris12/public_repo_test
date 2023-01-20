import './Sidebar.styles.scss'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { NavLink} from 'react-router-dom';
import { useState } from 'react';

const Individiuallink = ({sublinks, name}) => {
    const stylecc={display:'flex',flexdirection:'row',alignitems:'center'}
    const color = 'rgb(69, 69, 69)'
    const [open, setopen] = useState(false)
  return (
    <li className='sidebar_links_grop'>
        <div className='link_grop_title' onClick={()=>setopen(!open)}>
            <div className='flex kreisa' style={open ? {color:'#000'} : {color:color}}>
                <BsFillPersonFill/>
                <span>{name}</span>
            </div>
            <div className='laba'>
                {open ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowRight/>}
            </div>
        </div>
        {open &&
            <ul>
            {sublinks.map((val) => (
                <li className='flex link_grop_individ'>
                    <NavLink to={val?.url} style={({ isActive }) =>({...stylecc,color:!isActive?color:'#000'})}>
                        <RxDoubleArrowRight/>
                        <span>{val?.name}</span>
                    </NavLink>
                </li>
            ))}
            </ul>
        }
    </li>
  )
}

export default Individiuallink