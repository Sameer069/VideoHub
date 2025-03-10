import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToSaveList } from '../../slicer/Video-slicer';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';



function Videopannel() {
        const[urls,setUrl]=useState([])
        const inputRef=useRef(null)
        const [userDetails,setuserDetails]=useState({_id:""})
        const[userid,setuserid]=useState(localStorage.getItem("userid"))
        const navigate = useNavigate();
        const[cookie,setCookie,removeCookie]=useCookies(["token"])
        const dispatch=useDispatch()
        const videoExist=useSelector((state)=>state.user.history)
        const token=cookie["token"]
      

        const handleVideoInputClick=async(videourl,userVideoid,videos)=>{
          const formdata=new FormData()
          formdata.append("userWatchid",userVideoid)
          formdata.append("urlid",videourl)
           try{
              const response=await axios.post(`https://videohub-z726.onrender.com/videos/add-video-list`,formdata)
             if(response.status===200){
              dispatch(addToSaveList(response.data.videoView))
             
             }
             else if(response.status===201){
               
                 const existVideo=videoExist.find(video=>video._id===response.data.videoView._id)

                if(!existVideo){
                  
                  dispatch(addToSaveList(response.data.videoView))
                
                    
                 
                }
            
               
                
             }
              
           }
           catch{

           }
           
          } 
        useEffect(()=>{
            const fetchData=async()=>{
             try{
              const response= await axios.get(`https://videohub-z726.onrender.com/videos/get-videos`)
             
              const responseUser= response.data.allvideo.map(user=>{
               const now=new Date()
               const time=new Date(user.post_date)
               
               const diffTime=now-time;
               
               const seconds =Math.abs( Math.floor((diffTime / 1000) % 60));
               const minutes = Math.abs(Math.floor((diffTime / 1000 / 60) % 60));
               const hours = Math.abs(Math.floor((diffTime / (1000 * 60 * 60)) % 24));
               const days = Math.abs(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
              
              
                  if(days!=0){
                    
                      
                      let userDetails={...user,post_date:`${days} days`}
                      return userDetails
                    
                  }
                  else if(hours<=24 && hours!=0){
                   let userDetails={...user,post_date:`${hours} hrs`}
                  
                   return userDetails;
                  }
                  else if(minutes<=60 ){

                   let userDetails={...user,post_date:`${minutes} min`}
               
                   return userDetails;
                  }
                  else{
                   let userDetails={...user,post_date:`${seconds} sec`}
                   
                   return userDetails;
                  }
               
            
           })
           setUrl(responseUser)
           
             }
             catch(err){
                console.log(err)
             }
                 
            }
            fetchData()
      
           
        },[userid])

       

        useEffect(() => {
          const fetchData=async()=>{
              try{
                const response=await axios.get(`https://videohub-z726.onrender.com/get-user/${userid}`,{
                  headers:{Authorization:`Bearer ${token}`}
                })
                setuserDetails(response.data.userDetails)
              }
              catch{

              }
          }
          fetchData()
        }, [location.pathname]);

  
       
  return (
    <div className="max-[768px]:w-full  ">
    <div className='flex flex-wrap max-[768px]:flex-col w-full  gap-2'>

    {
     
      
        urls.map((url,i)=>{

           return <div className='w-[300px] max-[768px]:w-[100%] ' key={i}>
          
              <div id={`youtube-iframe-${i}`}  className='w-[100%] relative h-[200px]'> <iframe width="100%" height="200px" src={`https://www.youtube.com/embed/${url.url}`}></iframe>
              <Link to={`/watch/${url.url}`} onClick={(e)=>handleVideoInputClick(url.url,userid,url)}  className=' absolute w-[100%] top-0 left-0 bg-transparent h-[200px] cursor-pointer' ></Link>
              
            </div>
              <div className=' max-[768px]:px-[10px]'>
             <div className='flex items-center  h-[60px] overflow-hidden  '>
             <img src={`https://videohub-z726.onrender.com/upload/${url.user_id.profile}`} width="30" height="30" className='rounded-[50%]'/>
            <div className='mx-[10px]  h-[50px] overflow-hidden'>
            {url.title}
            
            </div>
            <div><MoreVertIcon/></div>
           
            </div>
            <div className='ps-[39px]  max-[768px]:flex max-[768px]:text-[0.8rem]'>
            <div className=' text-stone-500 me-1'>{url.user_id.user_name} <span className='max-[768px]:inline hidden'> •</span></div>
            <div className=' text-stone-500'><span>{url.views.length} views</span> •<span className='ms-1'>{url.post_date} ago</span></div>
            </div>
            </div>

             
           </div>
        })
    }
    
        
    </div>
    </div>
  )
}

export default Videopannel
