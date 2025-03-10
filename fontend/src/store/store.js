import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import VideoSlicer from "../slicer/Video-slicer"
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { useCookies } from "react-cookie";
// const[cookies,setCookie,removeCookie]=useCookies("token")


const encryptor=encryptTransform({
  secretKey:"SAM@!@@",
  onError:(err)=>{
    console.log("Invalid",err)
    localStorage.clear()
    
  },
   

  inbound: (state) => JSON.stringify(state), // Encrypt as string
  outbound: (state) => JSON.parse(state) // Decrypt back to object
})

const persistConfig = {
  key: "root",
  storage, 
  transforms: [encryptor]
};

const rootReducer = combineReducers({
  user: VideoSlicer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }),
});

export const persistor = persistStore(store);
export default store;
