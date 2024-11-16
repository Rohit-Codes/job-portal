import React, { createContext, useContext } from 'react'
import io from "socket.io-client"

interface SocketChildProps {
    children : React.ReactNode
}

interface SocketContext {
    name : string
}

const createSocketContext = createContext<SocketContext | null>(null)

export const useSocketContext = ()=>{
    return useContext(createSocketContext)
}


const SocketContext:React.FC<SocketChildProps> = ({children}) => {

const socket = io("http://localhost:8003/")

socket.on("connect", () => {
    console.log("connected to backend"); // x8WIv7-mJelg7on_ALbx
  });

  return <createSocketContext.Provider value={{name : "rohit"}}>{children}</createSocketContext.Provider>
}

export default React.memo(SocketContext)
