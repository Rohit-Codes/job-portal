import React, { useEffect, useState } from 'react'
import "./Auth.css"
import { Card, Button,} from '@mantine/core';
import { TextInput,rem  } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { Select } from '@mantine/core';
import { Loader, Text, Divider } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { Avatar } from '@mantine/core';
import { uploadProfile } from '../../utils/upload';
import { useNaviatefunction } from '../../customHookes/navigationfun';
import BackBtn from '../../components/buttons/BackBtn';

export interface SignupDetailsprops {
    name : string | null
    email : string | null,
    phone : string | null,
    password : string | null
    confirmPassword : string | null,
    role? : string | null,
    pic? : string | null
}

//axios.defaults.baseURL = 'http://localhost:8003/api/v1/files/';

const Signup:React.FC = () => {
    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;


    const authData = useAuthContext()
    const navigatefun = useNaviatefunction()

   
    const [userDetails, setUserDetails] = useState<SignupDetailsprops>({
        name : null,
        email : null,
        phone : null,
        password : null,
        confirmPassword : null,
    })

    const [role, setRole] = useState<string | null>('')
    const [file, setFile] = useState<File | null >(null)
    const [pic, setPic] = useState<string | null >(null)
    const [profileName , setProfileName] = useState<string | null >(null)


const signUp = () =>{

    authData?.singup({...userDetails, role,pic})
    navigatefun("/")
}


console.log(pic)
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setFile(e.target.files[0]);
  }
};



useEffect(()=>{
 file && uploadProfile(file,setPic,setProfileName)
}, [file])


  return <div className='signUpContainer'>
    <div className='backBtnDiv'> <BackBtn text="Back to Homepage" onNavigate={navigatefun}/></div>
    <div className='signupBox'>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Text size="xl" fw={700}>
    Welcome to our Job Portal | Sign Up
      </Text>

      <Divider my="md" />
  { authData?.loading ? <div className='loaderDiv'>
    <Loader color="blue" type="bars" />
    </div> : null}
    <div className='profilePhoto'>
    <Avatar src={`http://localhost:8003/${pic}`} alt="it's me" radius="xl" size="lg" />
     <input type='file' onChange={handleFileChange}/>
     <Text size="sm" mt="sm">{!profileName ?"Upload Profile Pic" : profileName}</Text>
    </div>
    <TextInput
      label="Name"
      required
      placeholder="Name"
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
       setUserDetails({...userDetails, 
        name : e.target.value
       })
      }}
    />
       <TextInput
        mt="sm"
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="email"
        placeholder="email"
        required
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setUserDetails({...userDetails, 
             email : e.target.value
            })
           }}
      />
      <TextInput
      label="Phone"
      required
      mt="md"
      placeholder="Phone"
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails({...userDetails, 
         phone : e.target.value
        })
       }}
    />
     <TextInput
      label="Password"
      required
      mt="md"
      placeholder="Password"
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails({...userDetails, 
         password : e.target.value
        })
       }}
    />
      <TextInput
      label="Confirm Password"
      required
      mt="md"
      placeholder="Confirm Password"
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserDetails({...userDetails, 
         confirmPassword : e.target.value
        })
       }}
    />
     <Select
      label="Who you are"
      placeholder="Who you are"
         mt="md"
      data={['Jobseeker', 'Recruiter']}
      onChange={setRole}
    />
    <Button
      variant="gradient"
      mt="md"
      gradient={{ from: 'indigo', to: 'blue', deg: 90 }}
      onClick={signUp}
    >Signup
    </Button>
    <Divider my="md" />
  <Text size="md" fw={700} style={{display:"flex",alignItems :"center"}}>
   Already have a account | <Text onClick={()=>{navigatefun("/signin")}} c="blue" ml="sm" style={{cursor:"pointer"}}>Signin</Text>
    </Text>
    </Card>
    </div>
   
  </div>
}

export default React.memo(Signup)
