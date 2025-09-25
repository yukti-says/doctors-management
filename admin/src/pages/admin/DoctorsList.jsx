import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  
  const { doctor, aToken, getAllDoctors } = useContext(AdminContext)
  

  useEffect(() => {
    if (aToken){
      getAllDoctors()
    }
  }, [aToken ])
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctor.map((item,index) => (
            <div key={index}>
              <img src={item.image} alt="" />
              <div>
                <p>{ item.image}</p>
                <p>{ item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList