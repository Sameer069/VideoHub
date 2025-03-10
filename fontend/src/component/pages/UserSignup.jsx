import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { TextField ,Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Homepage from './home'
import axios from "axios"
import * as yup from "yup"
import { useCookies } from 'react-cookie'
function UserSignup() {
  const[userEmailError,setEmailUsererror]=useState("")
  
   const[userError,setUsererror]=useState("")
   const[hide,setHide]=useState(true)
   const navigate=useNavigate()
   const[cookie,setCookie,removeCookie]=useCookies(["token"])
   const token=cookie["token"]
  
    const formik=useFormik({
        initialValues:{
            Username:"",
            email:"",
            password:""
        },
        validationSchema:yup.object({
          Username:yup.string().required("username is required"),
          email:yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"eg:example@gmail.com").required("email is required"),
          password:yup.string().required("password is required")
        }),
        onSubmit:(async value=>{
         
            await axios.post("http://127.0.0.1:3003/user-register",value)
            .then(response=>{
              if(response.status===200){
                setHide(true)
                navigate("/signin")
              }
            }).catch(err=>{
              if(err.response.status===401){
                setEmailUsererror(err.response.data.msg)
                setHide(false)
                setUsererror("")
                console.log(err.response.data.msg)
               
              }
              else if(err.response.status===402){
                setUsererror(err.response.data.msg)
                setEmailUsererror("")
                setHide(false)
                console.log(err.response.data.msg)
               
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
  return (
    <>
    <div>
    <Homepage/>
</div>
    <div className='h-[90vh] flex justify-center items-center bg-stone-600 '>
    <div className=' p-[35px]  bg-white rounded-[10px] w-[300px]' >
      <div><h3 className='my-[10px] text-[30px] font-bold'>Sigup</h3></div>
      <div>
      <form noValidate onSubmit={formik.handleSubmit}>
      <div className='my-[10px]'>
      <TextField onChange={customChnage}   id="Username" name='Username'  className='w-[100%] text-[15px]' label="username" variant="standard" />
      <span className=' text-red-700'>{formik.errors.Username}</span>
      <span className={` text-red-700 ${hide?"hidden":"inline"}`}>{userError}</span>
      </div>
      <div className='my-[10px]'>
      <TextField onChange={customChnage}   id="email" name='email'  className='w-[100%] ' label="email" variant="standard" />
      <span className=' error text-red-700 text-[15px]'>{formik.errors.email}</span>
      <span className={`text-red-700 ${hide?"hidden":"inline"}`}>{userEmailError}</span>
      </div>
      <div><TextField type='password'  onChange={formik.handleChange} id="password" className='w-[100%] text-[15px]' name='password' label="password" variant="standard" />
      <span className=' error text-red-700'>{formik.errors.password}</span>
      </div>
      <div className='my-5'>
         <Button className='cursor-pointer' type='submit' variant='contained'>Signup</Button>
      </div>
      </form>
      <div>
          Have an account ?<Link className='mx-1 underline' to="/signin">Signin</Link>
      </div>

      </div>
    </div>
    </div>
    </>

  )
}

export default UserSignup
