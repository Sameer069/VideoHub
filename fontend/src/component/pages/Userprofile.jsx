import axios from 'axios'
import React, { useContext,useEffect, useState,useRef } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { deleteSavelist } from '../../slicer/Video-slicer'


function Userprofile({profilePic,username}) {

   const videoHistory=useSelector((state)=>state.user.history)
    const dispatch=useDispatch()
    const[Userprofile,setUserprofile]=useState()
    const[userid,setUserid]=useState(localStorage.getItem("userid"))
    const[cookie,setCookie,removeCookie]=useCookies(["token"])
    const inputRef=useRef(null)
    const inputHiddenRef=useRef(null)
    const[preview,setPreview]=useState(null)
    const navigate=useNavigate()

    const historyClearClick=()=>{
      dispatch(deleteSavelist())
    }

    function handleLogoutclick(){

       removeCookie("token")
       localStorage.removeItem("userid")
       navigate("/signin")

    }

    const inputimgClick=()=>{
      inputRef.current.click()
    }
    const handleImgchhange=async(event)=>{
      const userId=inputHiddenRef.current.value;
    
      const file=event.target.files[0];
      if(!file) return alert("select file")
      setPreview(URL.createObjectURL(file))
      const formData=new FormData();
      formData.append("File",file)
      formData.append("userid",userId)
     
      const response =await axios.post(`https://videohub-z726.onrender.com/user-profile-update`,formData)
     
     
  }
  return (
    
     <div className=' px-[10px]'>

       <div className='w-full flex items-center  relative h-[100px]  '> 
      
         <div >

          <img src={preview ||profilePic} width="60" height="60" className="rounded-[50%] cursor-pointer"  onClick={inputimgClick}  />
          
           <input type='file'  ref={inputRef} name='uploadPic' onChange={handleImgchhange} className=' hidden'/ >
           <input type='hidden' ref={inputHiddenRef} value={userid} />
           
          

          </div>
          <div className='w-[300px'>

             <div className='ms-6 text-[20px] ]'>{username}</div>

          </div>
          <div>
          <button className='bg-red-600 text-white rounded-[10px] top-[30px] right-[10px] p-[10px] absolute cursor-pointer' onClick={handleLogoutclick}>Logout</button>
       </div>

            
       </div>

       <div className='mt-3   w-[100%]'>

       <div className='flex justify-between'>
       <div>   <h1 className='text-[1.4rem]'>History</h1></div>
       <div><Button onClick={historyClearClick} sx={{color:"black"}}>Clear</Button></div>
       </div>
          

          <div className='flex gap-4 md:flex-wrap w-[100%]  max-[768px]:overflow-x-auto'>{
         
            videoHistory.map((video,i)=>{
               return <div key={i} className=' max-[768px]:w-[150px]  w-[300px]   ' >
               
                  <div className='relative w-[300px]  max-[768px]:w-[150px]'>
                  <iframe width="100%"  className='rounded-[10px] max-[768px]:h-[100px] h-[200px]' src={`https://www.youtube.com/embed/${video.url}`}/>
                   <Link className='absolute top-0 left-0   cursor-pointer w-full h-[100%]' to={`/watch/${video.url}` }></Link>
                  </div>
                  <div className='max-[768px]:h-[50px] text-ellipsis max-[768px]:overflow-hidden   w-full  '>
               

                   <div> {video.title}</div>
                  </div>
                  <div className='flex text-center'>
                  
                   <div className='text-stone-600'>{video.user_id.user_name}</div>
                  </div>
                  <div className='text-stone-600'>{video.views.length} views</div>

               
               </div>
              })
            
         
         
          }</div>
       </div>

        
       </div>
  )
}

export default Userprofile
