
import "./App.css"

import {Routes,BrowserRouter,Route} from "react-router-dom"
import UserSignin from './component/pages/UserSignin'
import UserSignup from './component/pages/UserSignup'
import IndexPage from './component/pages'
import Userprotectwraper from './component/pages/Userprotectwraper'
import Adminpanel from './component/pages/Adminpanel'
import SinglevideoPlayer from './component/pages/SinglevideoPlayer'
import NotFoundPage from "./component/pages/NotFoundPage"


function App() {

  return (
   
    <BrowserRouter>
   
        <div>
             <Routes>
                 <Route path="*" element={<NotFoundPage></NotFoundPage>} ></Route>
                 <Route path='/signin' element={<UserSignin/>}></Route>
                 <Route path='/' element={<UserSignup/>}></Route>
                 <Route path='/index' element={
                 <Userprotectwraper>
                  <IndexPage/>
                  
                  </Userprotectwraper>}
                  >

                  </Route>
                  <Route path='/addVideo' element={
                    <Userprotectwraper>
                    <Adminpanel/>
                    </Userprotectwraper>
                  }>
                    </Route>
                
                  <Route path='/watch/:videoid' element={
                   <Userprotectwraper>
                   <SinglevideoPlayer/>
                   </Userprotectwraper>
                  }></Route>
             </Routes>
        </div>
   
    </BrowserRouter>

  )
}

export default App;