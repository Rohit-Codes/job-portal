
import React from 'react'
import { IconSearch,IconMapPin,IconZoomReplace } from '@tabler/icons-react';
import Header from '../../components/header/Header'
import { Container, Grid, GridCol ,TextInput, rem , Button} from '@mantine/core'
import { useJobContext } from '../../context/JobContext';
import Jobcard from '../../components/jobcard/Jobcard';

const Home:React.FC = () => {

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const locationIcon = <IconMapPin style={{ width: rem(16), height: rem(16) }} />;

  const jobData = useJobContext()

  console.log(jobData?.jobs.length)

  return  <div className='mainContainer'>
<Header/>
<div className='headerBanner'>
<Container>
  <Grid>
    <GridCol span={12}>
      <h1>Modern the Job <span style={{color : "#226BC9"}}>Search</span> Exprience</h1>
      <p>Find Jobs, Employment & Career Opportunities</p>
      <div className='jobSearchDiv'>
      <TextInput
      size="md"
        leftSectionPointerEvents="none"
        leftSection={icon}
        placeholder="Job Title"
      />
        <TextInput
        size="md"
        leftSectionPointerEvents="none"
        leftSection={locationIcon}
        placeholder="Location"
      />
      <Button size="md" variant="gradient" gradient={{ from: 'indigo', to: 'blue', deg: 90 }} rightSection={<IconZoomReplace size={14} />}>Find Jobs</Button>
      </div>
    </GridCol>
  </Grid>
</Container>
</div>

<div className='featuresJobDiv'>
  <Container>
    <Grid >
      <GridCol span={12}><h1>Featured Jobs</h1>
      <span><p>Know your worth and find the job that qualify your life</p></span>
      </GridCol>

{ jobData?.jobs.length ==0 ? <h1>No jobs Created Here</h1> :<>
      {
        jobData?.jobs?.map((data)=>{
        return <GridCol span={{ base: 12, md: 6, lg: 4 }} key={data._id}>
          <Jobcard jobdata={data} />
        </GridCol>}
        )
      }
      </>}
      <GridCol span={12} style={{textAlign:"center"}}>  <Button variant="gradient" gradient={{ from: 'indigo', to: 'blue', deg: 90 }} size="md">Load More Jobs</Button></GridCol>
    </Grid>
  </Container>

</div>

<div className='footerDiv'>
  <p>All Rights Reserved @JOBWALA Inc</p>
</div>
</div>
  
}

export default React.memo(Home)
