import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/contextStore.jsx'

const Navbar = () => {

  const navigate = useNavigate()

  const { userToken, userData, setUserToken } = useContext(AppContext)

  const handleLogOut = () => {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/')
  }


  return (
    <div className='shadow py-4'>
      <div className='flex justify-between container px-4 2xl:px-20 mx-auto items-center'>
        <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo}  alt="" />
        <div className='flex max-sm:text-xs gap-6 items-center'>
          {userData && userToken ? <>
            <p className='text-gray-500 text-xl text-center' >{userData.name}</p>
            <div className='group relative'>
              <img className='w-12 rounded-full cursor-pointer' src={userData.image} onClick={() => navigate(`/${userData._id}/profile`)} />
              <div className='absolute rounded pt-12 hidden group-hover:block top-5 right-0 z-10 text-black'>
                <ul className='list-none m-0 p-2 bg-white rounded border-2 border-gray-100 group-hover:bg-gray-100'>
                  <li className=' cursor-pointer px-2 py-1.5 mb-2' onClick={handleLogOut}>Logout</li>
                  <li className=' cursor-pointer px-3 py-1.5' onClick={() => navigate(`/${userData._id}/profile`)}>Profile</li>
                </ul>
              </div>
            </div>

          </>
            : <button onClick={() => navigate('/Authentication')} className='bg-blue-600 rounded-full py-2 px-6 sm:px-9 text-white'>Login</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
