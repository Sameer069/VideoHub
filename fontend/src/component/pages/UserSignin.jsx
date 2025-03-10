import React, { useContext, useEffect, useRef, useState } from 'react'
import {Button, TextField} from "@mui/material"
import { useFormik} from "formik"
import { Link ,useNavigate} from 'react-router-dom'
import * as yup from "yup";
import { useCookies } from 'react-cookie';
import Homepage from './home'
import { UserdataContext } from '../context/Usercontext'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
function UserSignin() {
    const navigate=useNavigate()
    const[cookie,setCookie,removeCookie]=useCookies(["token"])
    const[userpassError,setpassUsererror]=useState("")
    const[userError,setUsererror]=useState("")
    const[hide,setHide]=useState(true)
    const[modal,setModal]=useState(false)
    const[modalInput,setModalinput]=useState(false)
    const inputValue=useRef()
    const token=cookie["token"]  
    const[passwordChangeError,setPassWordchangeError]=useState()
    const{user,setUser}=useContext(UserdataContext)
    const formik=useFormik({

    initialValues:{
        email:"",
        password:""
    },
    validationSchema:yup.object({
      email:yup.string().required("email is required"),
      password:yup.string().required("password is required")
    }),
    onSubmit:(async value=>{
           const signuser={...value,email:value.email.toLowerCase()}
          await axios.post(`https://videohub-z726.onrender.com/user-login`,signuser,{withCredentials:true}).then(response=>{
         
           setCookie("token",response.data.userData,{expires: new Date(Date.now() + 7*24*60 * 60 * 1000) })
           setUser(response.data.userData)
           localStorage.setItem("userid",response.data.response._id)
           navigate("/index")
         
          
        }).catch(err=>{
          if(err.response.status===404){
           
            setUsererror(err.response.data.msg)
            setpassUsererror("")
            setHide(false)
          
          }
          else{
             
            setpassUsererror(err.response.data.msg)
            setUsererror("")
            setHide(false)
          }
        })
         
    })
  
    
  })
  function customChnage(event){
      setHide(true)
     const {name,value}=event.target;
     formik.setFieldValue(name,value)   
    
  }
  useEffect(()=>{
        if(token){
         navigate("/index")
        }
     },[hide,token])

  const formikChange=useFormik({
    initialValues:{
      ChangeEmail:"",
      ChangePassword:""
    },
    validationSchema:yup.object({
      ChangeEmail:yup.string().required("email required"),
      ChangePassword:yup.string().required("password required")
    }),
    onSubmit:(async value=>{
        const user={...value,ChangeEmail:value.ChangeEmail.toLowerCase()}
       try{
          const response=await axios.post(`https://videohub-z726.onrender.com/change-password`,user)
          if(response.status===200){
            setModal(false)
             
          }
       }
       catch(err){
         if(err.response.status===404){
          setModalinput(false)
           setPassWordchangeError(err.response.data.msg)
         }
       }
    })
  })
   const handleModalClick=()=>{
      setModal(true)
   }
   const handleCancelModal=()=>{
    setModal(false)
   }
   const handleChange=(e)=>{
      setModalinput(true)
      const{name,value}=e.target
      formikChange.setFieldValue(name,value)
   }
   
  return (
    <>
      <div>
        <Homepage></Homepage>
      </div>

      
   
    <div className='h-[90vh] flex justify-center items-center bg-stone-600'>
    
    <div className={`p-[35px]  bg-stone-200 rounded-[10px] w-[300px] z-10 absolute ${modal?"top-[2%]":"top-[-100%]"} `}>
     <div className=' relative'>
     Forget Password😊
     <div  onClick={handleCancelModal} className='absolute top-0 cursor-pointer right-0'><CloseIcon ></CloseIcon></div>
     </div>
       <form onSubmit={formikChange.handleSubmit}>
       <div className='my-5'>
       <TextField onChange={handleChange} className='w-full ' name='ChangeEmail' label="email" variant="standard"></TextField>
       <span className={modalInput?"hidden":"text-red-600 inline "}>{passwordChangeError}</span>
       </div>
       <div>
         <TextField  onChange={handleChange}  className='w-full' name='ChangePassword' label="New password" variant="standard"></TextField>
         <span className='text-red-600'>{formikChange.errors.ChangePassword}</span>
       </div>
       <div className='mt-5'>
         <Button type='submit' sx={{backgroundColor:"red",color:"white",cursor:"pointer"}}>Reset</Button>
       </div>
       </form>
     </div>

    <div className=' p-[35px]  bg-white rounded-[10px] w-[300px]' >
      <div><h3 className='my-[10px] text-[30px] font-bold'>Signin</h3></div>
      <div>
      
      <form  onSubmit={formik.handleSubmit}>
      <div className='my-[10px]'>
      <TextField onChange={customChnage} id="email" name='email' value={formik.values.email}  className='w-[100%] ' label="email" variant="standard" />
      <span className=' text-red-700'>{formik.errors.email}</span>
      <span className={` text-red-700 ${hide?"hidden":"inline"}`}>{userError}</span>
      </div>
      <div><TextField type='password' onChange={customChnage} value={formik.values.password} id="password" className='w-[100%] ' name='password' label="password" variant="standard" />
      <span className={` text-red-700 `}>{formik.errors.password}</span>
      <span className={` text-red-700 ${hide?"hidden":"inline"}`}>{userpassError}</span>
      </div>
      <div className='mt-2 h-[7px]'><span onClick={handleModalClick} className=' float-right cursor-pointer text-[13px]'>Forget Password?</span></div>
      <div className='my-5'>
         <Button type='submit' variant='contained'>Signin</Button>
      </div>
      </form>
        <div>
           <span className='text-[13px]'> Don't have an account ?<Link className='mx-1 underline' to="/">Signup</Link></span>
        </div>
      </div>
    </div>
    </div>
     </>
  )
}

export default UserSignin
