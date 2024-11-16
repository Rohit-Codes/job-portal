import React, { useEffect, useState } from 'react'
import {Container, Divider, Grid, GridCol, Select,TextInput, Title,rem,TagsInput, Textarea,Badge , Button,Avatar,Loader   } from "@mantine/core"

import { IconAt ,IconCurrencyRupee,IconBriefcase,IconMapPin} from '@tabler/icons-react';
import { useAuthContext } from '../../context/AuthContext';
import { useProfileContext } from '../../context/ProfileContext';




export interface EditCompleteProfileprops {
  editname :  string | null | undefined,
  jobtitle : string | null | undefined,
  phone : string | null | undefined,
  email : string | null | undefined
  currentSalary : string | null | undefined,
  expectedSalary : string | null | undefined,
  Experience : string | null | undefined,
  Age :string | null | undefined,
  skills? : string[],
  country? : string | null,
  city? : string | null,
  completeaddress : string | null | undefined,
  description : string | null | undefined,
  
}


const Myprofile:React.FC = () => {
  const profileAllData = useProfileContext();
const authData = useAuthContext();

const [country, setSelectedCountry] = useState<string | null>(null);
const [city, setCity] = useState<string | null>(null);
const [pic, setPic] = useState<string | undefined>(undefined);
const [skills, setSkills] = useState<string[]>([]);
const [editDetails, setEditDetails] = useState<EditCompleteProfileprops>({
  editname: undefined,
  jobtitle: undefined,
  phone: undefined,
  email: undefined,
  currentSalary: undefined,
  expectedSalary: undefined,
  Experience: undefined,
  Age: undefined,
  completeaddress: undefined,
  description: undefined,
});


  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const rupeeIcon = <IconCurrencyRupee style={{ width: rem(16), height: rem(16) }} />;
  const expIcon = <IconBriefcase style={{ width: rem(16), height: rem(16) }} />;
  const locationIcon = <IconMapPin style={{ width: rem(16), height: rem(16) }} />;


const submitProfile = () =>{
  profileAllData?.completeprofile({...editDetails,country,city,skills })
  
}


// Use useEffect to update state when profileAllData and authData are available
useEffect(() => {
  if (profileAllData?.profileData) {
    setSelectedCountry(profileAllData.profileData.country ?? 'india');
    setCity(profileAllData.profileData.city ?? null);
    setSkills(profileAllData.profileData.skills ?? []);
    setEditDetails((prevDetails) => ({
      ...prevDetails,
      jobtitle: profileAllData?.profileData?.jobtitle,
      currentSalary: profileAllData?.profileData?.currentSalary,
      expectedSalary: profileAllData?.profileData?.expectedSalary,
      Experience: profileAllData?.profileData?.Experience,
      Age: profileAllData?.profileData?.Age,
      completeaddress: profileAllData?.profileData?.completeaddress,
      description: profileAllData?.profileData?.description,
    }));
  }

  if (authData?.user) {
    setPic(authData.user.pic);
    setEditDetails((prevDetails) => ({
      ...prevDetails,
      editname: authData?.user?.name,
      phone: authData?.user?.phone,
      email: authData?.user?.email,
    }));
  }
}, [profileAllData, authData]);


  return (
    <div className='profileInnerContainer'>
      {profileAllData?.loading ?<div className='loaderInnerDiv'><Loader color="blue" type="bars" /></div> :
      <div className='profileConntent'>

      <Container fluid >
      <Title order={1} style={{display :"flex", alignItems : "center"}}> Profile {profileAllData?.profileData? null : <Badge variant="dot" color="blue" size="lg" radius="xs" ml="sm">Complete Your Profile</Badge>}</Title>
      <Divider my="md" />
        <Grid>
        <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
        <div className='profileImgDiv'>
        <Avatar  radius="lg" size="xl" src={`http://localhost:8003/${pic}`} />
        <input type="file" />
        </div>
          </GridCol>
        <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
        value={editDetails.editname ?? ""}
      label="Full Name"
      placeholder="Full Name"
      disabled={true}
      onChange={(e)=>{
        setEditDetails({...editDetails,
          editname : e.target.value
        })
      }}
    />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
      label="Job Title"
      value={editDetails?.jobtitle ?? ""}
      disabled={true}
      onChange={(e)=>{
        setEditDetails({
          ...editDetails,
          jobtitle : e.target.value
        })
      }}
      placeholder="Job Title"
    />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
        value={editDetails.phone ?? ""}
        disabled={true}
      label="Phone"
      placeholder="Phone"
      onChange={(e)=>{
        setEditDetails({...editDetails,
          phone : e.target.value
        })
      }}
    />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        value={editDetails.email ?? ""}
        disabled={true}
        label="Email"
        placeholder="email"
        onChange={(e)=>{
          setEditDetails({...editDetails,
            phone : e.target.value
          })
        }}
        type='email'
      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        disabled={true}
        leftSection={rupeeIcon}
        label="Current Salary"
        placeholder="Current Salary"
        value={editDetails.currentSalary ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            currentSalary : e.target.value
          })
        }}
        type='number'
      /> </GridCol>
      <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        disabled={true}
        leftSection={rupeeIcon}
        label="Expected Salary"
        placeholder="Expected Salary"
        value={editDetails.expectedSalary ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            expectedSalary : e.target.value
          })
        }}
        type='number'
      /> </GridCol>
        <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        disabled={true}
        leftSection={expIcon}
        label="Experience"
        placeholder="experience"
        value={editDetails?.Experience ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            Experience : e.target.value
          })
        }}
        type='text'
      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        disabled={true}
        label="Age"
        placeholder="age"
        type='text'
        value={editDetails?.Age ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            Age : e.target.value
          })
        }}
      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
       <TagsInput disabled={true} data={[]} value={skills} onChange={setSkills} label="Press Enter to submit the skills" placeholder="Enter skills" />
       
       </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <Select
      label="Country"
      placeholder="Country"
      disabled={true}
      data={['India']}
      searchable
      value={country}
      onChange={setSelectedCountry}
    />
          </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <Select
      label="City"
      disabled={true}
      value={city}
      placeholder="City"
      data={["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", 
            "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", 
            "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", 
            "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", 
            "Howrah", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", 
            "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Bareilly", "Mysore", "Tiruchirappalli", "Tiruppur", 
            "Salem", "Aligarh", "Gurgaon", "Noida", "Jamshedpur", "Bhubaneswar", "Bikaner", "Warangal", "Cuttack", 
            "Firozabad", "Kochi", "Dehradun", "Durgapur", "Ajmer", "Jamnagar", "Udaipur", "Margao", "Siliguri", "Panaji"]}
      searchable
      onChange={setCity}
    />
          </GridCol>   
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        leftSection={locationIcon}
        disabled={true}
        label="Address"
        placeholder="experience"
        value={editDetails?.completeaddress ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            completeaddress : e.target.value
          })
        }}
        type='text'
      />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Textarea
        label="About You"
        disabled={true}
        placeholder="About You"
        size="md"
        value={editDetails?.description ?? ""}
        onChange={(e)=>{
          setEditDetails({
            ...editDetails,
            description : e.target.value
          })
        }}
      />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Button mr='sm' onClick={submitProfile}>Submit</Button>
          <Button variant="outline">Reset</Button>
          </GridCol>
        </Grid>
      </Container>
      </div>}
    </div>
  )
}

export default React.memo(Myprofile)
