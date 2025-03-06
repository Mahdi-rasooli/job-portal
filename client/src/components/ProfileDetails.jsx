import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/contextStore'
import { useNavigate } from 'react-router-dom'

const ProfileDetails = () => {


    const { userData, setUserToken } = useContext(AppContext)

    const navigate = useNavigate()


    console.log(userData);


    const handleLogOut = () => {
        localStorage.removeItem('token')
        setUserToken(null)
        navigate('/')
    }


    const [resumeUrl, setResumeUrl] = useState(null)


    useEffect(() => {
        setResumeUrl(userData.resume)
    }, [userData])



    return (
        <div className='min-h-screen p-5 mx-auto max-sm:text-center'>
            <h1 className=' text-2xl'>My Profile</h1>
            <div className='p-6 flex flex-col mt-6 border border-gray-100 rounded-md max-sm:border-none '>
                <img className='mb-6 w-[70px] max-sm:mx-auto' src={userData.image} alt="" />
                <div className=' grid grid-cols-2 gap-6 mt-4 max-sm:flex max-sm:flex-col'>
                    <div>
                        <label className='text-gray-500' htmlFor="">Username</label>
                        <p >{userData.name}</p>
                    </div>

                    <div>
                        <label className='text-gray-500' htmlFor="">Email</label>
                        <p>{userData.email}</p>
                    </div>
                    <div className='mt-4'>
                        <label className='text-gray-500' htmlFor="">View Resume</label>
                        {resumeUrl ? (
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline block mt-1"
                            >
                                open resume
                            </a>
                        ) : (
                            <p className="text-gray-400">No resume uploaded</p>
                        )}
                    </div>

                </div>

            </div>


            <button className=' px-4 py-2 mt-4 text-center bg-red-600 text-white rounded-lg hover:bg-red-500 border-white' onClick={handleLogOut}>logout</button>
        </div>
    )
}

export default ProfileDetails