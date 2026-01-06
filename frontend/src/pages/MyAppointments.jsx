import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const MyAppointments = () => {
  const { token, backendUrl,getDoctorsData } = useContext(AppContext)
  
  //* state variable to store the appointment data
  const [appointments, setAppointments] = useState([])
  //* date format
  const months = [" ","Jan" , "Fab" , "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
}

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/users/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }


  }


  //todo cancel appointments function
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUsersAppointments()
        getDoctorsData()

      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  //* this above function should run always whenever the page loaded
  useEffect(() => {
    if (token) {
      getUsersAppointments()
    }
  },[token])
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-2 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-7000 font-medium mt-1"> Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)}| {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.isCompleted && (
                <button className="text-sm text-stone-500 text-center sm:min-w-28 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-28 py-2 px-7 border rounded hover:bg-red-500  hover:text-white transition-all duration-300"
                  onClick={() => cancelAppointment(item._id)}
                >
                  {" "}
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment canceled
                </button>
              )}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments
