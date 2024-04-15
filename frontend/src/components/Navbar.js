import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export const Navbar = () => {
  const Auth = useAuthContext();
  return (
    <div className='w-screen shadow py-6 px-10 flex items-center justify-between bg-white sticky top-0 z-50'>
        <span> SMD </span> 
         
        {!Auth.user ? <div className='flex items-center gap-4'>
            <Link to={"/auth/login"} className='border rounded-md py-2 px-4'> Login </Link>
            <Link to={"/auth/register"} className='border rounded-md py-2 px-4 bg-gray-600 text-white'> Register </Link>
        </div> : 
        <button onClick={()=>{Auth.dispatch({type: 'LOGOUT'})}} className='border border-red-400 text-red-400 rounded-md py-2 px-4'> Logout </button>
        }
    </div>
  )
}
