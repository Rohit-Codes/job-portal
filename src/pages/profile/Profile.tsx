import React, { useState } from 'react'
import { Avatar,Text,rem } from '@mantine/core';
import "./Profile.css"
import DropdownMenu from '../../components/header/dropdownMenu/DropdownMenu';
import {
    IconBriefcase2,IconBrandCoinbase,IconCirclePlus,IconAlbum,IconFileStack,IconBookmark,
    IconUser,
    IconChecklist,
    IconTrash,
    IconLogout
  } from '@tabler/icons-react';
import { NavLink, Route, Routes} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useNaviatefunction } from '../../customHookes/navigationfun';
import Myprofile from './Myprofile';
import AppliedJobs from './AppliedJobs';
import ShortlistedJobs from './ShortlistedJobs';
import CompanyProfile from './CompanyProfile';
import PostNewJob from './PostNewJob';
import ManageJobs from './ManageJobs';
import AllAplicants from './AllAplicants';





const Profile:React.FC = () => {

const authData = useAuthContext()
const navigatefun = useNaviatefunction()



const logoutHome = () =>{
authData?.logout()
navigatefun("/")
}

  return (
    <>

    <div className='profileContainer'>
        <div className='profileLeftContainer'>
            <div className='leftInnerDiv'>
            <div className='logoDiv' style={{display:"flex", alignItems:"center"}}>
  <Avatar color="blue" radius="xl" >
     {/* <IconStar size="1.5rem" /> */}
        JW
      </Avatar>
<Text tt="uppercase" ml='sm' fw={700}>Job Wala</Text>
  </div>
  <div className='leftMenuDIv'>
    {authData?.user?.role == "Jobseeker" ? 
    <ul>
        <li>
            <NavLink to="/profile/innerprofile" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconUser style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>My Profile</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/profile/appliedjpbs" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconBriefcase2 style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Applied Jobs</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/profile/shortlistedjob" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconChecklist style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Shorlisted Jobs</span>
                </div></NavLink>
        </li>
        <li>
          
            <div className='menuLink leftMenu otherlinkdiv' onClick={logoutHome}>
                <div className='menuIconDiv'>
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Logout</span>
                </div>
        </li>
        <li>
            
            <div className='menuLink leftMenu otherlinkdiv'>
                <div className='menuIconDiv '>
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Delete Profile</span>
                </div>
        </li>
        
    </ul>
    :
    <ul>
        <li>
            <NavLink to="/profile/comapanyprofile" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconBrandCoinbase style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>Company Profile</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/profile/postnewjob" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconCirclePlus style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>Post a Job</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/profile/managejobs" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconAlbum style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>Manage Jobs</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/profile/allaplicants" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconFileStack style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>All Applicants</span>
                </div></NavLink>
        </li>
        <li>
            <NavLink to="/shortlistedresumes" className="menuLink">
            <div className='leftMenu'>
                <div className='menuIconDiv'>
                <IconBookmark style={{ width: rem(16), height: rem(16) }} />
                </div>
                <span>Shortlisted Resumes</span>
                </div></NavLink>
        </li>
  
        <li>
          
            <div className='menuLink leftMenu otherlinkdiv' onClick={logoutHome}>
                <div className='menuIconDiv'>
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Logout</span>
                </div>
        </li>
        <li>
            
            <div className='menuLink leftMenu otherlinkdiv'>
                <div className='menuIconDiv '>
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
                </div>
                <span>Delete Profile</span>
                </div>
        </li>
    </ul> }
    
    
  </div>
            </div>
        </div>
        <div className='profileRightContainer'>
            <div className='headerDiv profileRightHeader'>

  <div className='logoDiv' style={{display:"flex", alignItems:"center"}}>
  <Avatar color="blue" radius="xl" >
     {/* <IconStar size="1.5rem" /> */}
        JW
      </Avatar>
<Text tt="uppercase" ml='sm' fw={700}>Job Wala</Text>
  </div>

<div className='dropdowndiv' style={{display:"flex", alignItems:"center"}}>
    <DropdownMenu/>
   
  </div>

            </div>

<Routes>
         <Route path='/innerprofile' element={<Myprofile/>}/>
          <Route path="/appliedjpbs" element={<AppliedJobs/>} />
          <Route path="/shortlistedjob" element={<ShortlistedJobs />} />
          <Route path="/comapanyprofile" element={<CompanyProfile />} />
          <Route path="/postnewjob" element={<PostNewJob />} />
          <Route path="/managejobs" element={<ManageJobs />} />
          <Route path="/allaplicants" element={<AllAplicants />} />
          <Route path="/shortlistedresumes" element={<ShortlistedJobs />} />
</Routes>
        </div>
    </div>

    </>
  )
}

export default Profile
