import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../../../client/src/assets/assets';
import { AppContext } from '../context/contextStore';
import Footer from '../components/Footer';

const SidebarLinks = () => (

  <ul className="flex flex-col items-start pt-5 text-gray-800">
    <NavLink
      className={({ isActive }) => `flex items-center mb-2 p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? "bg-blue-100 border-r-4 border-r-blue-500" : ""}`}
      to={'details'}
    >
      <img className="w-6" src={assets.form_logo} alt="Details" />
      <p>Details</p>
    </NavLink>

    <NavLink
      className={({ isActive }) => `flex items-center mb-2 p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? "bg-blue-100 border-r-4 border-r-blue-500" : ""}`}
      to={'change-password'}
    >
      <img className="w-6" src={assets.password_logo} alt="Change Password" />
      <p>Change Password</p>
    </NavLink>

    <NavLink
      className={({ isActive }) => `flex items-center mb-2 p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? "bg-blue-100 border-r-4 border-r-blue-500" : ""}`}
      to={'applications'}
    >
      <img className="w-6" src={assets.applications} alt="Applications" />
      <p>Applications</p>
    </NavLink>
  </ul>
);

const Profile = () => {

  const navigate = useNavigate();
  const { userData, userToken } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center max-sm:justify-between w-full px-4 2xl:px-20 mx-auto items-center shadow py-4">
        {!isSidebarOpen ? (
          <button className="sm:hidden text-2xl p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
        ) : (
          <button className="sm:hidden text-2xl p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ✖
          </button>
        )}
        <img onClick={() => navigate('/')} className="cursor-pointer" src={assets.logo} alt="Logo" />
      </div>

      <div className="flex">
        {isSidebarOpen && (
          <div className="fixed sm:relative top-30 left-0 h-full bg-white border-r-2 transition-transform transform sm:translate-x-0 w-64 sm:w-auto p-4">
            <SidebarLinks />
          </div>
        )}

        <div className="hidden sm:block min-h-screen border-r-2">
          <SidebarLinks />
        </div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      
    </div>
      <Footer />

    </>
  );
};

export default Profile;
