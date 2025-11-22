//* for  storing doctors logic and tokens

import { useState } from "react";
import { createContext } from "react";

export const DoctorsContext = createContext();

const DoctorsContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL; 
    const [dToken , setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const value = {
        dToken,
        setDToken,
        backendURL
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