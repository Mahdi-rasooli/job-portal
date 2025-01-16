import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
    console.log(setShowLogin);
    
  return (
    <div className='shadow py-4'>
        <div className='flex justify-between container px-4 2xl:px-20 mx-auto items-center'>
            <img src={assets.logo} alt="" />
            <div className='flex max-sm:text-xs gap-4'>
                <button className='text-gray-600'>Recruiter Login</button>
                <button onClick={() => setShowLogin(true)}  className='bg-blue-600 rounded-full py-2 px-6 sm:px-9 text-white'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar