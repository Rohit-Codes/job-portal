import React, { useCallback, useEffect, useState } from 'react'
import { Container,Grid,GridCol , Divider} from '@mantine/core'
import Jobcard from '../../components/jobcard/Jobcard'
import { JobDataProps } from '../../context/JobContext'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext'

const ShortlistedJobs:React.FC = () => {

  const authData = useAuthContext()

const [shortlistjob, setShortlistJobs] = useState<JobDataProps[] | null>(null)


const getAllShortlistedJobs = useCallback(() =>{
  if(authData?.token){
    axios.get("job/shortlistedjob").then((res)=>{
      console.log(res.data.shortListedJobs)
      setShortlistJobs(res.data.shortListedJobs)
    }).catch((err)=>{
      console.log(err)
    })
  }
},[shortlistjob])

useEffect(()=>{
  getAllShortlistedJobs()

},[])

// const handleDeleteShortList = () =>{

// }



  return <div className='applyJobContainer'>
  <Container fluid>
   <Grid>
     <GridCol>
       <h1>Shortlisted Jobs</h1>
     </GridCol>
     <Divider my="md" />
     {
      shortlistjob && shortlistjob.map((data)=>{


        return <GridCol span={{ base: 12, md: 6, lg: 4 }} key={data._id}>
        <Jobcard jobdata={data}  setShortlistJobs={setShortlistJobs}/>
        </GridCol> 
      })
     }
     
     </Grid>
  </Container>
 </div>
}

export default ShortlistedJobs
