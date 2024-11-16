import React, { useState } from 'react'
import {Container, Divider, Grid, GridCol, Select,TextInput, Title,TagsInput, Textarea , Button,Avatar,Loader   } from "@mantine/core"
import { useJobContext } from '../../context/JobContext'
import { useCompanyContext } from '../../context/CompanyContext'
import { CompanyProps } from './CompanyProfile'



export interface PostaNewJobProps {
  title : string | null,
  positions : string | null,
  salary : string | null,
  jobdescription : string | null,
  date : string | null,
  skillsRequired? : string[] | null,
  jobType? : string | null,
  companyID? : string | null,
  
}






const PostNewJob:React.FC = () => {


const jobData = useJobContext()
const companyData = useCompanyContext()

  const [skillsRequired, setSkillesRequired] = useState<string[] | null>(null)
  const [jobType, setJobType] = useState<string | null>(null)
  
const [newJob , setNewJob] = useState<PostaNewJobProps>({
  title : null,
  positions :null,
  salary :null,
  jobdescription :null,
  date :  null
})

// console.log(companyData?.company)

  const handleCreateJob = () =>{
    jobData?.createJob({...newJob,jobType,skillsRequired, companyID : companyData?.company?._id})
  }

  return (
    <div className='profileInnerContainer'>
    {/* <div className='loaderInnerDiv'><Loader color="blue" type="bars" /></div>  */}
      <div className='profileConntent'>

      <Container fluid >
      <Title order={1} style={{display :"flex", alignItems : "center"}}>Post a Job </Title>
      <Divider my="md" />
        <Grid>

        <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
       value={newJob?.title ?? ""}
       onChange={(e)=>{
        setNewJob({
          ...newJob,
          title : e.target.value
        })
       }}
      label="Title"
      placeholder="Title"

    />
          </GridCol>

          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
      label="Positions"
      placeholder="Positions"
      value={newJob?.positions ?? ""}
       onChange={(e)=>{
        setNewJob({
          ...newJob,
          positions : e.target.value
        })
       }}
    />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        label="Salary Range"
        placeholder="Salary Range"
        value={newJob?.salary ?? ""}
        onChange={(e)=>{
         setNewJob({
           ...newJob,
           salary : e.target.value
         })
        }}
        type='text'
      /> </GridCol>


       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        label="Job Post On"
        placeholder="Job Post On"
        type='date'
 
        onChange={(e)=>{
         setNewJob({
           ...newJob,
           date : e.target.value
         })
        }}

      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
       <TagsInput  data={[]} onChange={setSkillesRequired} label="Skills Required" placeholder="Skills Required" />
       
       </GridCol>

       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <Select
      label="Job Type"
      placeholder="Job Type"
      value={jobType}
     onChange={setJobType}
      data={["Part time", "Full time"]}
      searchable
      
    />
          </GridCol>   

          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Textarea
        label="Job Description"
        placeholder="Job Description"
        size="md"
        value={newJob?.jobdescription ?? ""}
        onChange={(e)=>{
         setNewJob({
           ...newJob,
           jobdescription : e.target.value
         })
        }}
      />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Button mr='sm' onClick={handleCreateJob}>Submit</Button>
          <Button variant="outline">Reset</Button>
          </GridCol>
        </Grid>
      </Container>
      </div>
    </div>
  )
}

export default React.memo(PostNewJob)
