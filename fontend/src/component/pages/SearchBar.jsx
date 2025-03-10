import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function SearchBar({NavbarToggle,setToggle,VideoSearchBar}) {
   const [Searchvalue,setSearchValue]=useState()
   const Search=()=>{
    VideoSearchBar(Searchvalue.toLowerCase())
    
    setSearchValue("")
  }
  return (
    <div className='flex w-full md:hidden items-center justify-between px-[17px] pt-3 pb-6 h-[63px]'>
    <div > <span onClick={()=>setToggle(true)}><ArrowBackIcon></ArrowBackIcon></span></div>
    <div className='relative max-[768px]:w-[600px]'>      
    <input  value={Searchvalue} onChange={(e)=>setSearchValue(e.target.value)} type='text' placeholder='Search here' className=' max-[768px]:w-full w-[450px] border border-gray-200 outline-none h-[40px] rounded-[20px] ps-[12px]' />
    <button onClick={Search} className='btnSearch w-[100px]  max-[768px]:w-[40px] right-[0px]'><SearchIcon className='text-black'/></button>
    </div> 
    <div>
    <button className='bg-gray-300  max-[768px]: p-[5px] mx-1 rounded-[50%]'><MicIcon className='  ' sx={{width:27,height:27}}/></button>
    </div>

    </div>
  )
}

export default SearchBar
