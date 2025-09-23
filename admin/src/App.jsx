import React, { useCallback, useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'

const App = () => {

const {aToken} = useContext(AdminContext)


  return aToken ? (
    <div className='bg-[#F8F9FD'>
      <ToastContainer />
      <Navbar/>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App