import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/contextStore.jsx'

const Navbar = () => {

  const navigate = useNavigate()

  const { userToken , userData } = useContext(AppContext)
    
  
  return (
    <div className='shadow py-4'>
        <div className='flex justify-between container px-4 2xl:px-20 mx-auto items-center'>
            <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
            <div className='flex max-sm:text-xs gap-6 items-center'>
                {/* <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button> */}
                {userData && userToken ? <>
                  <p className='text-gray-500 text-xl text-center' >{userData.name}</p>
                  <img className='w-12 rounded-full' src={userData.image} onClick={() => navigate('/')} />
                </>
                 : <button onClick={() => navigate('/Authentication')} className='bg-blue-600 rounded-full py-2 px-6 sm:px-9 text-white'>Login</button>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar