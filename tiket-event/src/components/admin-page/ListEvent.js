import React, {useEffect, useState} from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import dateFormat from "dateformat";
import { db } from '../../firebase-context/config';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from '../../firebase-context/AuthContext';

function ListEvent() {

    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const {userData} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(db, "event"), where("admin_id", "==", userData.id)));
            const data = []
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                data.push(doc.data())
            });
            setEvent(data)
        }
        fetchData();
    }, [])


  return (
    <>
            <div className='mb-8'>
                <ul className='flex items-center'>
                    <li className='text-gray-700 font-semibold text-base'><Link to="/admin-page">Dashboard</Link></li>                                
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    <li className='text-gray-700 font-semibold text-base'><Link to="/admin-pages/event">Event</Link></li>
                </ul>
            </div>
            <div className='flex w-full justify-between items-center mb-6'>
                <button className='text-slate-300 bg-sky-900 flex items-center px-8 py-2 border border-sky-900 rounded-md hover:text-sky-900 hover:bg-slate-300 transition ease-in-out delay-100'
                onClick={(() => navigate('/admin-pages/event/tambah'))}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    Tambah Produk
                </button>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <div className='relative'>
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" className='w-64 font-medium text-sm py-2 bg-slate-50 border border-slate-300 text-slate-500 block pl-10 rounded-md outline-none focus:border-sky-900' placeholder='Search Produk' required/>
                        </div>  
                        <button className='px-3 py-2 bg-sky-900 text-sm ml-2 text-slate-300 rounded-md hover:text-sky-900 hover:bg-slate-300 transition ease-in-out delay-100' >Search</button>
                    </div>              
                    <div  className='flex items-center justify-center ml-2 border border-slate-300 py-2 px-1 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </div>
                </div>          
            </div>
            <ul className='grid gap-6 grid-cols-4'>                
                {event && event.map((data,key) => (
                    <li key={key}>
                        <div className='h-60 w-full flex items-center justify-center bg-slate-200 rounded-tr-2xl rounded-bl-2xl'>
                            <img src={data.imageUrl} alt={data.nama_event} className='inline-block bg-cover h-full w-full rounded-tr-2xl rounded-bl-2xl'/>
                        </div>
                        <div className='flex items-center text-badge justify-center bg-sky-900 my-2 py-2  px-4 text-white rounded-tl-2xl rounded-br-2xl'>
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                <p className='ml-1 uppercase truncate'>{data.kategori}</p>
                            </div>
                            <div className='flex items-center mx-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                                <p className='ml-1'>9348</p>
                            </div>
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                </svg>
                                <p className='ml-1'>9348</p>
                            </div>                            
                        </div>
                        <h3 className='text-sky-900 font-medium text-base capitalize line-clamp-1'>{data.nama_event}</h3>  
                        <div className='flex items-center italic my-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className='text-t12 uppercase font-medium ml-1'>{data.kota}</p>
                        </div>                        
                        <div className='flex items-center justify-between'>
                        {data.tglMulai === data.tglBerakhir ? 
                            <p className='text-gray-500 font-semibold text-sm'>{dateFormat(new Date(data.tglMulai), "dd mmm yyyy")}</p>
                            : 
                            <p className='text-gray-500 font-semibold text-sm'>{dateFormat(new Date(data.tglMulai), "dd mmm yyyy")} - {dateFormat(new Date(data.tglBerakhir), "dd-mm-yyyy")}</p>
                        }                               
                        <CurrencyFormat
                            renderText={(value) => (
                                <p className='text-gray-500 font-semibold text-sm mt-2 mb-4'>{value}</p>
                            )}
                            displayType={"text"}
                            value={data.harga}
                            thousandSeparator={true}
                            prefix={"IDR "}
                        />
                        </div>
                        <div className='flex mt-2'>
                            <button className='bg-sky-900 border-sky-900 border outline-none cursor-pointer py-2 px-8 text-slate-200 uppercase mr-2 shadow-md rounded-bl-xl rounded-tr-xl hover:bg-slate-200 hover:text-sky-900 transition ease-in-out delay-150'>Edit</button>
                            <button className='bg-slate-200 border-sky-900 border outline-none cursor-pointer py-1 px-8 text-sky-900 uppercase shadow-md rounded-bl-xl rounded-tr-xl hover:bg-sky-900 hover:text-slate-200 transition ease-in-out delay-150'>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
  )
}

export default ListEvent