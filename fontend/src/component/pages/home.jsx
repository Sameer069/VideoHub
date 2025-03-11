
import { Link, Outlet } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect,  useState } from "react";
const Homepage=()=>{
       const [toggle,setToogle]=useState(false)
    const handleNavbaropen=()=>{
       setToogle(true)
    }
    const handleNavbarclose=()=>{
        setToogle(false)
    }
   useEffect(()=>{

   },[toggle])
    return(
        <>
            <header className={` flex justify-between bg-stone-700 text-white p-[15px] px-[30px]`}>
              <div className="text-[20px] font-bold ">VIDEOSHUB</div>
               <div className="min-[481px]:hidden  max-[768px]:hidden md:block">
               <Link to="/signin"> <button className="px-[5px] Btn">Signin </button></Link>
               <Link to="/admin"><button className="Btn">Admin</button></Link>
               </div>
               <div className="max-[568px]:block min-[768px]:hidden">
                <span onClick={handleNavbaropen}><DehazeIcon ></DehazeIcon></span>
               </div>
               <div  className={` ${toggle? "showNav":"hideNav" } min-[768px]:hidden z-[10]   h-full  flex justify-center    absolute bg-[#181717]  w-full left-[0] top-0 `}>
                  <div className="flex w-full mt-20  flex-col">
                  <Link to="/signin"> <button onClick={handleNavbarclose} className={` pt-1.5 pb-1.5 w-full hover:bg-stone-500 my-1.5 text-[25px]`}>Signin</button></Link>
                  <Link> <button  onClick={handleNavbarclose} className="w-full pt-1.5 pb-1.5  hover:bg-stone-500 text-[25px]">Admin</button></Link>
                  </div>
                 <div className="" onClick={handleNavbarclose}>
                 <CloseIcon  className={ `absolute top-[18px] right-[25px] `}></CloseIcon>
                 </div>
               </div>
            </header>
            <Outlet></Outlet>
            <Outlet></Outlet>
        </>
    )
}
export default Homepage;