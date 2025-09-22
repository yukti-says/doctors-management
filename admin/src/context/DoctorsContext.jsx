//* for  storing doctors logic and tokens

import { createContext } from "react";

export const DoctorsContext = createContext;

const DoctorsContextProvider = (props) => {
    const value = {

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