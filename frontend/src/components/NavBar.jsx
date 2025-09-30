import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  //* two state variables for menu showing and tokens

  const [showMenu, setShowMenu] = useState(false);
  //! userData for displaying the userProfile in navbar
  const {token , setToken , userData} = useContext(AppContext)

  //? if have token thus we are logged in but if not so we are not logged in
  // const [token, setToken] = useState(true);


  //? logout functionality since token is also stored in localstorage as well as in state variable
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')

  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 ">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointers"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {/*ternory logic */}
        {token && userData ? (
          <div className="flex items-center gap-2 group relative ">
            <img
              onClick={() => navigate("/home")}
              className="w-8 rounded-full cursor-pointer"
              src={userData.image}
              alt=""
            />
            <img
              className="w-2.5 cursor-pointer   "
              src={assets.dropdown_icon}
              alt=""
            />

            {/* drop down menu */}
            <div className="absolute top-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light md:block "
          >
            Create Account
          </button>
        )}

        {/* for mobile view */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* --------mobile menu------------- */}
        <div
          className={` ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }  md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              <p
                className="px-4 py-2 rounded inline-block"
                onClick={() => setShowMenu(false)}
                to="/"
              >
                {" "}
                Home
              </p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              <p
                className="px-4 py-2 rounded inline-block"
                onClick={() => setShowMenu(false)}
                to="/"
              >
                {" "}
                All Doctors
              </p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="about"
            >
              <p
                className="px-4 py-2 rounded inline-block"
                onClick={() => setShowMenu(false)}
                to="/"
              >
                {" "}
                About
              </p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="contact"
            >
              <p
                className="px-4 py-2 rounded inline-block"
                onClick={() => setShowMenu(false)}
                to="/"
              >
                {" "}
                Contact
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
