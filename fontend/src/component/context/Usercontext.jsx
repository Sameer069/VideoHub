import React,{createContext, useState} from 'react'
export const UserdataContext=createContext()
const Usercontext=({children}) =>{

const [user,setUser]=useState()
  return (
    <UserdataContext.Provider  value={{user,setUser}} >
       {children}
    </UserdataContext.Provider>
  )
}

export default Usercontext
