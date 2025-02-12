import React from 'react'
import { assets } from '../../../client/src/assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/contextStore'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const { companyData , setCompanyToken } = useContext(AppContext)

    const navigate = useNavigate()

    const handleLogOut = async () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        navigate('/')
    }


    return (
        <div className='shadow py-5'>
            <div className='flex justify-between px-5 items-center'>
                <img className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                {companyData && (
                    <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden'>Welcome , {companyData.name}</p>
                        <div className='relative group'>
                            <img className='border w-10 h-10 rounded-full' src={companyData.image} alt="" />
                            <div className='absolute rounded pt-12 hidden group-hover:block top-5 right-0 z-10 text-black'>
                                <ul className='list-none m-0 p-2 bg-white rounded border-2 border-gray-100'>
                                    <li className='cursor-pointer' onClick={handleLogOut}>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar