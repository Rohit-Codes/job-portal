import React, { useEffect, useState } from 'react'
import {Container, Divider, Grid, GridCol, Select,TextInput, Title,rem,TagsInput, Textarea,Badge , Button,Avatar,Loader   } from "@mantine/core"

import { IconAt ,IconCurrencyRupee,IconBriefcase,IconMapPin} from '@tabler/icons-react';
import { uploadProfile } from '../../utils/upload';
import { useCompanyContext } from '../../context/CompanyContext';





export interface CompanyProps {
  companyName:  string | null
  companyEmail : string | null
  companyPhone : string | null
  companyWebsite : string | null 
  totalEmployees : string | null
  companyType : string[] | null
  country? : string | null,
  city? : string | null,
  address : string | null,
  description : string | null | undefined,
  companyLogo? : File|null,
  foundedin : string | null,
  _id? : string | null
}


const CompanyProfile:React.FC = () => {
  

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  const locationIcon = <IconMapPin style={{ width: rem(16), height: rem(16) }} />;

  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [companyFile , setCompanyFile] = useState<File | null>(null)
  const [picName, setPicName] = useState<string|null>(null)
  const [companyType, setCompanyType] = useState<string[]>([])
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)

  
  const companyData = useCompanyContext()


  const [companyDetails, setCompanyDetials]= useState<CompanyProps>({
    companyName : null,
    companyEmail : null,
    companyPhone : null,
    companyWebsite : null,
    totalEmployees : null,
    companyType : null,
    address : null,
    description : null,
    foundedin : null,
    
  })




 useEffect(()=>{

  if(companyData?.company){

    setCompanyLogo(companyData.company.companyLogo ?? null)
    setCompanyType(companyData.company.companyType ?? [])
    setCity(companyData.company.city ?? null)
    setCountry(companyData.company.country ?? null)
    setCompanyDetials({
      ...companyDetails,
      companyName : companyData.company.companyName,
      companyEmail : companyData.company.companyEmail,
      companyPhone : companyData.company.companyPhone,
      companyWebsite : companyData.company.companyWebsite,
      totalEmployees : companyData.company.totalEmployees,
      companyType : companyData.company.companyType,
      address : companyData.company.address,
      description : companyData.company.description,
      foundedin : companyData.company.foundedin
    })
 
  }

 },[companyData])


const handleCompanyData = () =>{
  companyData?.addCompany({...companyDetails,companyLogo, city, country, companyType})
}

useEffect(()=>{
  if(companyFile){
  uploadProfile(companyFile,setCompanyLogo, setPicName)
  }
},[companyFile])



  return companyData?.loading ? <h1>loading.....</h1> :<> <div className='profileInnerContainer'>
  
      <div className='profileConntent'>

      <Container fluid >
      <Title order={1} style={{display :"flex", alignItems : "center"}}>Company Profile {!companyData?.company ?<Badge variant="dot" color="blue" size="lg" radius="xs" ml="sm">Complete Your Profile</Badge> : null}</Title>
      <Divider my="md" />
        <Grid>
        <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
        <div className='profileImgDiv'>
        <Avatar  radius="lg" size="xl" src={`http://localhost:8003/${companyLogo}`} />
        <input type="file" onChange={(e)=>{
         e.target.files && setCompanyFile(e.target.files[0])
        }}/>
        </div>
          </GridCol>
        <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
        value={companyDetails.companyName ?? ""}
       onChange={(e)=>{
        setCompanyDetials({
          ...companyDetails,
          companyName : e.target.value
        })
       }}
      label="Company Name"
      placeholder="Company Name"

    />
          </GridCol>

          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput
        value={companyDetails.companyPhone ?? ""}
        onChange={(e)=>{
          setCompanyDetials({
            ...companyDetails,
            companyPhone : e.target.value
          })
        }}
      label="Company Phone"
      placeholder="Company Phone"

    />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
          value={companyDetails.companyEmail ?? ""}
        leftSectionPointerEvents="none"
        leftSection={icon}
      onChange={(e)=>{
        setCompanyDetials({
          ...companyDetails,
          companyEmail : e.target.value
        })
      }}

        label="Company Email"
        placeholder="Company Email"

        type='email'
      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
          value={companyDetails.companyWebsite ?? ""}
        leftSectionPointerEvents="none"
        onChange={(e)=>{
        setCompanyDetials({
        ...companyDetails,
        companyWebsite : e.target.value
        })
        }}
        label="Company Website"
        placeholder="Company Website"
      /> </GridCol>
      <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        value={companyDetails.totalEmployees ?? ""}
         onChange={(e=>{
         setCompanyDetials({
         ...companyDetails,
         totalEmployees : e.target.value
         })
         })}
        label="Total Employees"
        placeholder="Total Employees"
        
        
        type='number'
      /> </GridCol>

       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
    
        onChange={(e)=>{
          setCompanyDetials({
            ...companyDetails,
            foundedin : e.target.value
          })
        }}
        label="Founded In"
        placeholder="Founded In"
        type='date'

      /> </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
       <TagsInput  data={[]} value={companyType} label="Press Enter to submit the Type" placeholder="Company Type" onChange={setCompanyType} />
       
       </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <Select
      label="Country"
          placeholder="Country"
          value={country}
          onChange={setCountry}
      data={['India']}
      searchable
    
    />
          </GridCol>
       <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <Select
      label="City"
      placeholder="City"
      value={city}
      onChange={setCity}
      data={["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", 
            "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", 
            "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", 
            "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", 
            "Howrah", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", 
            "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Bareilly", "Mysore", "Tiruchirappalli", "Tiruppur", 
            "Salem", "Aligarh", "Gurgaon", "Noida", "Jamshedpur", "Bhubaneswar", "Bikaner", "Warangal", "Cuttack", 
            "Firozabad", "Kochi", "Dehradun", "Durgapur", "Ajmer", "Jamnagar", "Udaipur", "Margao", "Siliguri", "Panaji"]}
      searchable
      
    />
          </GridCol>   
          <GridCol  span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput
        leftSectionPointerEvents="none"
        value={companyDetails.address ?? ""}
        leftSection={locationIcon}
        onChange={(e)=>{
          setCompanyDetials({
            ...companyDetails,
            address : e.target.value
          })
        }}
        label="Address"
        placeholder="experience"
        
        type='text'
      />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Textarea
        label="Company Description"
        value={companyDetails.description ?? ""}
        onChange={(e)=>{
          setCompanyDetials({
            ...companyDetails,
            description : e.target.value
          })
        }}
        placeholder="Company Address"
        size="md"
      
      />
          </GridCol>
          <GridCol  span={{ base: 12, md: 6, lg: 12 }}>
          <Button mr='sm' onClick={handleCompanyData}>Submit</Button>
          <Button variant="outline">Reset</Button>
          </GridCol>
        </Grid>
      </Container>
      </div>
    </div>
    </>
  
}

export default React.memo(CompanyProfile)
