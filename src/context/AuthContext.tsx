import React, { createContext, useContext, useEffect, useState } from 'react'
import { SignupDetailsprops } from '../pages/Auth/Signup'
import { LoginDetailsprops } from '../pages/Auth/Signin';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';


export interface AuthChildProps  {
    children : React.ReactNode
}



axios.defaults.baseURL = 'http://localhost:8003/api/v1/';
export interface UserProps {
    _id : string,
    name : string,
    email : string,
    phone : string,
    role : string,
    pic : string,
    shortListedJobs : string[],
    appliedJobs : string[]
}

interface AuthContextProps {
    token : string | null
    user : UserProps | null,
    singup : (details : SignupDetailsprops) => void
    signin : (details : LoginDetailsprops) => void
    loading : boolean,
    logout : ()=>void,
    setUser : React.Dispatch<React.SetStateAction<UserProps | null>>
}

const createAuthContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = () =>{
    return useContext(createAuthContext)
}

const AuthContext:React.FC<AuthChildProps> = ({children}) => {


const [token,setToken] = useState<string | null>(null)
const [user , setUser] = useState<UserProps | null>(null)
const [loading, setLoading] = useState<boolean>(false)
const [mainLoading, setMainLoading] = useState<boolean | null >(null)

const singup = async(details:SignupDetailsprops) =>{

   const {name,email,phone,password, confirmPassword,role,pic} = details
setLoading(true)
    try {
        

        const data = await axios.post("auth/signup", {name,email,phone,password, confirmPassword,role,pic})
        notifications.show({
            title: 'SignUp Successfully',
            message: 'You have successfully signup in our portal🌟',
          })
          console.log(data.data.token)

          localStorage.setItem("jobtoken", data.data.token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`
          setToken(data.data.token)
          setLoading(false)

    } catch (error) {
        notifications.show({
            title: 'Something went Wrong',
            message: 'You have successfully not signup in our portal',
          })
          setLoading(false)
          console.log(error)
    }
}



const signin = async(details:LoginDetailsprops) =>{
    const {email,password} = details
     setLoading(true)
     try {
         
 
         const data = await axios.post("auth/signin", {email,password})
         notifications.show({
             title: 'SignUp Successfully',
             message: 'You have successfully Login in our portal🌟',
           })
 
           localStorage.setItem("jobtoken", data.data.token)
           axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`
           setToken(data.data.token)
           setLoading(false)
     } catch (error) {
        setLoading(false)
         notifications.show({
             title: 'Something went Wrong',
             message: 'You have successfully not signup in our portal',
           })
     }
 }

 const logout = ()=>{
    setUser(null)
     axios.defaults.headers.common["Authorization"] =null
     localStorage.removeItem('jobtoken')
 }

useEffect(()=>{

const token = localStorage.getItem('jobtoken')

if(token){
    setMainLoading(true)
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setToken(token)

    axios.get("verify/whoami").then((res)=>{
        setUser(res.data.user)
        setMainLoading(false)
    }).catch((er)=>{
        console.log(er)
        setMainLoading(false)
    })
}
else{
    setUser(null)
    logout()
}

},[token])

  return <createAuthContext.Provider value={{logout,loading,signin,user,token,singup,setUser}}>{mainLoading ?<div className='mainLoaderDiv'>
    <Loader color="blue" type="bars" />
    </div> : children}</createAuthContext.Provider>
}

export default React.memo(AuthContext)
