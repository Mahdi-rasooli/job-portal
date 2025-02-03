import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { assets } from '../../../client/src/assets/assets'

const Dashbord = () => {
    return (
        <div className='min-h-screen'>
            <NavBar />
            <div className='flex items-start'>
                <div className='inline-block min-h-screen border-r-2' >
                    <ul className='flex flex-col  items-start pt-5 text-gray-800'>

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-r-blue-500' : null} `} to={'/dashbord/add-job'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-r-blue-500' : null} `} to={'/dashbord/manage-job'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>manage-job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-r-blue-500' : null} `} to={'/dashbord/view-application'}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>view-application</p>
                        </NavLink>
                    </ul>
                </div>

                <div>
                    <Outlet />
                </div>
            </div>


        </div>
    )
}

export default Dashbord