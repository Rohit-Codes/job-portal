import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthContext, { AuthChildProps, useAuthContext, UserProps } from './AuthContext'
import axios from 'axios'




export interface ApplicantsProps {
    _id : string,
    candidates : UserProps[]
}
interface ApplicantContextProps {
    applicants : ApplicantsProps[] | null
}


const createApplicantContext = createContext<ApplicantContextProps  | null>(null)





export const useApplicantContext = () =>{
    return useContext(createApplicantContext)
}

const ApplicantsContext:React.FC<AuthChildProps> = ({children}) => {


const [applicants, setApplicants] = useState<ApplicantsProps[] | null>(null)

const authData = useAuthContext()



useEffect(()=>{
    if(authData?.token){
        axios.get("job/getAllApplicants").then((res)=>{
            console.log(res.data.getRecruiterJob)
        }).catch((err)=>{
            console.log(err)
        })
    }
})

  return <createApplicantContext.Provider value={{applicants}}>{children}</createApplicantContext.Provider>
}

export default ApplicantsContext
