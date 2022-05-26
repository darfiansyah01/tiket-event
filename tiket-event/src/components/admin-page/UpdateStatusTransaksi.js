import React, {useState, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import { useAuth } from '../../firebase-context/AuthContext';

function UpdateStatusTransaksi() {

    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [statusPembayaran, setStatusPembayaran] = useState(location.state.status_pembayaran)
    const navigate = useNavigate();
    const {updateStatusPembayaran} = useAuth();

    async function updateTransaksi(){
        await updateStatusPembayaran(location.state.kode)
        setIsModalOpen(true)
    }

    let Modal = () => {
        return (
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={(() => setIsModalOpen(false))}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="mt-2 flex justify-center items-center flex-col">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    <p className="text-md font-semibold my-4 capitalize text-black text-center">Status Pembayaran Berhasil Terupdate !!!</p>
                                    <button type="button" className="inline-flex justify-center px-4 py-2 text-base uppercase font-medium text-sky-900 bg-slate-300 border rounded-md hover:bg-sky-900 hover:text-slate-300
                                    transition ease-in-out delay-100" onClick={(() =>{ 
                                        setIsModalOpen(false) 
                                        navigate("/admin-pages/transaksi")
                                    })}>Selesai</button>
                                    
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        )
    }

    let ImageModal = ({bukti_pembayaran}) => {
        return (
            <Transition appear show={isImageModalOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={(() => setIsImageModalOpen(false))}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <div className="inline-block w-3/6 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <img src={bukti_pembayaran} alt="Bukti Pembayaran" />
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        )
    }
    
  return (
    <>
        <div className="bg-white shadow overflow-hidden mb-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
            <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Detail informasi</h3>
            <p className='text-t12 italic text-slate-400 capitalize mx-4 md:text-sm'>pastikan identitas diri anda sudah benar dan tepat</p>
            <div className="border-t border-gray-200 mt-5">
                <dl>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{location.state.user.nama}</dd>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm sm:mt-0">{location.state.user.email}</dd>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">No.Telp</dt>
                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{location.state.user.no_telp}</dd>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{location.state.user.alamat}</dd>
                    </div>          
                </dl>
            </div>
        </div> 
        <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
            <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Pembayaran</h3>
            <div className="border-t border-gray-200 mt-5">
                <dl>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Status Pembayaran</dt>                                                
                        <select className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={statusPembayaran} onChange={((e) => setStatusPembayaran(e.target.value))}>
                            <option value="validasi">Menunggu Validasi</option>
                            <option value="berhasil">Berhasil</option>                        
                        </select>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Metode Pembayaran</dt>                           
                        <dd className="mt-1 text-sm sm:mt-0 md:col-span-2 uppercase">{location.state.metode_pembayaran}</dd>    
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Total Bayar</dt>      
                        <CurrencyFormat
                            renderText={(value) => (
                                <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{value}</dd>  
                            )}
                            displayType={"text"}
                            value={location.state.total_bayar}
                            thousandSeparator={true}
                            prefix={"Rp."}
                        />                       
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Bukti Pembayaran</dt>
                        <dd className="mt-1 md:mt-0">
                            {location.state.bukti_pembayaran ? 
                                <div className='h-36 w-36 border border-slate-700 border-dashed flex justify-center items-center rounded-md p-4 md:h-48 md:w-48'>
                                    <img src={location.state.bukti_pembayaran } alt="Bukti Pembayaran" className='w-2/3 cursor-pointer'  onClick={(() => setIsImageModalOpen(true))}/> 
                                </div>
                                : null
                            }
                        </dd>
                    </div>  
                </dl>
            </div>
        </div>
        <button className='w-full py-3 mt-5 uppercase bg-slate-700 text-white font-semibold text-sm rounded-md hover:opacity-80' onClick={updateTransaksi}>Update</button>
        {isModalOpen && <Modal/>}
        {isImageModalOpen && <ImageModal bukti_pembayaran={location.state.bukti_pembayaran} />}
    </>
  )
}

export default UpdateStatusTransaksi