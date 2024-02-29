import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const Nav =useNavigate();

    const LoginHandler =()=>{
        Nav('/')
    }
  return (
    <div>
        <div className='border flex justify-end'>
            <button onClick={LoginHandler} className="bg-violet-500 outline-none text-white py-2 px-4 rounded mt-2 mb-2 ">
                Login
            </button>
        </div>
        <div className='flex items-center justify-center my-20 capitalize'>
            <h2 className='text-black-600 font-black text-xl'>
                Thank you for visiting our music player , i hope you liked it
            </h2>
        </div>
    </div>
  )
}

export default Logout

    