import React from 'react'
import { assets } from '../../../client/src/assets/assets'

const NavBar = () => {
    return (
        <div className='shadow py-5'>
            <div className='flex justify-between px-5 items-center'>
                <img className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                <div className='flex items-center gap-3'>
                    <p className='max-sm:hidden'>Welcome,stack</p>
                    <div className='relative group'>
                        <img className='w-8 rounded-full border' src={assets.company_icon} alt="" />
                        <div className='absolute rounded pt-12 hidden group-hover:block top-5 right-0 z-10 text-black'>
                            <ul className='list-none m-0 p-2 bg-white rounded border-2 border-gray-100'>
                                <li className='cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar