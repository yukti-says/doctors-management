//* for  storing doctors logic and tokens

import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorsContext = createContext();

const DoctorsContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL; 
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    
    const [appointments, setAppointments] = useState([])

    const [dashData, setDashData] = useState(false)
    
    const [profileData, setProfileData] = useState(false);
    
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments);
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message)
            
        }
    }



    //? marking appointment as completed
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error(data.message)
            }
          
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }


    // function to cancel appointment
     const cancelAppointment = async (appointmentId) => {
       try {
         const { data } = await axios.post(
           backendURL + "/api/doctor/cancel-appointment",
           { appointmentId },
           { headers: { dToken } }
         );
         if (data.success) {
           toast.success(data.message);
           getAppointments();
         } else {
           toast.error(data.message);
         }
       } catch (error) {
         console.log(error.message);
         toast.error(error.message);
       }
    };
    
    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendURL + '/api/doctor/dashboard',{headers:{dToken}})

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
             console.log(error.message);
             toast.error(error.message);
        }
    }


    //? function to fetch the data from doctor profile
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setProfileData(data.profileData)

            }
        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const value = {
        dToken,
        setDToken,
        backendURL,
        getAppointments,
        appointments,
        setAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        setDashData,
        dashData,
        profileData,
        setProfileData,
        getProfileData
    }
    return (
        <DoctorsContext.Provider value={value}>
            {
                props.children
            }
       </DoctorsContext.Provider>
    )
}

export default DoctorsContextProvider;