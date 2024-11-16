import React, { useCallback, useEffect,useState } from 'react'

import { Container, Grid, GridCol,Divider, Table  } from '@mantine/core'

import { ActionIcon } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import { useApplicantContext } from '../../context/ApplicantsContext';




const AllAplicants:React.FC = () => {
 

const applicantData = useApplicantContext()







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

applicantData?.applicants && applicantData.applicants.map((applydata) => (
  <Table.Tr key={applydata._id}>
    <Table.Td>{applydata.title}</Table.Td>
    <Table.Td>{applydata.jobType}</Table.Td>
    <Table.Td>{applydata.positions}</Table.Td>
    <Table.Td>Active</Table.Td>
    <Table.Td> <ActionIcon variant="light" color="red" aria-label="Settings">
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

export default React.memo(AllAplicants)
