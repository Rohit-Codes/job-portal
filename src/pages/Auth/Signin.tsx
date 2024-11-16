import React, {useState } from 'react'
import "./Auth.css"
import { Card, Button,} from '@mantine/core';
import { TextInput,rem  } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { Loader, Text, Divider } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { useNaviatefunction } from '../../customHookes/navigationfun';
import BackBtn from '../../components/buttons/BackBtn';


export interface LoginDetailsprops {
    email : string | null,
    password : string | null
}


const Signin:React.FC = () => {

    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

    const [userDetails, setUserDetails] = useState<LoginDetailsprops>({
        email : null,
        password : null,
    })

    const authData = useAuthContext()
    const navigatefun = useNaviatefunction()
const handleLogin = () =>{
    authData?.signin(userDetails)
    navigatefun("/")
}

  return <div className='signUpContainer'>
    <div className='backBtnDiv'> <BackBtn text="Back to Homepage" onNavigate={navigatefun}/></div>
   
  <div className='signupBox'>
  <Card shadow="sm" padding="lg" radius="md" withBorder>
  <Text size="xl" fw={700}>
   Welcome to our Job Portal | Sign In
    </Text>

    <Divider my="md" />
 {authData?.loading ? <div className='loaderDiv' >
  <Loader color="blue" type="bars" />
  </div> : null}

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


  <Button
    variant="gradient"
    mt="md"
    gradient={{ from: 'indigo', to: 'blue', deg: 90 }}
    onClick={handleLogin}
  >Login
  </Button>
  <Divider my="md" />
  <Text size="md" fw={700} style={{display:"flex",alignItems :"center"}}>
   Dont'have a account | <Text onClick={()=>{navigatefun("/signup")}} c="blue" ml="sm" style={{cursor:"pointer"}}>Signup</Text>
    </Text>


  </Card>
  </div>
 
</div>
}

export default Signin
