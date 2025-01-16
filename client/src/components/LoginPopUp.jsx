import React, { useState } from 'react'

const LoginPopUp = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState('Login')
    const [data,setData] = useState({
        name : '',
        email : '',
        password : ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name 
        const value = event.target.value
        setData((prevData) => ({...prevData, [name]: value}))
    }

  return (
    <div>
        <form className='flex flex-col items-center gap-4 px-4 py-2'>
            <div>
                <h2 className='text-black'>Login</h2>
                <p className='text-blue-500'>Welcome back!Please sign in to continue</p>
            </div>
            <div className='flex flex-col gap-2'>
                {currentState == 'Sign up' 
                  ? <input className=' rounded-full px-6 py-2' type="text" placeholder='First name' name='name' value={data.name} onChange={onChangeHandler}/>
                  : null}
                <input className=' rounded-full px-6 py-2' type="email" placeholder='Email id' name='email' value={data.email} onChange={onChangeHandler}/>
                <input className='w-full border rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Password' name='password' value={data.password} onChange={onChangeHandler}/>
            </div>
            <div>
                {currentState == 'Login' 
                 ? <>
                   <p>Forgot Password?</p>
                   <button className='px-6 py-2 bg-blue-600 text-white font-serif rounded-full'>Login</button></>
                :  <button className='px-6 py-2 bg-blue-600 text-white font-serif rounded-full'>Register</button>}
                
            </div>
            {currentState == 'Login'  
               ? <p>Dont't have an account?<a href="" className='text-blue-600' onClick={() => setCurrentState('Login')}>Sign up</a></p>
               : <p>Already registered?<a href="" className='text-blue-600' onClick={() => setCurrentState('Sign up')}>Login</a></p>}
        </form>
    </div>
  )
}

export default LoginPopUp