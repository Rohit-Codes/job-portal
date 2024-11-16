import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthChildProps, useAuthContext } from './AuthContext'
import { CompanyProps } from '../pages/profile/CompanyProfile'
import axios from 'axios'

export interface CompanyContextProps {
    company : CompanyProps | null,
    addCompany : (details : CompanyProps)=>void,
    loading : boolean
}


const createCompanyContext = createContext<CompanyContextProps | null>(null)


export const useCompanyContext = () =>{
    return useContext(createCompanyContext)
}

const CompanyContext:React.FC<AuthChildProps> = ({children}) => {

const [company, setCompany] = useState<CompanyProps | null>(null)
const [loading, setLoading] = useState<boolean>(false)
const authData = useAuthContext()

const addCompany = async(details : CompanyProps) =>{
console.log(details)
console.log(typeof(details.companyName))

try {
  const data = await axios.post("/company/create", details)
} catch (error) {
  console.log(error)
}




}

useEffect(()=>{
  setLoading(true)
  if(authData?.token){
    axios.get("/company/getcompanies").then((res)=>{
      //console.log(res.data.company)
      setCompany(res.data.company)
      setLoading(false)
    }).catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  }
},[])


  return <createCompanyContext.Provider value={{loading,addCompany,company}}>{children}</createCompanyContext.Provider>
}

export default CompanyContext
