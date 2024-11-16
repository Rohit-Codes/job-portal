import React from 'react'

import "./App.css"
import Home from './pages/home/Home'
import { Routes,Route } from 'react-router-dom'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Profile from './pages/profile/Profile'




const App:React.FC = () => {

  return <>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/profile/*" element={<Profile />}/>
          {/* Define child routes */}
          {/* <Route path="/profile/innerprofile" element={<Myprofile />} /> */}
          {/* <Route path="/profile/appliedjpbs" element={<AppliedJobs />} />
          <Route path="/profile/shortlistedjob" element={<ShortlistedJobs />} />
          <Route path="/profile/comapanyprofile" element={<CompanyProfile />} />
          <Route path="/profile/postnewjob" element={<PostNewJob />} />
          <Route path="/profile/managejobs" element={<ManageJobs />} />
          <Route path="/profile/allaplicants" element={<AllAplicants />} />
          <Route path="/profile/shortlistedresumes" element={<ShortlistedResumes />} /> */}
        {/* </Route> */}
  </Routes>
  </>
    }
  


export default App
