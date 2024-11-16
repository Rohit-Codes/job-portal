import React from 'react'
import { NavLink} from 'react-router-dom'
import "./Header.css"
import { Button } from '@mantine/core'
import { Avatar,Text } from '@mantine/core';
import DropdownMenu from './dropdownMenu/DropdownMenu';
import { useAuthContext } from '../../context/AuthContext';
import { useNaviatefunction } from '../../customHookes/navigationfun';


const Header:React.FC = () => {

const authData = useAuthContext()

const navigatefun = useNaviatefunction()

  return <div className='headerDiv'>
  <div className='logoDiv' style={{display:"flex", alignItems:"center"}}>
  <Avatar color="blue" radius="xl" >
     {/* <IconStar size="1.5rem" /> */}
        JW
      </Avatar>
<Text tt="uppercase" ml='sm' fw={700}>Job Wala</Text>
  </div>
  <div className='menuLink'>
   <ul>
     <li><NavLink to="/">Find a Job</NavLink></li>
     <li><NavLink to="/">How it Works</NavLink></li>
     <li><NavLink to="/">Contact</NavLink></li>
   </ul>
  </div>
 {!authData?.user ?   <div className='btnDiv'>
  <Button variant="gradient" gradient={{ from: 'indigo', to: 'blue', deg: 90 }} onClick={()=>{navigatefun("/signin")}}>Login</Button>
  <Button variant="outline" ml='sm' onClick={()=>{navigatefun("/signup")}}>Create Account</Button>
  </div> :<div className='dropdowndiv' style={{display:"flex", alignItems:"center"}}>
    <DropdownMenu/>
    <Button variant="filled" color="red" ml='sm' onClick={authData?.logout}>Logout</Button>
  </div>
}
</div>
}

export default React.memo(Header)
