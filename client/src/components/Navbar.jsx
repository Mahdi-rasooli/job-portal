import React from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setShowRecruiterLogin}) => {

  const navigate = useNavigate()
    
  return (
    <div className='shadow py-4'>
        <div className='flex justify-between container px-4 2xl:px-20 mx-auto items-center'>
            <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
            <div className='flex max-sm:text-xs gap-4'>
                <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                <button   className='bg-blue-600 rounded-full py-2 px-6 sm:px-9 text-white'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar