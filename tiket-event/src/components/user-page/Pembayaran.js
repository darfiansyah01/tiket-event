import React, {useEffect, useState} from 'react'
import { useAuth } from '../../firebase-context/AuthContext'
import { projectStorage, db } from '../../firebase-context/config';
import CurrencyFormat from 'react-currency-format';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import qrcode from '../../qrcode.png';
import 'moment/locale/id';

function Pembayaran() {

    const {UploadBuktiPembayaran} = useAuth();
    const [transaksi, setTransaksi] = useState();
    const [buktiPembayaran, setBuktiPembayaran] = useState();
    const params = useParams();
    const navigate = useNavigate();
    moment.locale("id");

    const onChange = (e) => {
        const file = e.target.files[0]
        uploadFile(file)
    }

    const uploadFile = (file) => {

        if(!file) return;
        
        const storageref = ref(projectStorage, `/files/pembayaran/${file.name}`);
        const uploadTask = uploadBytesResumable(storageref, file);

        uploadTask.on('state_changed', (snap) => {
                console.log("Progress : " + Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
            }, (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setBuktiPembayaran(url)
                })                
            })        
    }

    const handleSubmit = async () => {
        
        if (buktiPembayaran) {
            await UploadBuktiPembayaran(buktiPembayaran, transaksi.kode)
            navigate("/profile")
        } 
    };

    useEffect(() => {       
            
        const fetchData = async () => {
            const docRef = doc(db, "transaksi", params.id);
            const docSnap = await getDoc(docRef);
            const dataRef = docSnap.data();               
            setTransaksi(dataRef)
            setBuktiPembayaran(dataRef.bukti_pembayaran)
        }      
            fetchData()
            
        }, [])

  return (
      <div className='contain grid grid-cols-6 gap-10'>    
        {transaksi && <>
            <div className='col-span-4'>  
                <div className="bg-white shadow overflow-hidden mb-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                    <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Detail informasi</h3>
                    <div className="border-t border-gray-200 mt-5">
                        <dl>
                            <div className="bg-white list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                                <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{transaksi.user.nama}</dd>
                            </div>
                            <div className="bg-gray-50 list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm sm:mt-0">{transaksi.user.email}</dd>
                            </div>
                            <div className="bg-white list-wrap">
                                <dt className="text-sm font-medium text-gray-500">No.Telp</dt>
                                <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{transaksi.user.no_telp}</dd>
                            </div>
                            <div className="bg-gray-50 list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                                <dd className="mt-1 text-sm sm:mt-0 md:col-span-2">{transaksi.user.alamat}</dd>
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
                                    <img src={transaksi.event.imageUrl} alt={transaksi.event.nama_event} className="h-full w-full"/>
                                </dt>                            
                                <dd className="text-sm col-span-2 h-36">
                                    <h3 className='text-md capitalize'>{transaksi.event.nama_event}</h3>
                                    <p className='text-slate-500 text-base italic capitalize mt-1 mb-4'>Venue : {transaksi.event.venue}, {transaksi.event.kota}</p>                            
                                    {transaksi.event.tglMulai === transaksi.event.tglBerakhir ? 
                                        <p className='text-gray-500 font-semibold text-sm'>{moment(new Date(transaksi.event.tglMulai)).format("dddd, ll")}</p>
                                        : 
                                        <p className='font-bold text-slate-500 italic'>{moment(new Date(transaksi.event.tglMulai)).format("dddd")} - {moment(new Date(transaksi.event.tglBerakhir)).format("dddd")}, {moment(new Date(transaksi.event.tglMulai)).format("ll")} - {moment(new Date(transaksi.event.tglBerakhir)).format("ll")}</p>
                                    }                               
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div> 
                <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                    <h3 className="text-sm font-medium mx-4 mt-5 mb-2 flex justify-between md:text-md">Bukti Pembayaran</h3>
                    <p className='text-t12 italic text-slate-400 capitalize mx-4 md:text-sm'>Setelah Bukti Pembayaran di Validasi Anda akan mendapatkan qrcode</p>
                    <div className="border-t border-gray-200 mt-5">
                        <dl>
                            <div className="bg-white list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Total Bayar</dt>
                                <CurrencyFormat
                                    renderText={(value) => (   
                                        <dd className="mt-1 text-sm md:mt-0 md:col-span-2 md:text-base">{value}</dd>
                                    )}
                                    displayType={"text"}
                                    value={transaksi.total_bayar}
                                    thousandSeparator={true}
                                    prefix={"Rp."}
                                />
                            </div>                            
                            <div className="bg-white list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Status Pembayaran</dt>
                                <dd className="mt-1 text-sm sm:mt-0 md:col-span-2 capitalize">
                                    {transaksi.status_pembayaran === "validasi" ?                                    
                                        <span className='py-2 px-8 bg-amber-600 text-white font-medium rounded-sm'>{transaksi.status_pembayaran}</span>
                                        :
                                        transaksi.status_pembayaran === "berhasil" ? 
                                            <span className='py-2 px-8 bg-green-700 text-white font-medium rounded-sm'>{transaksi.status_pembayaran}</span>
                                            :
                                            <span className='py-2 px-8 bg-red-800 text-white font-medium rounded-sm'>Belum Bayar</span>
                                    }
                                    
                                    </dd>
                            </div>
                            <div className="bg-white list-wrap">
                                <dt className="text-sm font-medium text-gray-500">Bukti Pembayaran</dt>
                                <dd className="mt-1 md:mt-0">
                                    <div className='h-36 w-36 border border-slate-700 border-dashed flex justify-center items-center rounded-md p-4 md:h-48 md:w-48'>
                                        {buktiPembayaran ? 
                                            <img src={buktiPembayaran} alt="Bukti Pembayaran" className='w-2/3'/> 
                                            :
                                            <button className='bg-slate-700 text-white py-2 px-3 text-t12 uppercase shadow-md rounded-sm' onClick={() => ( document.querySelector("#file-input").click())}>Upload</button>
                                        }</div>
                                    <input type="file" name="file" id='file-input' className='text-sm hidden' onChange={onChange}/>
                                </dd>
                            </div>                    
                        </dl>
                    </div>
                </div>
                {transaksi.status_pembayaran === "validasi" ?
                    <button className='w-full py-3 mt-5 uppercase bg-slate-700 text-white font-semibold text-sm rounded-md hover:opacity-80' onClick={(() => navigate('/profile'))}>Back</button>
                    :
                    <button className='w-full py-3 mt-5 uppercase bg-slate-700 text-white font-semibold text-sm rounded-md hover:opacity-80' onClick={handleSubmit}>Bayar</button>
                }
            </div>
            <div className='col-span-2'> 
                {transaksi.status_pembayaran === "berhasil" ?
                    <div className="bg-white shadow overflow-hidden mb-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
                        <h3 className="text-sm font-medium mt-5 mb-2 md:text-md">QR Code</h3>
                        <p className='text-sm italic text-slate-400 capitalize'>Validasi Pembayaran telah berhasil </p>
                        <div className="border-t border-gray-200 mt-5">
                            <div className="flex flex-col divide-y">  
                                <div className='flex justify-center items-center flex-col py-3 w-full'>
                                    <img src={qrcode} alt="QRCODE" className='inline-block w-full'/>
                                    <div className='flex items-start text-slate-300'>
                                        <span className='mr-2 text-md'>*</span>
                                        <p className='capitalize text-sm italic'>QRCode ini digunakan untuk memasuki area event pastikan untuk tidak menghilangkan atau menghapus QRCode ini</p>
                                    </div>
                                    <div className='flex items-start text-slate-300'>
                                        <span className='mr-2 text-md'>*</span>
                                        <p className='capitalize text-sm italic'>apabila pengunjung tidak dapat memperlihatkan qrcode yang telah didapatkan setelah memsan tiket maka pengunjung tersebut tidak dapat memasuki area event</p>
                                    </div>
                                </div>         
                            </div>
                        </div>
                    </div>
                    :
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
                                            value={transaksi.event.harga}
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
                                            value={transaksi.event.harga}
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
                                    value={transaksi.total_bayar ? transaksi.total_bayar : transaksi.event.harga}
                                    thousandSeparator={true}
                                    prefix={"Rp."}
                                />          
                            </div >
                        </div>
                    </div>
                    }
                
            </div> 
        </>}
    </div> 
  )
}

export default Pembayaran