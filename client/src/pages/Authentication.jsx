import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/contextStore'
import { useNavigate } from 'react-router-dom'

const Authentication = () => {

    const { setUserData , setUserToken } = useContext(AppContext)

    const navigate = useNavigate()

    const StrengthLevels = ["weak", "medium", "medium", "strong"]

    const [Strength, setStrength] = useState("")

    const [state, SetState] = useState('Login')

    const [isSubmitted, setIsSubmitted] = useState(false)


    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [image, setImage] = useState(false)

    function getStrength(password) {
        let indicator = -1

        if (/[a-z]/.test(password)) indicator++;
        if (/[A-Z]/.test(password)) indicator++;
        if (/[0-9]/.test(password)) indicator++;
        if (/[^a-zA-Z0-9]/.test(password)) indicator++;
        if (password.length > 8) indicator++;

        return StrengthLevels[indicator]
    }


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));


        if (name === 'password') {
            const stregth = getStrength(value);
            setStrength(stregth)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (state === 'Sign up' && !isSubmitted) {
            setIsSubmitted(true)
            return
        }

        try {

            if (state === 'Login') {


                const response = await axios.post('http://localhost:5000/api/user/login', {
                    email: data.email,
                    password: data.password
                })

                console.log(response.data.message);



                if (response.data.user) {
                    setUserData(response.data.user);
                    setUserToken(response.data.token)
                    localStorage.setItem('userToken', response.data.token)
                    //navigate('/')
                    /*setData({
                        email: '',
                        password: '',
                    })*/

                    toast.success('Logined successfully')
                }
                else {
                    console.log('error');

                    toast.error(response.data.message)
                }

            }

            else {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('email', data.email);
                formData.append('password', data.password);
                formData.append('image', image);

                const response = await axios.post('http://localhost:5000/api/user/register', formData);


                if (response.data.success) {
                    setUserData(response.data.user);
                    setUserToken(response.data.token)
                    localStorage.setItem('userToken', response.data.token)
                    navigate('/')
                    setData({
                        email: '',
                        password: '',
                        name: ''
                    })


                    toast.success('Registered successfully')
                }

                else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {

            if (error.response) {
                toast.error(error.response.data.message || 'Something went wrong');

            } else if (error.request) {

                toast.error('No response from server');

            } else {
            
                toast.error('Network Error');
            }
        }
    }


    return (
        <>
            <div className='bg-gradient-to-r from-[#ffffff] to-[#d4dfed]'>
                <Navbar />
                <hr className='border-t-2 border-gray-300' />
            </div>

            <div className='flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffffff] to-[#d4dfed] min-h-screen  overflow-hidden'>

                <div className=''>
                    <form onSubmit={onSubmitHandler} className='p-10 w-[380px] sm:w-[400px] bg-white mb-12 shadow-sm border text-center relative rounded-xl text-slate-500'>
                        <h2 className='font-medium text-4xl text-neutral-700 mb-4'>{state}</h2>
                        {state === 'Login'
                            ? <p onClick={() => SetState('Sign up')}>New to Job Portal?<span className='text-black cursor-pointer hover:text-gray-600 underline' href="">Sign up</span></p>
                            : <p onClick={() => SetState('Login')}>Already Registered?<span className='text-black cursor-pointer hover:text-gray-600 underline' href="">Login</span></p>}

                        {state === 'Sign up' && isSubmitted ?
                            <div className='flex items-center justify-center gap-4 my-10'>
                                <label htmlFor="image">
                                    <img className='w-20 h-20 rounded-full border border-gray-200' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                    <input onChange={(event) => setImage(event.target.files[0])} type="file" id='image' hidden />
                                </label>
                            </div>
                            :

                            <div className='flex flex-col justify-center items-center gap-5 mt-8'>
                                {state === 'Sign up' && (
                                    <div className='flex flex-col items-start justify-center w-full'>
                                        <label className='text-slate-400' htmlFor="">Full Name</label>
                                        <input className='w-full border border-gray-300 rounded-lg  px-4 py-2 text-neutral-500' onChange={(event) => onChangeHandler(event)} required value={data.name} name='name' type="text" />
                                    </div>
                                )}
                                <div className='flex flex-col items-start justify-center w-full'>
                                    <label className='text-slate-400' htmlFor="">Email Address</label>
                                    <input className='w-full border border-gray-300 rounded-lg  px-4 py-2 text-neutral-500' onChange={(event) => onChangeHandler(event)} required value={data.email} name='email' type="email" />
                                </div>
                                <div className='flex flex-col items-start justify-center w-full'>
                                    <label className='text-slate-400' htmlFor="">Password</label>
                                    <input className='w-full border border-gray-300 rounded-lg px-4 py-2 text-neutral-500 focus:text-gray-500' onChange={(event) => onChangeHandler(event)} required value={data.password} name='password' type="password" />

                                    {state === 'Sign up' && Strength && (
                                        <>
                                            <div className={`w-full border border-gray-200 rounded-2xl h-2 mt-3 ${Strength === 'weak' ? 'w-1/3 bg-red-500' : (Strength === 'medium' ? 'w-2/3 bg-yellow-200' : 'w-full bg-green-500')}`}></div>
                                            <p>{`Your password is ${Strength}`}</p>
                                        </>
                                    )}
                                </div>

                            </div>}
                        {state === "Login" && (
                            <p className='text-gray-500 font-small text-start mt-4 underline'>Forgot password?</p>
                        )}

                        <button className={`w-full hover:bg-blue-400 rounded-3xl py-2.5 px-4 border border-blue-300 bg-blue-500 text-white ${state === 'Login' ? 'mt-4' : 'mt-8'}`}>{state === 'Login' ? 'Login' : (!isSubmitted ? 'Next' : 'Register')}</button>
                    </form>
                </div>

            </div>
        </>

    )
}

export default Authentication