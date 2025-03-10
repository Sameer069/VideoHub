import React ,{useContext, useEffect, useState}from 'react'
import { UserdataContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
const Userprotectwraper=({children}) =>{
    const {user,setUser}=useContext(UserdataContext)
    const [cookie,setCookie,removeCookie]=useCookies(["token"])
    const[userid,setuserid]=useState(localStorage.getItem("userid"))
    const token=cookie["token"]
     const navigate=useNavigate()
    useEffect(()=>{
      if(!token ||!userid){
        removeCookie('token')
        navigate("/signin")
       
      }
       
    },[token,userid])
  return (
    <div>
      {children}
    </div>
  )
}

export default Userprotectwraper;
