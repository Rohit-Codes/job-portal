import React from 'react'
import { Button } from '@mantine/core';

interface BackBtnProps {
  text : string,
  onNavigate : (url:string)=>void
}

const BackBtn:React.FC<BackBtnProps> = ({text, onNavigate}) => {


  return <Button variant="light" size="md" onClick={()=>{onNavigate("/")}}>{text}</Button>
}

export default React.memo(BackBtn)
