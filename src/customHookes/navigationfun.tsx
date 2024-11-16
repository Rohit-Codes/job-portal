import { useNavigate } from "react-router-dom"


export const useNaviatefunction = () =>{

const navigate = useNavigate()

const navigatefun = (url : string)=>{
  navigate(url)
}
return navigatefun
}
