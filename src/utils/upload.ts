import axios from "axios"

export const uploadProfile = (file:File, setPic : Function , setProfileName : Function) =>{
    if(!file){
      console.log("no file selected")
      return
    }
  
    const toUpload = new FormData()
    toUpload.append('files', file)
  
  
  
   axios.post("files", toUpload , {
    headers : {
      "Content-Type" : "multipart/form-data"
    }
   }).then((res)=>{
    setPic(res.data.fileName)
    setProfileName(res.data.fileName)
   }).catch((err)=>{
    console.log(err)
   })
  }