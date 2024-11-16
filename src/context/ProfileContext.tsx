import React, { createContext, useContext, useEffect, useState } from 'react'
import { EditCompleteProfileprops } from '../pages/profile/Myprofile'
import axios from 'axios'
import { useAuthContext } from './AuthContext'

export interface ProfileContextChildProps{
    children : React.ReactNode
}

interface ProfileProps {
    completeprofile :(details : EditCompleteProfileprops) => void,
    profileData : EditCompleteProfileprops | null,
    loading : boolean
}

const createProfileContext = createContext<ProfileProps | null>(null)

export const useProfileContext =  () =>{
    return useContext(createProfileContext)
}


const ProfileContext:React.FC<ProfileContextChildProps> = ({children}) => {

    const [profileData, setProfileData] = useState<EditCompleteProfileprops | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const authData = useAuthContext()
const completeprofile = async(details : EditCompleteProfileprops) =>{

    

const {jobtitle,currentSalary,expectedSalary,Experience,Age,completeaddress,description,country,city,skills} = details
setLoading(true)
    try {
        const data = await axios.post("profile/create", {
            jobtitle ,
            currentSalary,
            expectedSalary,
            Experience ,
            Age ,
            skills,
            description,
            country,
            city : city,
            completeaddress
        }, {
            headers : {
                "Content-Type" : "application/json"
            }
        }) 

        console.log(data)
        setLoading(false)
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }

   

}



const getProfileData = async()=>{

    setLoading(true)
    try {
        
const data = await axios.get("profile/getprofile")

setProfileData(data.data.profile)
setLoading(false)


    } catch (error) {
        console.log(error) 
        setLoading(false)
    }
}


useEffect(()=>{
if(authData?.token){
    getProfileData()
}

   
},[])

  return <createProfileContext.Provider value={{loading,profileData, completeprofile}}>{children}</createProfileContext.Provider>
}

export default ProfileContext
