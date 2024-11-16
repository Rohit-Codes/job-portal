import React, { useCallback, useEffect,useState } from 'react'
import axios from 'axios'
import { Container, Grid, GridCol,Divider, Table,Avatar  } from '@mantine/core'
import { JobDataProps, useJobContext } from '../../context/JobContext'
import { useAuthContext } from '../../context/AuthContext'
import { ActionIcon } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';




const ManageJobs:React.FC = () => {

const authData = useAuthContext()


const jobData = useJobContext()








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
          <Table.Th>Applications</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{

jobData?.recuriterJob.length == 0 ? <Table.Tr><Table.Td>No Jobs Created by you</Table.Td></Table.Tr> : jobData?.recuriterJob.map((myJobs) => (
  <Table.Tr key={myJobs?._id ? myJobs?._id : Math.floor(Math.random()*100).toString()}>
    <Table.Td>
      <div className='titleDiv'>
      <Avatar variant="filled" radius="sm" size="md" src={`http://localhost:8003/${myJobs?.company?.companyLogo}`} />
      <span>{myJobs?.title}</span>
      </div>
      
      </Table.Td>
    <Table.Td>{myJobs?.jobType}</Table.Td>
    <Table.Td>{myJobs?.candidates?.length}</Table.Td>
    <Table.Td>Active</Table.Td>
    <Table.Td> <ActionIcon variant="light" color="red" aria-label="Settings">
      <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} onClick={()=>{jobData.deleteMyJobs(myJobs?._id)}}/>
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

export default React.memo(ManageJobs)
