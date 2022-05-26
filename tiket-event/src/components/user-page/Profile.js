import React, {useState, useEffect} from 'react'
import { useAuth } from '../../firebase-context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase-context/config';
import moment from "moment";
import 'moment/locale/id';
import CurrencyFormat from 'react-currency-format';

function Profile() {

    const {userData, logout} = useAuth();
    const [listTransaksi, setListTransaksi] = useState()
    moment.locale("id")

    const [toggleTab, setToggleTab] = useState(1)
    const navigate = useNavigate();

    async function Logout() {
        try {
            await logout();
            navigate("/")
        } catch {
            console.log("errror")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
                const q = query(collection(db, "transaksi"), where("userId", "==", userData.id));  
                const querySnapshot = await getDocs(q);                  
                setListTransaksi(querySnapshot.docs.map(doc => ({ ...doc.data()})))
        }
    fetchData();
    }, [])

    return (
        <div className="contain">
                <div className='relative'>
                    <div className='flex items-center justify-center flex-col shadow overflow-hidden pt-5 mb-4'>
                        <div className='relative bg-slate-400 rounded-full'>  
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                            </svg>
                            <button className='absolute bottom-1 right-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 bg-white rounded-full ring-2 ring-slate-400 py-px pt-px" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                </svg>          
                            </button>
                            <input type="file" className='hidden' id="input-image" />
                        </div>
                        <button className='bg-slate-200 text-sm w-full py-2 mt-3 uppercase' onClick={(() => navigate('/update-profile'))}>update profile</button>
                    </div>
                    <div>
                        <ul className='grid grid-cols-3 gap-0'>
                            <li className={toggleTab === 1 ? "tabs tabs-active" : "tabs"} onClick={(() =>  setToggleTab(1))}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                                </svg>
                                <span>informasi</span>
                            </li>
                            <li className={toggleTab === 2 ? "tabs tabs-active" : "tabs"} onClick={(() =>  setToggleTab(2))}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                    <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                                </svg>
                                <span>transaksi</span>
                            </li>
                            <li className={toggleTab === 3 ? "tabs tabs-active" : "tabs"} onClick={(() =>  setToggleTab(3))}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                </svg>
                                <span>setting</span>
                            </li>
                        </ul>
                    </div>
                    <div className={toggleTab === 1 ? "block" : "hidden"}>
                        <div className="bg-white shadow overflow-hidden md:rounded-lg text-slate-700">
                            <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Detail informasi</h3>
                            <p className='text-t12 italic text-slate-400 capitalize mx-4 md:text-sm'>pastikan identitas diri anda sudah benar dan tepat</p>
                            <div className="border-t border-gray-200 mt-5">
                                <dl>
                                    <div className="bg-white list-wrap">
                                        <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.nama}</dd>
                                    </div>
                                    <div className="bg-gray-50 list-wrap">
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm sm:mt-0">{userData.email}</dd>
                                        <span className='text-t12 text-blue-800 cursor-pointer justify-self-end hover:text-blue-700'>Change password & email</span>
                                    </div>
                                    <div className="bg-white list-wrap">
                                        <dt className="text-sm font-medium text-gray-500">No.Telp</dt>
                                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.no_telp}</dd>
                                    </div>
                                    <div className="bg-gray-50 list-wrap">
                                        <dt className="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">19 Oktober 1998</dd>
                                    </div>    
                                    <div className="bg-gray-50 list-wrap">
                                        <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.alamat}</dd>
                                    </div>          
                                </dl>
                            </div>      
                        </div>  
                        <button className='w-full py-3 mt-5 uppercase bg-red-900 text-white font-semibold text-sm rounded-md hover:bg-red-800' onClick={Logout}>Logout</button>
                    </div>            
                    <div className={toggleTab === 2 ? 'flex flex-col w-full' : "hidden"}>
                        {listTransaksi && listTransaksi.map((data, key) => (                     
                            
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg text-slate-700 block p-2 my-2 md:p-4" key={key}>
                            <div className='flex items-center justify-between border-b border-gray-200 pb-1 md:pb-2'>
                                <span className='text-t11 font-medium'>Tanggal Transaksi : {moment(new Date(data.createAd.seconds * 1000)).format("lll")}</span>
                                <Link to={{ pathname: `/deskripsi/checkout/pembayaran/${data.kode}`}} className='py-1 px-2 text-super uppercase text-white rounded-md bg-blue-800 lg:py-2 lg:px-4 lg:text-t12'>Lihat Detail</Link>
                            </div>
                            <div className='flex items-start py-2 border-b border-gray-200 md:py-4'>
                                <img src={data.event.imageUrl} alt={data.event.nama_event} className='h-full w-32 rounded-sm object-contain bg-slate-100 mr-2' />    
                                <div className='flex flex-col justify-between'>
                                    <div>
                                    <p className='text-t12 md:text-sm'>{data.event.nama_event}</p>
                                    <span className='text-t11 font-semibold italic capitalize text-slate-500 md:text-t12'>{data.event.venue}, {data.event.kota}</span>  
                                    </div>    
                                    <p>{moment(new Date(data.event.tglMulai)).format("dddd")} - {moment(new Date(data.event.tglBerakhir)).format("dddd")}, {moment(new Date(data.event.tglMulai)).format("ll")} - {moment(new Date(data.event.tglBerakhir)).format("ll")}</p>                      
                                </div>                
                            </div>                    
                            <div className='flex items-center justify-between pt-1 md:pt-3'>
                                <div className='flex items-start justify-center flex-col'>
                                    <span className='text-badge italic md:text-t11 md:mb-1'>Total Bayar</span>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <p className='text-t11 font-semibold md:text-t12'>{value}</p>
                                        )}
                                        displayType={"text"}
                                        value={data.total_bayar}
                                        thousandSeparator={true}
                                        prefix={"Rp."}
                                    />
                                </div>
                                <div className='flex items-end justify-center flex-col'>
                                    <span className='text-badge italic mb-0.5 md:text-t11 md:mb-1'>Status Pembayaran</span>
                                    {data.status_pembayaran === "berhasil" ? 
                                        <p className='text-badge font-semibold bg-green-700 px-1 py-0.5 rounded-sm text-white md:text-t12 md:py-1 md:px-2 uppercase'>{data.status_pembayaran}</p>
                                        :
                                        data.status_pembayaran === "validasi" ?                                            
                                        <p className='text-badge font-semibold bg-amber-700 px-1 py-0.5 rounded-sm text-white md:text-t12 md:py-1 md:px-2 uppercase'>Menunggu {data.status_pembayaran}</p>
                                        :
                                        <p className='text-badge font-semibold bg-red-700 px-1 py-0.5 rounded-sm text-white md:text-t12 md:py-1 md:px-2 uppercase'>Belum Bayar</p>                                        
                                    }
                                </div>
                            </div>
                        </div>
                    ))}            
                    </div>        
                </div>                                                       
        </div >
    )
}

export default Profile