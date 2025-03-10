import React from 'react'
import not_found from "../../assets/no-result.jpg"
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
function NotFoundPage({hide}) {
  return (
    <div className='h-[100vh] flex justify-center items-center'> 
          <div className="w-full md:w-[300px]">
            
              <img src={not_found} width="100%" height="200px"/>
              <div className={`text-center ${hide}`}>
              <Link to="/" ><Button sx={{backgroundColor:"red",color:"white"}}>Back to home</Button></Link>
              </div>
          </div>
       
      
    </div>
  )
}

export default NotFoundPage
