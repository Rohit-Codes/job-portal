import React, { useEffect, useLayoutEffect, useState } from 'react'
import { JobDataProps, useJobContext } from '../../context/JobContext'
import { Card, Avatar , Text, Badge, Button, Group,rem, Divider } from '@mantine/core';
import { IconCurrencyRupee,IconUsers,IconTrashXFilled,IconMapPin} from '@tabler/icons-react';
import { useAuthContext, UserProps } from '../../context/AuthContext';
import { ActionIcon } from '@mantine/core';
import { IconBookmark } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications'


export interface JobProps{
    jobdata : JobDataProps,
    setShortlistJobs? : React.Dispatch<React.SetStateAction<JobDataProps[] | null>>
}

const Jobcard:React.FC<JobProps> = ({jobdata,setShortlistJobs}) => {

const [disabelBtn, setDisableBtn] = useState<boolean>(false)
const [shortListBtn, setShortListBtn] = useState<boolean>(false)

const authData = useAuthContext()
const jobContextData = useJobContext()

const handleApply = () =>{
  if(authData?.user?.role == "Recruiter"){
    notifications.show({
      title: 'Failed',
      message: 'You are not authorised to applied this job',
    })
    return; 
  }
 jobContextData?.apply(jobdata._id)
  console.log(jobdata._id)



  authData?.setUser((prev)=>{
    if (!prev) return null;
    const updatedUser = {...prev, appliedJobs : [...prev.appliedJobs , jobdata._id]}
    return updatedUser
  })
  setDisableBtn(true)
}

const handleShortlist = () =>{
  jobContextData?.shortlistJob(jobdata._id)
  authData?.setUser((prev)=>{
    if (!prev) return null;
    const updatedUser = {...prev, shortListedJobs : [...prev.shortListedJobs , jobdata._id]}
    return updatedUser
  })
  setShortListBtn(true)
}


const handleDeleteShortList = () =>{



  jobContextData?.deleteShortlist(jobdata._id)

  setShortlistJobs && setShortlistJobs((prev:JobDataProps[] | null)=>{

    if(prev){
    const filterShortList:JobDataProps[]  = prev?.filter((job)=>{
      return jobdata._id != job._id
      
    })
    return filterShortList
    }
    return null

  })
}


useEffect(()=>{
  if(jobdata?.candidates?.includes(authData?.user?._id ?? "")){
    setDisableBtn(true)
  }
  else{
    setDisableBtn(false)
  }
},[])

useEffect(()=>{
  if(authData?.user?.shortListedJobs.includes(jobdata._id)){
    console.log(true)
    setShortListBtn(true)
  }
  else{
    setShortListBtn(false)
  }
},[authData])



  return <Card shadow="sm" padding="lg" radius="md" withBorder>

<div className='jobContentDiv'>
  <div className='shortlistDiv'>
   {shortListBtn ? <div className='deleteshort'><Badge color="lime">shortlisted</Badge>
    <ActionIcon variant="filled" color="red" aria-label="Settings">
      <IconTrashXFilled style={{ width: '70%', height: '70%' }} stroke={1.5} onClick={handleDeleteShortList}/>
    </ActionIcon>
   </div>:
    <ActionIcon variant="outline" aria-label="Settings" onClick={handleShortlist} disabled ={shortListBtn}>
      <IconBookmark style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon> }
  </div>
    <div className='joblogoDIv'>
    <Avatar variant="filled" radius="sm" src={`http://localhost:8003/${jobdata.company.companyLogo}`} />
    </div>
    <div className='jobContent'>
    <Text fw={500}>{jobdata.title}</Text>
    <div className='jobInnerContent'>
        <div className='jobSalary'>
          <IconCurrencyRupee style={{ width: rem(16), height: rem(16) }} /><span>{jobdata.salary}</span>
          
        </div>
        <div className='jobSalary'>
          <IconMapPin style={{ width: rem(16), height: rem(16) }} /><span>{jobdata.company.city}</span>
        </div>
        <div className='jobSalary'>
          <IconUsers style={{ width: rem(16), height: rem(14) }} /><span style={{marginLeft:"5px"}}>{jobdata.positions}</span>
        </div>
        <Badge color="orange" variant="light">
       {jobdata.jobType}
        </Badge>
    </div>
    <Divider  my="md" />
    <div className='skillsDiv'>
    <Text size="md" mb='sm'>Skills Required </Text>
    <div className='skills'>
    {
        jobdata.skillsRequired.map((skills)=>{
            return  <Badge variant="light" color="green" key={skills}>{skills}</Badge>
        })
    }
    </div>
    </div>
    <Divider  my="md" />
    </div>
</div>


  <Button color="blue" mt="md" disabled ={disabelBtn} radius="sm" variant="gradient" onClick={handleApply} gradient={{ from: 'indigo', to: 'blue', deg: 90 }}>
    
    {disabelBtn ? "Applied" : "Apply"}
  </Button>
</Card>
}

export default React.memo(Jobcard)
