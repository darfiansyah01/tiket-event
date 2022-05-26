import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase-context/AuthContext';
import Modal from './Modal';
import moment from 'moment';
import 'moment/locale/id';

function Checkout() {

    
    const {userData, tambahTransaksi, transaksi, deleteTransaksi} = useAuth();
    const [bankPembayaran, setBankPembayaran] = useState("mandiri");
    const [isOpen, setIsOpen] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    moment.locale("id");

    async function handleSubmit(){

        if (userData && location.state){
            const total_bayar = location.state.harga
            await tambahTransaksi(userData, location.state, bankPembayaran, total_bayar).then(() => {
                setIsOpen(true)
            })                       
        } else{
            console.log("tanggal tidak boleh kosong")
        }
       
    } 

    function nextStep(){
        if(transaksi){
            navigate(`/deskripsi/checkout/pembayaran/${transaksi.kode}`)    
        }                 
    }

  return (
    <div className='contain grid grid-cols-6 gap-10'>     
        <div className='col-span-4'> 
            <div className="bg-white shadow overflow-hidden mb-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Detail informasi</h3>
                <div className="border-t border-gray-200 mt-5">
                    <dl>
                        <div className="bg-white list-wrap">
                            <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                            <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.nama}</dd>
                        </div>
                        <div className="bg-gray-50 list-wrap">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm sm:mt-0">{userData.email}</dd>
                        </div>
                        <div className="bg-white list-wrap">
                            <dt className="text-sm font-medium text-gray-500">No.Telp</dt>
                            <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.no_telp}</dd>
                        </div>
                        <div className="bg-gray-50 list-wrap">
                            <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                            <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{userData.alamat}</dd>
                        </div>          
                    </dl>
                </div>
            </div> 
            <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Informasi Event</h3>
                <div className="border-t border-gray-200 mt-5">
                    <dl>
                        <div className="bg-white list-wrap">
                            <dt className="text-sm font-medium text-gray-500 bg-gray-900">
                                <img src={location.state.imageUrl} alt={location.state.nama_event} className="h-full w-full"/>
                            </dt>                            
                            <dd className="text-sm col-span-2 h-36">
                                <h3 className='text-md capitalize'>{location.state.nama_event}</h3>
                                <p className='text-slate-500 text-base italic capitalize mt-1 mb-4'>Venue : {location.state.venue}, {location.state.kota}</p>                            
                                {location.state.tglMulai === location.state.tglBerakhir ?                                
                                    <p className='text-gray-500 font-semibold text-sm'>{moment(new Date(location.state.tglMulai)).format("ddd, MMM Do YYYY")}</p>
                                    : 
                                    <p className='text-gray-500 font-semibold text-sm'>{moment(new Date(location.state.tglMulai)).format("ddd, MMM Do YYYY") + " - " + moment(new Date(location.state.tglBerakhir)).format("ddd, MMM Do YYYY")}</p>
                                }                               
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>  
            <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Pembayaran</h3>
                <div className="border-t border-gray-200 mt-5">
                    <dl>
                        <div className="bg-gray-50 list-wrap">
                            <dt className="text-sm font-medium text-gray-500">Metode Pembayaran Transfer ke</dt>
                            <select className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={bankPembayaran} onChange={((e) => setBankPembayaran(e.target.value))} >
                                <option value="mandiri">BANK Mandiri</option>
                                <option value="bca">BANK BCA</option>             
                                <option value="bri">BANK BRI</option>                                
                            </select>
                        </div>
                    </dl>
                </div>
            </div> 
            <button className='w-full py-3 mt-5 uppercase bg-slate-700 text-white font-semibold text-sm rounded-md hover:opacity-80' onClick={handleSubmit}>Bayar</button>         
        </div> 
        <div className='col-span-2'> 
            <div className="bg-white shadow overflow-hidden mb-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                <h3 className="text-sm font-medium mt-5 mb-2 md:text-md">Subtotal</h3>
                <div className="border-t border-gray-200 mt-5">
                    <div className="flex flex-col divide-y">        
                        <div className='flex flex-col mb-4'>
                            <div className='flex justify-between items-center w-full my-4'>
                                <p className='text-sm'>Items : 1</p>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <span className='text-sm font-semibold'>{value}</span>
                                    )}
                                    displayType={"text"}
                                    value={location.state.harga}
                                    thousandSeparator={true}
                                    prefix={"Rp."}
                                /> 
                            </div>
                            <div className='w-full mb-4'>
                                <p className='text-sm font-semibold mb-2'>PROMO CODE</p>
                                <div className='flex items-center justify-between'>                                                            
                                    <input type="text" className='border-sky-900 border rounded-md w-full p-2 outline-none text-sm'/>
                                    <button className='bg-slate-700 ml-2 px-2 py-2.5 text-sm rounded-md font-semibold uppercase text-white'>Apply</button>
                                </div>
                            </div>            
                            <div className='flex justify-between items-center w-full mb-4'>
                                <p className='text-sm'>Diskon</p>
                                <span className='text-sm font-semibold'>0%</span>
                            </div>         
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-sm'>Subtotal</p>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <span className='text-sm font-semibold'>{value}</span>
                                    )}
                                    displayType={"text"}
                                    value={location.state.harga}
                                    thousandSeparator={true}
                                    prefix={"Rp."}
                                /> 
                            </div>
                        </div>    
                        <CurrencyFormat
                            renderText={(value) => (
                                <div className='flex justify-between items-center w-full mb-5'>
                                    <p className='text-base mt-5'>TOTAL</p>
                                    <span className='text-sm font-semibold mt-5'>{value}</span>
                                </div>    
                            )}
                            displayType={"text"}
                            value={location.state.harga}
                            thousandSeparator={true}
                            prefix={"Rp."}
                        />          
                    </div >
                </div>
            </div>               
        </div> 
        {isOpen && <Modal pesan={"Apakah anda yakin ingin membeli tiket ini ?"} close={(async () => await deleteTransaksi(transaksi).then(() => setIsOpen(false)))} openModal={isOpen} type={"basic"} submit={nextStep} />}
    </div>   
  )
}

export default Checkout