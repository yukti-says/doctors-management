import { useContext, useState } from "react" 
import {assets} from  '../assets/assets'
import { AdminContext } from "../context/AdminContext"
import axios from 'axios'
import { toast } from "react-toastify"

const Login = () => {
  //* state varibale for managing who is login doctor or admin , by default it will be admin
  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const[password , setPassword] = useState('')
  
  const { setAToke, backendUrl } = useContext(AdminContext)
  
  //* calling api
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken',data.token)
          setAToke(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        
      }

    }
    catch (error) {
      
    }
  
}



  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            onChange={(e) => setEmail(e.target.vale)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            onChange={(e) => setPassword(e.target.vale)}
            value={password}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login