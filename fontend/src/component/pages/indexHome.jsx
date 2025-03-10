
import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import axios from 'axios';
import SearchBar from './SearchBar';

function IndexHome({profilejpg,VideoSearchBar}) {
  const [Searchvalue,setSearchValue]=useState()
  const inputRef=useRef(null)
  const inputHiddenRef=useRef(null)
  const [userid,setUserid]=useState(localStorage.getItem("userid"))
  const[preview,setPreview]=useState(null)
  const [NavbarToggle,setNavbarToggle]=useState(true)

  const inputimgClick=()=>{
    inputRef.current.click()
  }
  const navbartoggle=()=>{
     setNavbarToggle(false)
  }
  const Search=()=>{
    VideoSearchBar(Searchvalue.toLowerCase())
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

  useEffect(()=>{
    setUserid(localStorage.getItem("userid"))
  },[localStorage.getItem("userid")])
  
  return (
   <div className='w-full  '>
     {NavbarToggle?
      <div className='flex justify-between pb-6  px-[20px] pt-2.5 '>
      <div className="text-[20px] font-bold  "><span className=' pe-1.5 max-[768px]:hidden min-[769px]:inline'><DehazeOutlinedIcon /></span><span className='max-[768px]:text-[1.1rem] max-[768px]: text-red-900'>VIDEOSHUB</span></div>
      
      <div>
  
      <div className='flex items-center w-[500px] max-[768px]:hidden'>
        <div className='relative max-[768px]:w-full '>      
          <input onChange={(e)=>setSearchValue(e.target.value)} value={Searchvalue} type='text' placeholder='Search here' className='searchBar  max-[768px]:w-full w-[550px] border border-gray-200 outline-none h-[40px] rounded-[20px] ps-[12px]' />
          <button onClick={Search} className='btnSearch cursor-pointer w-[100px] bg-gray-200 max-[768px]:w-[40px] right-[0px]'><SearchIcon className='text-black'/></button>
          </div> 
       <button className='bg-gray-300  max-[768px]: p-[5px] mx-1 rounded-[50%]'><MicIcon className='  ' sx={{width:27,height:27}}/></button>
       
      </div>
  
        </div>
        <div><button onClick={navbartoggle} className=' w-[100px] max-[768px]:w-[40px] md:hidden' ><SearchIcon className='text-black'/></button></div>
       
       <div className='flex items-center max-[768px]:hidden'>
          <button className=' me-4 bg-gray-200 p-1.5 rounded-[6px]'><AddIcon className=''/>create</button>
          
          <img src={preview || profilejpg} onClick={inputimgClick} className='cursor-pointer inline-block h-[35px] w-[35px] bg-gray-400 rounded-[50%]' alt='imga'/>
          <input type='file'  ref={inputRef} name='uploadPic' onChange={handleImgchhange} className=' hidden'/ >
          <input type='hidden' ref={inputHiddenRef} value={userid} />
         
       </div>
      </div>:<SearchBar  NavbarToggle={NavbarToggle} VideoSearchBar={VideoSearchBar} setToggle={setNavbarToggle}/> }
   </div>
  )
}

export default IndexHome
