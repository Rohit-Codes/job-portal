import React, { useCallback, useEffect,useState } from 'react'
import axios from 'axios'
import { Container, Grid, GridCol,Divider, Table  } from '@mantine/core'
import { useJobContext } from '../../context/JobContext'
import { useAuthContext } from '../../context/AuthContext'
import { ActionIcon } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';

export interface AppliedJobsProps {
  _id : string,
  title : string,
  jobType : string,
  positions : string
}



const AppliedJobs:React.FC = () => {
  const [myapply, setMyApplied] = useState<AppliedJobsProps[] | null | undefined>(null)
const authData = useAuthContext()


const jobData = useJobContext()

const handleDeletejob = (id:string) =>{
jobData?.deleteApplied(id)
setMyApplied((prev)=>{
  const deletedItems:AppliedJobsProps[] | null | undefined = prev?.filter((jobs)=>{
    return jobs._id != id
  })
  return deletedItems
})
}


const getAllAppliedJobs = useCallback(()=>{

  if(authData?.token){
    axios.get("job/appliedJobs").then((res)=>{
        console.log(res.data.myApplied)
        setMyApplied(res.data.myApplied)
    }).catch((err)=>{
        console.log(err)
    })
}
},[myapply])

useEffect(()=>{
  console.log(authData?.user)
  getAllAppliedJobs()
  },[])



  return (
    <div className='applyJobContainer'>
     <Container fluid>
      <Grid>
        <GridCol>
          <h1>My Applications</h1>
        </GridCol>
        <Divider my="md" />
        <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Job Title</Table.Th>
          <Table.Th>Job Type</Table.Th>
          <Table.Th>Positions</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{

myapply && myapply.map((applydata) => (
  <Table.Tr key={applydata._id}>
    <Table.Td>{applydata.title}</Table.Td>
    <Table.Td>{applydata.jobType}</Table.Td>
    <Table.Td>{applydata.positions}</Table.Td>
    <Table.Td>Active</Table.Td>
    <Table.Td> <ActionIcon variant="light" color="red" aria-label="Settings" onClick={()=>{handleDeletejob(applydata._id)}}>
      <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon></Table.Td>
  </Table.Tr>
))

        }</Table.Tbody>
    </Table>
      </Grid>
     </Container>
    </div>
  )
}

export default React.memo(AppliedJobs)
