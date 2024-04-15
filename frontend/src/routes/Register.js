import { MdEmail } from "react-icons/md";
import { FaUnlockAlt, FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

export const Register = () => {
    const Auth = useAuthContext();
    console.log(Auth.user);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // destructuring of array
    const [password, setPassword] = useState("");
    const [passHidden, setPassHidden] = useState(true);
    const passRef = useRef(null); // reffering the password
    const handleRegister = async (e)=>{
        e.preventDefault(); 
        // we use fetch (inbuilt in js) which is slow
        // since this is a network request we will use async await
        try{
            const response = await axios.post('http://localhost:8000/auth/register', {username, email, password}, {headers:{'Content-Type':'application/json'}}); // makes a post request to backend - 1 (api endpoint), 2 (body of req), 3 (headers - to verify req parameters)
            Auth.dispatch({type : 'LOGIN', payload : {user : response.data}}); 
            console.log(response);
        }catch(err){
            console.log(err);
        }
        
    }
    const togglePassHidden = ()=>{
        setPassHidden(!passHidden);
        if(passHidden) passRef.current.type = "text";
        else passRef.current.type = "password";
    }
  return (
    <div className='flex flex-col items-center justify-center gap-8 bg-gray-800 px-10 py-14 border-b rounded-lg'>
        <h1 className='text-4xl text-gray-50 font-bold'> USER REGISTER </h1>
        <form className='flex flex-col gap-8 max-w-xs w-screen'>
            <div className='flex flex-col gap-2 '>
                {/* <label className='text-sm text-gray-50' htmlFor='email'> Email </label> */}
                <div className="flex w-full rounded-full bg-gray-500">
                    <span className="p-2 bg-white rounded-full scale-125"> <FaUser size={24}/> </span> 
                    <input className='bg-transparent w-full rounded-full py-2 px-4 focus-visible:outline-none caret-white text-white' placeholder='Username' type='username' id='username' name='email' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </div>
            </div>
            <div className='flex flex-col gap-2 '>
                {/* <label className='text-sm text-gray-50' htmlFor='email'> Email </label> */}
                <div className="flex w-full rounded-full bg-gray-500">
                    <span className="p-2 bg-white rounded-full scale-125"> <MdEmail size={24}/> </span> 
                    <input className='bg-transparent w-full rounded-full py-2 px-4 focus-visible:outline-none caret-white text-white' placeholder='Email' type='email' id='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {/* <label className='text-sm text-gray-50' htmlFor='password'> Password </label> */}
                <div className="flex items-center w-full rounded-full bg-gray-500">
                    <span className="p-2 bg-white rounded-full scale-125"> <FaUnlockAlt size={24}/> </span>
                    <input ref={passRef} className='bg-transparent w-full rounded-full py-2 px-4 focus-visible:outline-none caret-white text-white' placeholder='Password' type='password' id='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="button" className="mr-2 p-1 " onClick={togglePassHidden}> {passHidden ? <IoEye size={22} color="white"/> : <IoEyeOff size={22} color="white"/>} </button>
                </div>
            </div>
            <button className=' bg-gray-50 px-6 py-2 font-bold rounded-full text-gray-900' onClick={handleRegister}> REGISTER </button>
        </form>
        {Auth.user ? Auth.user.email : ""}         
    </div>
  )
}