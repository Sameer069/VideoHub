
import IndexHome from "./indexHome";
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import defaultjpg from "../../assets/default.jpg"
import Button from '@mui/material/Button';
import {  useEffect, useState } from "react";
import {  Link, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { createContext } from "react";
import Userprofile from "./Userprofile";
import Videopannel from "./Videopannel";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotFoundPage from "./NotFoundPage";
import Adminpanel from "./Adminpanel";

export  const indexContext=createContext()
const IndexPage=()=>{
  const[cookie,setCookie,removeCookie]=useCookies(["token"])
  const[profile,setProfile]=useState(defaultjpg)
   const[userDetails, setUserDetails]=useState({
    user_name:"",
    profile:""
   })
  const token=cookie["token"]
  const navigate=useNavigate()
  const[userid,setUserid]=useState(localStorage.getItem("userid"))
  const [toggle,setToggle]=useState("all")
  const[vfilter,setVFilter]=useState(false)
 const [categories,setCategories]=useState([])
 const [searchData,setSearchData]=useState([])
 const[searchError,setSearchError]=useState(false)
 const[active,setActive]=useState(null)
  


  useEffect(()=>{    
    setUserid(localStorage.getItem("userid"))
  },[userid])


   useEffect(()=>{
       const fetchUser=async()=>{
       
  
        if(cookie["token"] && userid ){
          await axios.get(`https://videohub-z726.onrender.com/get-user/${userid}`,{
            headers:{Authorization:`Bearer ${token}`}
          }).then(  response=>{
  
          setProfile(response.data.imageUrl)
          setUserDetails(response.data.userDetails)
        
            
          
           }).catch(err=>{
              if(err.response.status===404 || err.response.status===400){
              
                removeCookie("token")
                localStorage.removeItem("userid")
                
              }
              console.log(err)
           
           })
             await axios.get(`https://videohub-z726.onrender.com/videos/categories`).then(response=>{
          
              setCategories(response.data.categories)
              
             })
  
        }

       }

      
        fetchUser()
    
      
      
   },[userid,token])
    
  
  const handleProfileClick=()=>{
       setVFilter(true)
       setToggle("profile")
       
  }
  const handleHomeClick=()=>{
    setVFilter(false)
    setToggle("all")
    setActive(null)
  }
  useEffect(()=>{
    if(!token ){
      navigate("/signin")
    }
  },[token,userid])
   
  const VideoSearchBar=async(data,index)=>{
         setActive(index)
        const formdata=new FormData()

        formdata.append("category",data)
        
          await axios.post(`https://videohub-z726.onrender.com/videos/category-video`,formdata)
          .then(response=>{
      
            if(response.status===200){
              const responseUser= response.data.category.map(user=>{
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
             
              setSearchData(responseUser)
              setToggle("")
              setSearchError(false)
              
             
  
            }
          }).catch(err=>{
             if(err.response.status===400){
              setToggle("error")
             }
          })

        
     
  }
  const handleAllclick=()=>{
    setToggle("all")
    
      setActive(null)
   
    
  }
  const  handleNotAvalaibleClick=()=>{
     alert("Sorry This feauture update soon...")
  }
  const handleAddvideo=()=>{
    
   navigate("/addVideo")
  }
  

  
  
   
   return(
    <div className="">
       <header className="  w-full">
              <IndexHome profilejpg={profile} VideoSearchBar={VideoSearchBar}  />
       </header>
       <section className="indexSection w-full">
           <div className="flex z-10 bg-white pt-2 pb-3 justify-between h-[300px] text-center flex-col text-[10px] max-[768px]:fixed bottom-0 max-[768px]:flex-row  max-[768px]:h-[60px] max-[768px]:w-full max-[768px]:justify-evenly  ">
             <div className=" hover:bg-stone-200 rounded-[10px] flex flex-col  item-center justify-between h-[50px]  cursor-pointer" onClick={handleHomeClick}>
           <div>  <HomeIcon /></div>
             <div>Home</div>
             </div>
             <div className="flex flex-col  item-center justify-between h-[50px] " onClick={handleNotAvalaibleClick}>
             <div>   <VideoLibraryIcon/></div>
             <div>Shorts</div>
             </div>
           
            <div className="max-[768px]:block hidden    h-[50px]  w-[20px]" onClick={handleAddvideo} >
            <AddIcon sx={{width:30,height:30}}></AddIcon>
            </div>
           

             <div onClick={handleNotAvalaibleClick} className="flex flex-col  item-center justify-between h-[50px] ">
             <div  className=""> <SubscriptionsIcon/></div>
             <div>Subscriptions</div>
             </div>

             <div className="cursor-pointer  max-[768px]:hidden rounded-[10px]  hover:bg-stone-200  flex flex-col  item-center justify-between h-fit  " onClick={()=>setToggle("profile")} >
             <div className=" md:inline p-4 " ><AccountCircleOutlinedIcon /></div>

             <div>You</div>
          
            
             </div>
              
               <div className="max-[768px]:inline md:hidden  flex flex-col  item-center justify-between h-[50px]  " onClick={handleProfileClick } >
                <div className="w-[40px] h-[40px]"><img src={ profile} className=" w-full h-full rounded-[50%] " alt="user"/></div>
               <div>You</div>
              
              </div>
           </div>

           <div className=" md:ps-6 overflow-hidden ">
             <div className={vfilter?"hidden":"block" } >
               <div className="videoFilter overflow-x-auto flex gap-7  ps-6 pb-8">
               <div >
                    <Button  onClick={handleAllclick} sx={{backgroundColor:active===null?"black":"rgb(241, 238, 238)",color:active===null?"white":"black",height:"30px"}} className="bg-gray-400 ">ALL</Button>
                    </div>
                 {
                  categories.map((category,i)=>{
                    return <div key={i}>
                    <Button onClick={()=>VideoSearchBar(category.category,i)}  sx={{backgroundColor:active===i?"black":"rgb(241, 238, 238)",color:active===i?"white":"black",height:"30px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}} >{category.category}</Button>
                    </div>
                  })
                 }

               </div>
             </div>
            <div className="">
            <Outlet/>
            
            {
              toggle==="profile"? <Userprofile profilePic={profile} username={userDetails.user_name} />:toggle==="create"?<Adminpanel></Adminpanel>
              :toggle==="all" ?<Videopannel userDetails={userDetails} />:toggle==="error"?<NotFoundPage />:
              <div className="max-[768px]:w-full ">
              <div className='flex max-[768px]:flex-col w-full gap-2'>

             {
     
      
        searchData.map((url,i)=>{

           return <div className='w-[300px] max-[768px]:w-[100%] ' key={i}>
          
              <div id={`youtube-iframe-${i}`}  className='w-[100%] relative h-[200px]'> <iframe width="100%" height="200px" src={`https://www.youtube.com/embed/${url.url}`}></iframe>
              <Link to={`/watch/${url.url}`} onClick={(e)=>handleVideoInputClick(e,url.url,userid)}  className=' absolute w-[100%] top-0 left-0 bg-transparent h-[200px] cursor-pointer' ></Link>
              
            </div>
              <div className=' max-[768px]:px-[10px]'>
             <div className='flex items-center  h-[60px] overflow-hidden  '>
             <img src={`${url.user_id.profile}`} width="30" height="30" className='rounded-[50%]'/>
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
              
             
          }
            
              
            </div>
           </div>
       </section>
    </div>
   )
}
export default IndexPage;