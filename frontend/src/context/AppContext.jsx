import { createContext } from "react";
import { doctors } from "../assets/assets"; //! trying this doctors array getting from context 

//* common logic here
export const AppContext = createContext()


//* context provider function
const AppContextProvider = (props) => {
    //? whatever we gonna define in this value object that will be accessed by any component

    const currencySymbol = '$'
    const value = {
         doctors , currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider