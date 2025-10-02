//* for storing all the admin related login logics and tokens
import { createContext, useState } from "react";

import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext(); 

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState([])

  const [appointments , setAppointments] = useState([])
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', {}, { headers: { aToken } })
      if (data.success) {
        setDoctors(data.doctors)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }


  //? logic for changing availability
  const changeAvailability = async (docId) => {
    try {
      const {data} = await axios.post(backendUrl +'api/admin/change-availability',{docId} , {headers:{aToken}} )
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
       toast.error(error.message);
    }
  }

  //todo functionality for getting all the appointments list of doctor from api
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
      if (data.success) {
        setAppointments(data.appointments)
      }
      else{
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
