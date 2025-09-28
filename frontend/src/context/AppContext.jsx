import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets"; //! trying this doctors array getting from context 
import axios from 'axios'
import {toast} from 'react-toastify'


//* common logic here
export const AppContext = createContext()

//* here we are going to call doctors api and get the data from backend

//? state variable for  saving the doctors data coming from backend api



//* context provider function
const AppContextProvider = (props) => {
    //? whatever we gonna define in this value object that will be accessed by any component

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    //? variable for storing user auth token
    const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
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

    const value = {
      doctors,
      currencySymbol,
      token,
        setToken,
      backendUrl
    };

    useEffect(() => {
     getDoctorsData()
 },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider