import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usercontext from './component/context/Usercontext.jsx'
import {Provider} from "react-redux"
import store,{persistor} from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading={<>loading...</>} persistor={persistor}  >
   
     <Usercontext>
        <App/>
    </Usercontext>
    </PersistGate>
    </Provider>
   
)
