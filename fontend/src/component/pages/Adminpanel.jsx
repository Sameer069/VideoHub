import React, { useState,useEffect } from 'react'
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Adminpanel() {
  const[userid,setUserid]=useState(localStorage.getItem("userid"))
   const[cookie,setCookie,removeCookie]=useCookies(["token"])
   const token=cookie["token"]
   
   const navigate=useNavigate()
   const[user,setuser]=useState({
     user_name:""
   }
   
   )
 useEffect(()=>{
       const fetchUser=async()=>{
       
  
        if(cookie["token"] && userid ){
          await axios.get(`http://127.0.0.1:3003/get-user/${userid}`,{
            headers:{Authorization:`Bearer ${token}`}
          }).then(  response=>{
  
            setuser(response.data.userDetails)
            
          
           }).catch(err=>{
              if(err.response.status===404 || err.response.status===400){
                removeCookie("token")
                localStorage.removeItem("userid")
                
              }
              console.log(err)
           
           })
            
        }

       }

      
        fetchUser()
    
      
      
   },[userid,token])




    const formik=useFormik({
      initialValues:{
          title:"",
          description:"",
          category:"",
          userid:"",
          url:""

      },
      onSubmit:( async value=>{
           
          const videoDetails={...value,userid:user.user_name.toLowerCase(),category:value.category.toLowerCase().trim(),url:value.url.slice(value.url.lastIndexOf("/")+1).trim()}
          
        
                  
               try{
                    await axios.post("http://127.0.0.1:3003/videos/admin/add-video",videoDetails)
                   alert("Video added ")
                
               }
               catch(err){
                console.log(err)
               
               }
           
              
      })

    })
  return (
    <div className='bg-stone-500 h-[100vh] '>
          
    <div className=' h-[40px]'><Link to="/index"> <ArrowBackIcon   className=' absolute left-0 top-4' sx={{width:50, height:30,color:"white"}}></ArrowBackIcon></Link></div>
     <section className='flex justify-center items-center w-full  h-[85vh]   '>
           <div className='bg-stone-300 p-10 rounded-[10px] '>
              
              <form onSubmit={formik.handleSubmit}>

              <div>
              <TextField label="Title" name='title' onChange={formik.handleChange} variant="standard" />
              </div>

              <div className=' my-5'>
              <TextField label="Description" onChange={formik.handleChange} name='description' variant="standard" />
              </div>
             
                <div>
                <TextField label="Category" onChange={formik.handleChange} name='category' variant="standard" />
                </div>

                <div className='my-3'>
                <TextField  label="Youtube URL" onChange={formik.handleChange} name='url'  variant="standard" />
                </div>

                <div>
                <TextField  label="UserId" value={user.user_name} name='userid' variant="standard" />
                </div>
      
                
                 <div className='my-3' >
                 <Button  className='cursor-pointer' type='submit' variant='contained'>Submit</Button>
                 </div>

              </form>
           </div>
     </section>
       
         
    </div>
  )
}

export default Adminpanel
     