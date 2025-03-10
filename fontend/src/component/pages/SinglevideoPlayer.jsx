import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';


import SingleVideoPannel from './SingleVideoPannel';
import NotFoundPage from './NotFoundPage';
function SinglevideoPlayer() {
   const {videoid}=useParams()
   const [searchParams] = useSearchParams();
   const si=searchParams.get("si")
   const navigate=useNavigate()
   const[comment,setcomment]=useState([])
   const[videoUrl,setVideoUrl]=useState(`${videoid}?si=${si}`)
   const [urlErr,setUrlErr]=useState(false)
   const[userVideoInfo,setUserVideoInfo]=useState({title:"",
    description:"",
    comments:[],
    views:[],
    post_date:"",
    url:"",
    _id:"",
    like:[],

    user_id: { 
      user_name: 'sameer_09',  
      profile: '',
      post_video: [],
      
    },
})

  
   useEffect(()=>{
      const controller = new AbortController();
      
     async function  getsingleVideoDetails(){
        await axios.get(`http://127.0.0.1:3003/videos/get-videos/${videoid}?si=${si}`,{signal:controller.signal})
        .then(res=>{
           
            setVideoUrl(res.data.allvideo.url)
            setUrlErr(false)
            setUserVideoInfo(res.data.allvideo)
           
        })
        .catch(err=>{
            setUrlErr(true)
        })

      }
      getsingleVideoDetails()
      return ()=>controller.abort()
     
   },[videoid,si])
   useEffect(()=>{
      
        const fetchComment=async()=>{

          const response=await axios.get(`http://127.0.0.1:3003/videos/commentlist/${videoUrl}`)
          setcomment(response.data.videoComment)
          
         }
    
       fetchComment()
     
   },[videoUrl])
  return ( 

    <div>
       {
        urlErr?<NotFoundPage/>:<SingleVideoPannel  userVideoInfo={userVideoInfo} videoUrl={videoUrl} />
       }
    </div>
  )
}

export default SinglevideoPlayer
