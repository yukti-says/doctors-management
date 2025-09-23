//* for storing all the admin related login logics and tokens

import { createContext, useState } from "react";

export const AdminContext = createContext;

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.setItem('aToken'):'')
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    aToken, setAToken,
    backendUrl
  };


  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;