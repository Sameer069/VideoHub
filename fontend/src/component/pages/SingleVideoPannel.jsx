import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';

function SingleVideoPannel({videoUrl,userVideoInfo}) {
   
     const[togglelike,setToggleLike]=useState(false)
     const[toggledislike,setToggledislike]=useState(false)
     const[togglesave,setTogglesave]=useState(false)
     const[hideshow,sethideShow]=useState(false)
     const[comment,setcomment]=useState("")
     const[userid,setuserid]=useState(localStorage.getItem("userid"))
     const[ExpandDescription,setExpandDescription]=useState(false)
     const[TotalComment,setTotalComment]=useState([])
     const[cookie,setCookie,removeCookie]=useCookies(["token"])
     const[userComment,setUserComment]=useState({profile:"" })
      const token=cookie["token"]
   useEffect(()=>{
        const fetchData=async()=>{
            try{
             const response=await axios.get(`https://videohub-z726.onrender.com/get-user/${userid}`,{
               headers:{Authorization:`Bearer ${token}`}
             })
              setUserComment(response.data.userDetails)
            }         
            catch{

            }  
        }
        fetchData()
   },[])
  
   function handleChangeComment(e){
      setcomment(e.target.value)
      if(e.target.value===""){
         sethideShow(false)
      }
      else{
         sethideShow(true)
      }
   }


     const  handleCommentSubmit=async(e)=>{
         e.preventDefault()
        const formdata=new FormData()

        formdata.append("userCmtid",userid)
        formdata.append("Usercomment",comment)
        formdata.append("videoId",videoUrl)
         try{
            const response= await axios.post(`https://videohub-z726.onrender.com/videos/comment`,formdata);
           
         }
         catch{

         }
       setcomment("")
       sethideShow(false)

       
     }
     useEffect(()=>{
      
      const fetchComment=async()=>{

        const response=await axios.get(`https://videohub-z726.onrender.com/videos/commentlist/${videoUrl}`)
    
      const userCommentTotal= response.data.videoComment.comments.map(user=>{


         const now=new Date()
         const time=new Date(user.timestamp)
         
         const diffTime=now-time;
         
         const seconds =Math.abs( Math.floor((diffTime / 1000) % 60));
         const minutes = Math.abs(Math.floor((diffTime / 1000 / 60) % 60));
         const hours = Math.abs(Math.floor((diffTime / (1000 * 60 * 60)) % 24));
         const days = Math.abs(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
        
        
            if(days!=0){
              
                
                let userDetails={...user,timestamp:`${days} days`}
                return userDetails
              
            }
            else if(hours<=24 && hours!=0){
             let userDetails={...user, timestamp:`${hours} hrs`}
            
             return userDetails;
            }
            else if(minutes<=60 ){
 
             let userDetails={...user,timestamp:`${minutes} min`}
         
             return userDetails;
            }
            else{
             let userDetails={...user,timestamp:`${seconds} sec`}
             
             return userDetails;
            }
      })
      setTotalComment(userCommentTotal)
      
       }
  
     fetchComment()
   
 },[videoUrl])

 const handleLikeClick=async()=>{
   setToggleLike(true)
   setToggledislike(false)
   const formdata=new FormData()

   formdata.append("videoUrl",videoUrl)
   formdata.append("userid",userid)

   try{
     const response=await axios.post(`https://videohub-z726.onrender.com/add-like`,formdata,{
      headers:{Authorization:`Bearer ${token}`}
     })
    
   }
   catch(error){

   }

 }
 const handleDislikeClick=async()=>{
   setToggledislike(true)
   setToggleLike(false)
   const formdata=new FormData()

   formdata.append("videoUrl",videoUrl)
   formdata.append("userid",userid)

   try{
     const response=await axios.post(`https://videohub-z726.onrender.com/remove-like`,formdata,{
      headers:{Authorization:`Bearer ${token}`}
     })
    
   }
   catch(error){

   }

 }
 
  return (
    <div>
    <div className=' h-[40px]'><Link to="/index"> <ArrowBackIcon   className=' absolute left-0 top-1' sx={{width:50, height:30}}></ArrowBackIcon></Link></div>
    <div className='md:w-[50%]'>
    
    <div className='w-full  mt-3' >
    <iframe  width="100%" height="270px" src={`https://www.youtube.com/embed/${videoUrl}`}></iframe>
   </div>
      <div className='px-3 pt-1.5'>
         <div className=''>
              <h1>{userVideoInfo.title}</h1>
         </div>
         <div className="">
              <div className={`${ExpandDescription?"h-fit border-b-2  border-stone-300":"h-[40px] transition delay-[2000] flex gap-2 text-center "}  `}> 
                  <span>{userVideoInfo.views.length} views</span>
                  <span className={ExpandDescription?"block":"w-[200px] inline-block overflow-hidden text-ellipsis whitespace-nowrap"}>{userVideoInfo.description}</span>
                  <span className={ExpandDescription?"hidden":"inline"} onClick={(e)=>setExpandDescription(!ExpandDescription)}>more <KeyboardArrowDownOutlinedIcon/ ></span>
                  <div className={ExpandDescription?"block text-center ":"hidden"} >
                    <span onClick={(e)=>setExpandDescription(!ExpandDescription)}> <KeyboardArrowUpOutlinedIcon sx={{width:50,height:20}}/></span>
                  </div>
                 
             </div>
         </div>
         <div className='flex  gap-5 items-center justify-between h-[60px]'>
              <div className=' flex items-center gap-3 '>
                <div className='w-[40px] h-[40px]'> <img  className='rounded-[50%] w-full h-full' src={`${userVideoInfo.user_id.profile}`}/></div>
              
              <div className=' font-bold'>{userVideoInfo.user_id.user_name}</div>
              </div>
               
               <div><button className='bg-stone-100 hover:bg-stone-300 rounded-[10px] cursor-pointer p-[8px]'>Subscribe</button></div>
         </div>

         <div className='flex gap-6 mt-2 w-full'>
            <div className=''>
               <button onClick={handleLikeClick} className='bg-stone-100 p-2 cursor-pointer rounded-bl-[10px] rounded-tl-[10px] w-[100px] inline-block  '>{togglelike?<ThumbUpIcon/>:<ThumbUpOutlinedIcon/>}<span className='ps-2'>{userVideoInfo.like.length}</span></button>
              <button  onClick={handleDislikeClick} className=' bg-stone-100 p-2  cursor-pointer  rounded-br-[10px] rounded-tr-[10px]'>{toggledislike?<ThumbDownIcon/>:<ThumbDownOutlinedIcon/>}</button>
            </div>

            <div>
            <button  className='  cursor-pointer bg-stone-100 p-2 rounded-[10px] '>
             <ReplyOutlinedIcon/>
             <span>Share</span>
            </button>
            
            </div>

            <div>
            <button  onClick={()=>setTogglesave(!togglesave)} className='  cursor-pointer bg-stone-100 p-2 rounded-[10px] '>
            {
               togglesave?<BookmarkIcon/>:<BookmarkBorderOutlinedIcon/>
            }
            <span>save</span>
            </button>
            
            </div>
           
         </div>

         <div className='mt-4 border-b-1 pb-3 border-stone-200'>
           <h1>Comments</h1>
            <form onSubmit={handleCommentSubmit} method='post'>
              <div>
                 <div>
                  <div className='flex items-center mt-1'>
                  <img  className='w-[40px] rounded-[50%] h-[40px] me-1.5 ' src={`${userComment.profile}`}/>
                  <textarea id='commentBox' value={comment} name='comment' onChange={handleChangeComment}    className={`border-1 p-[10px] w-full   border-stone-400  focus:h-[100px]  outline-none resize-none  h-[50px] `} />
                  <input type='hidden' value={userComment._id} name='userCmtid' />
                  </div>
                 <div className={hideshow?"block":"hidden"}>
                      <div className='flex justify-end mt-1.5'>
                           
                           <div>
                           <button type='button' className=' p-3 me-2 rounded-[10px] bg-stone-100'>Cancel</button>
                           <button type='submit' className='bg-blue-700 p-3 rounded-[10px] '>Comment</button>
                           </div>
                      </div>
                 </div>
                 </div>
                 
              </div>
            </form>
                
         </div>

         <div className='mt-4'>
        
         {
            TotalComment.map((commentUser,i)=>{
               return <div key={i} className='my-3'>
              <div className='flex'>
              <div className='w-[40px] h-[40px]'>
              <img   className='rounded-[50%] w-full h-full' src={`${commentUser.commentProfile}`}/></div>
             <div className='ms-2 relative w-full'>
             <div className='text-[13px]'>{commentUser.user_name}</div>
             <div className='text-[15px]'> {commentUser.comments}</div>
             <span className='absolute text-[12px] right-0 top-0'>{commentUser.timestamp} ago</span>
             </div>

             
              </div>
               </div>
              })
         }
              
         
         </div>

      </div>
    </div>
    </div>
  )
}

export default SingleVideoPannel
