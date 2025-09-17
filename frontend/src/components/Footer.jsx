import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          {/* --------LEFT---- */}

          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            non aliquid quae illum quasi possimus est, ex mollitia veniam libero
            ut? Officiis dolorem possimus pariatur itaque corrupti esse aliquid
            assumenda.
          </p>
        </div>

        <div>
          {/* --------MIDDLE---- */}

          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          {/* --------RIGHT---- */}

          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+79358904892</li>
            <li>yuktisahu@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* copyright tag */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'> &copy; 2025 @DocCare - All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer