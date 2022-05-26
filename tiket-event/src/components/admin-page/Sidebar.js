import React from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase-context/AuthContext';

function Sidebar() {

    const {logout} = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/")
        } catch {
            console.log("gagal logout")
        }
    }

  return (
    <div className='fixed w-96 max-w-sm flex flex-col h-screen py-10 px-10'>
        <div className='text-gray-500'>
            <h3 className='uppercase text-base font-semibold pl-6 pb-4'>admin</h3>
            <ul>
                <NavLink to="/admin-page" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <rect x="4" y="4" width="6" height="5" rx="2" />  
                            <rect x="4" y="13" width="6" height="7" rx="2" />  
                            <rect x="14" y="4" width="6" height="7" rx="2" />  
                            <rect x="14" y="15" width="6" height="5" rx="2" />
                        </svg>
                        <p className='ml-4 text-base'>Dashboard</p>
                    </li>
                </NavLink>
                <NavLink to="/admin-pages/event" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <p className='ml-4 text-base'>Your Event</p>
                    </li>
                </NavLink>                
                <NavLink to="/admin-pages/transaksi" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <p className='ml-4 text-base'>Transaksi</p>
                    </li>
                </NavLink>
                <NavLink to="/admin-pages/calendar" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className='ml-4 text-base'>Calendar</p>
                    </li>
                </NavLink>
                <NavLink to="/admin-pages/laporan" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <p className='ml-4 text-base'>Laporan</p>
                    </li>
                </NavLink>
                <NavLink to="/admin-pages/chat" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className='ml-4 text-base'>Chat</p>
                    </li>
                </NavLink>
            </ul>
        </div>
        <div className='text-gray-500 mt-6'>
            <h3 className='uppercase text-base font-semibold pl-6 pb-4'>account</h3>
            <ul>
                <NavLink to="/admin-pages/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className='ml-4 text-base'>Admin Profile</p>
                    </li>
                </NavLink>
                <NavLink to="/admin-pages/setting" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <li className='sidebar-link'>           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className='ml-4 text-base'>Setting</p>
                    </li>
                </NavLink>
                <li className='sidebar-link' onClick={handleLogout}>           
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <p className='ml-4 text-base'>Logout</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar