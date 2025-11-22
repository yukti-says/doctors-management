import React, { useContext  } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import AllAppointments from './pages/admin/AllAppointments'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorsList from './pages/admin/DoctorsList'
import { DoctorsContext } from './context/DoctorsContext'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointment from './pages/doctor/doctorAppointment'
import DoctorProfile from './pages/doctor/DoctorProfile'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const {dToken} = useContext(DoctorsContext)


  return aToken || dToken ? (
    <div className="bg-[#F8F9FD">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start ">
        <Sidebar />
        <Routes>
          {/* admin routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          {/* doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App