import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import { useAuth } from '../../firebase-context/AuthContext';

function Navbar() {

    const { userData } = useAuth();
    const navigate = useNavigate();

    function sidebarOpen() {
        let sidebar = document.querySelector(".nav-options")
        sidebar.classList.add("active")
    }
    function sidebarClose() {
        let sidebar = document.querySelector(".nav-options")
        sidebar.classList.remove("active")
    }

  return (
    <div className='h-16'>
        <div className='h-16 flex justify-between items-center px-3 shadow-md md:px-72 fixed w-full bg-white z-50'>
            <Link to="/">
                <img src={logo} alt="" className='h-6 w-auto'/>
            </Link>
            <div className='nav-options flex flex-col justify-between items-center w-full bg-sky-600 absolute right-0 top-0 h-screen 
                md:h-fit md:bg-inherit text-inherit md:flex-row md:relative md:justify-end'>
                <svg onClick={sidebarClose} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute text-white left-2 top-2 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className='flex items-center font-mono flex-col text-base text-white mt-40 md:text-black md:flex-row md:mt-0'>
                    <Link to="/" className='mb-6 md:mb-0 md:mr-8'>Beranda</Link>
                    <Link to="/" className='mb-6 md:mb-0 md:mr-8'>Promotion</Link>
                    <Link to="/" className='mb-6 md:mb-0 md:mr-8'>Tentang Kami</Link>
                    <Link to="/" className='mb-6 md:mb-0 md:mr-8'>Kontak</Link>
                </div>
                {userData ? 
                    <>
                    <Link to="/profile" className=' absolute left-45 top-20 md:relative md:top-0 md:mr-6'>                        
                        {userData && userData.avatarUrl ? 
                        <img className="inline-block h-12 w-12 rounded-full overflow-hidden shadow-md" src={userData.avatarUrl} alt="Avatar"/> 
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                        }
                    </Link>
                    </>
                    :
                    <button className='w-11/12 bg-sky-900 rounded-sm py-2 text-white font-medium mb-5 md:w-fit md:px-8 md:mb-0 md:mr-4 md:rounded-md'
                    onClick={() => {
                        navigate('/login-page')
                    }} >Login</button>
                }                
            </div>             
            <div className='flex justify-between items-center'>
                <svg onClick={sidebarOpen} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2.5 cursor-pointer md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>                
            </div>
        </div>
    </div>
  )
}

export default Navbar