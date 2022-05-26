import React from 'react';
import { useAuth } from "../../firebase-context/AuthContext";
import NotAllowed from '../auth/NotAllowed';
import Sidebar from './Sidebar';
import logo from '../../logo.png'

function AdminRoutes({children}) {

    const {userData} = useAuth();

    return userData && userData.roles === 1002 ? 
    <>
        <div className='relative h-16'>
            <div className='flex w-full shadow-md font-mono bg-white justify-between items-center px-16 fixed z-50'>               
                <img src={logo} alt="" className='h-6 w-auto'/>
                <div className='flex justify-between items-center'>     
                    <div className='bg-sky-900 rounded-full p-2 text-slate-300 m-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
            </div>
        </div>
        <div className='flex'>
            <div className='relative w-96 max-w-sm'>
                <Sidebar/>
            </div>
            <div className='relative flex-1 pt-10 pr-16 mb-10'>
                {children}
            </div>
        </div>
    </>
    : 
    <NotAllowed/>
}

export default AdminRoutes