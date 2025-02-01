import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const RecruterLogin = ({ setShowRecruiterLogin }) => {

    const [currentState, setCurrentState] = useState('Login')
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [image, setImage] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form className='p-10 relative rounded-xl text-slate-500 bg-white'>
                <div>
                    <h2 className='font-medium text-center text-2xl text-neutral-700'>Recruter Login</h2>
                    <p className='text-sm'>Welcome back!Please sign in to continue</p>
                </div>
                {currentState === 'Sign up' && isSubmitted
                    ? <>
                        <div className='flex items-center justify-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-20 h-20 rounded-full border border-gray-200' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' hidden />
                            </label>
                        </div>

                    </>
                    : <div>
                        {currentState === 'Sign up'
                            ? <div className='flex gap-2 border px-4 py-2 items-center rounded-lg mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className=' outline-none text-sm' required type="text" placeholder='First name' name='name' value={data.name} onChange={onChangeHandler} />
                            </div>
                            : null}
                        <div className='flex gap-2 border px-4 py-2 items-center rounded-lg mt-5'>
                            <img src={assets.email_icon} alt="" />
                            <input className=' outline-none text-sm' required type="email" placeholder='Email id' name='email' value={data.email} onChange={onChangeHandler} />
                        </div>
                        <div className='flex gap-2 border px-4 py-2 items-center rounded-lg mt-5'>
                            <img src={assets.lock_icon} alt="" />
                            <input className=' outline-none text-sm' type="password" required placeholder='Password' name='password' value={data.password} onChange={onChangeHandler} />
                        </div>
                    </div>}

                <div>
                    {currentState === 'Login' && <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>}
                    <button onClick={(event) => {
                        event.preventDefault()
                        if (currentState === 'Sign up') {
                            setIsSubmitted(true);
                        }
                    }} className={`py-2 bg-blue-600 text-white w-full rounded-lg mt-1 mb-4 ${currentState === 'Sign up' ? 'mt-3' : null}`
                    }>{currentState === 'Login' ? 'Login' : isSubmitted ? 'Register' : 'Next'}</button>
                </div>
                {currentState === 'Login'
                    ? <p>Don't have an account?<span href="" className='text-blue-600 cursor-pointer' onClick={() => setCurrentState('Sign up')}>Sign up</span></p>
                    : <p>Already registered?<span href="" className='text-blue-600 cursor-pointer' onClick={() => setCurrentState('Login')}>Login</span></p>}

                {
                    <img className='absolute top-5 right-5 cursor-pointer' onClick={() => setShowRecruiterLogin(false)} src={assets.cross_icon} alt="" />
                }
            </form>
        </div>
    )
}

export default RecruterLogin
