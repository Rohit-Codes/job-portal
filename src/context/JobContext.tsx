import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { notifications } from '@mantine/notifications'
import { PostaNewJobProps } from '../pages/profile/PostNewJob'
import { CompanyProps } from '../pages/profile/CompanyProfile'

import { useNaviatefunction } from '../customHookes/navigationfun'


interface JobChildProps {
    children : React.ReactNode
}

export interface AppliedJobsProps {
    _id : string,
    title : string,
    jobType : string,
    positions : string
}

export interface JobDataProps extends PostaNewJobProps{
    title : string,
    _id : string,
    jobType : string,
    positions : string,
    salary : string,
    skillsRequired : string[],
    candidates : string[],
    company : CompanyProps
}

export interface JobContextProps {
    jobs : JobDataProps[],
    apply : (id:string) => void,
    deleteApplied :  (id:string) => void,
    shortlistJob : (id:string) => void,
    deleteShortlist : (id:string) => void,
    createJob : (data:PostaNewJobProps) => void,
    deleteMyJobs : (id:string) => void,
    recuriterJob : JobDataProps[]
    
 
}

const createJobContext = createContext<JobContextProps | null>(null)

export const useJobContext = () =>{
    return useContext(createJobContext)
}


const JobContext:React.FC<JobChildProps> = ({children}) => {


const [jobs , setJobs] = useState<JobDataProps[] >([])
const [recuriterJob , setRecruiterJob] = useState<JobDataProps[]>([])
const navigatefun = useNaviatefunction()
const authdata = useAuthContext()


const createJob = async(jobdata:PostaNewJobProps) =>{




  
   try {
       const data = await axios.post(`/job/createjob/${jobdata.companyID}`, jobdata)
       notifications.show({
           title: 'Success',
           message: 'You have Created job successfully🌟',
         })
         navigatefun("/profile/managejobs")
        
   } catch (error) {
       console.log(error)
   }

}


const apply = async(id:string) =>{

    try {
        const data = await axios.post(`job/applyjob/${id}`)
        console.log(data.data.job)
        notifications.show({
            title: 'Success',
            message: 'You have applied for this job successfully🌟',
          })

    } catch (error) {
        console.log(error)
    }
}

const deleteApplied = async(id:string) =>{
   
    try {
        const data = await axios.delete(`job/deletejob/${id}`)
          

    } catch (error) {
        console.log(error)
    }
}


const shortlistJob = async(id:string)=>{
    try {
     const data = await axios.post(`job/shortlistjob/${id}`)
     console.log(data)
     notifications.show({
        title: 'Success',
        message: 'You have Shortlisted for this job successfully🌟',
      })
    } catch (error) {
        console.log(error)
    }
}


const deleteShortlist = async(id:string)=>{
    console.log(id)
    try {
     const data = await axios.delete(`job/delshortlisedjob/${id}`)
    console.log(data)
     notifications.show({
        title: 'Success',
        message: 'You have Deleted this Shortlisted job successfully🌟',
      })
    } catch (error) {
        console.log(error)
    }
}

const deleteMyJobs = async(id:string) =>{
 setJobs((prev:JobDataProps[])=>{
     const filterJobs:JobDataProps[] = prev.filter((data)=>{
         return data._id != id
     })
     return filterJobs
 })

try {
    const data = await axios.delete(`job/deletemyjob/${id}`)
  //  console.log(data)
} catch (error) {
    console.log(error)
}


}


useEffect(()=>{

    if(authdata?.token){
    axios.get("job/recruiterJob").then((res)=>{
      setRecruiterJob(res.data.job)
    }).catch((err)=>{
      console.log(err)
    })
}
  },[])
  
  

useEffect(()=>{

    if(authdata?.token){
axios.get("http://localhost:8003/api/v1/job/getjobs").then((res)=>{
    //console.log(res.data.job)
    setJobs(res.data.job)

}).catch((err)=>{
    console.log(err)
   
})
    }
},[])



  return <createJobContext.Provider value={{recuriterJob,deleteMyJobs,createJob,deleteShortlist,shortlistJob,deleteApplied,apply,jobs}}>{children}</createJobContext.Provider>
}

export default React.memo(JobContext)
