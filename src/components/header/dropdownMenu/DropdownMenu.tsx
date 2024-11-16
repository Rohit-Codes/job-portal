import React from 'react'
import { Menu, Text, rem,Avatar  } from '@mantine/core';
import {
  IconSettings,
  IconUser,
  IconMessageCircle,
  IconTrash,
} from '@tabler/icons-react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNaviatefunction } from '../../../customHookes/navigationfun';


const DropdownMenu:React.FC = () => {

const authData = useAuthContext()


const useNaviate = useNaviatefunction()

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
      <Avatar variant="filled" radius="xl" size="md" style={{cursor : "pointer"}} src={`http://localhost:8003/${authData?.user?.pic}`}/>
      </Menu.Target>

      <Menu.Dropdown>
        <Text size="md" fw={500} ml="md" mt="sm" mb="sm">{authData?.user?.name}</Text>
        <Menu.Divider />
        <Menu.Label>About</Menu.Label>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />} onClick={()=>{authData?.user?.role == "Jobseeker" ? useNaviate("/profile/innerprofile") : useNaviate("/profile/comapanyprofile")}}>
          My Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>



        <Menu.Divider />

        <Menu.Label>Others</Menu.Label> 

        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default React.memo(DropdownMenu)
