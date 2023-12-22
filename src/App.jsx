import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authSlice, { login, logout } from './store/authSlice';
import authService from "./appwrite/auth"
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Outlet} from 'react-router-dom'
const App = () => {
  const [ loading , setLoading ] = useState(true)
  const dispatch = useDispatch();
  

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
          dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  
 return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
    <Header/>
    <Outlet/>
    {/* <Footer/> */}
    </div>
    </div>
 ) : null
  
}

export default App
