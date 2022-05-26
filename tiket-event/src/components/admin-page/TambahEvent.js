import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { projectStorage } from '../../firebase-context/config';
import { useAuth } from '../../firebase-context/AuthContext';


function TambahEvent() {

    const [banner, setBanner] = useState();
    const [namaEvent, setNamaEvent] = useState();
    const [stokTiket, setStokTiket] = useState();
    const [harga, setHarga] = useState();
    const [syarat, setSyarat] = useState();
    const [tglMulai, setTglMulai] = useState();
    const [tglBerakhir, setTglBerakhir] = useState();
    const [venue, setVenue] = useState();
    const [kota, setKota] = useState();
    const [kategori, setKategori] = useState("festival-musik");

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState()
    const {tambahEvent} = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => {
        const file = e.target.files[0]
        uploadFile(file)
    }

    const uploadFile = (file) => {

        if(!file) return;
        
        const storageref = ref(projectStorage, `/event/${file.name}`);
        const uploadTask = uploadBytesResumable(storageref, file);

        uploadTask.on('state_changed', (snap) => {
                console.log("Progress : " + Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
            }, (err) => setError(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setBanner(url)
                })                
            })        
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
                                    <p className="text-md font-semibold my-2 capitalize text-black">Produk Berhasil Ditambahkan !!!</p>
                                    <button type="button" className="inline-flex justify-center px-4 py-2 text-base uppercase font-medium text-sky-900 bg-slate-300 border border-sky-900 rounded-md hover:bg-sky-900 hover:text-slate-300 hover:border-slate-300
                                    transition ease-in-out delay-100" onClick={next}>Selesai</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        )
    }

    async function handleSubmit() {

        if(namaEvent && harga && kategori && banner && stokTiket && syarat && kota && venue && tglMulai && tglBerakhir){
            await tambahEvent(namaEvent, harga, kategori, stokTiket, venue, kota, syarat, tglMulai, tglBerakhir, banner)
            setIsModalOpen(true);
        } else {
            setError("Form Harus diisi Sebelum Menambahkan Produk")
            console.log(error)
        }
    }

    function next() {
        setIsModalOpen(false);
        navigate("/admin-pages/event");
    }

  return (
    <>
        <div className='mb-8'>
            <ul className='flex items-center'>
                <li className='text-gray-700 font-semibold text-base'><Link to="/admin-pages">Dashboard</Link></li>                                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <li className='text-gray-700 font-semibold text-base'><Link to="/admin-pages/event">Event</Link></li>                             
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <li className='text-gray-700 font-semibold text-base'><Link to="/admin-pages/event/tambah">Tambah Produk</Link></li>
            </ul>
        </div>
        <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
            <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Detail Event</h3>
            <div className="border-t border-gray-200 mt-5">
                <dl>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Nama Event</dt>                            
                        <input type="text" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={namaEvent} onChange={((e) => setNamaEvent(e.target.value))}/>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Harga Tiket</dt>                            
                        <input type="number" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={harga} onChange={((e) => setHarga(e.target.value))}/>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                        <select className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={kategori} onChange={((e) => setKategori(e.target.value))}>
                            <option value="festival-musik">Festival Musik</option>
                            <option value="bazaar">Bazaar</option>             
                            <option value="konser">Konser</option>                             
                        </select>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Jumlah Tiket</dt>                            
                        <input type="number" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={stokTiket} onChange={((e) => setStokTiket(e.target.value))}/>
                    </div>
                </dl>
            </div>
        </div>
        <div className="bg-white shadow overflow-hidden mt-3 sm:rounded-lg text-slate-700 block p-2 md:p-4">
            <h3 className="text-sm font-medium mx-4 mt-5 mb-2 md:text-md">Syarat & Ketentuan Event</h3>
            <div className="border-t border-gray-200 mt-5">
                <dl>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Tanggal Mulai Event</dt>                            
                        <input type="date" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={tglMulai} onChange={((e) => setTglMulai(e.target.value))}/>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Tanggal Berakhir Event</dt>                            
                        <input type="date" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={tglBerakhir} onChange={((e) => setTglBerakhir(e.target.value))}/>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Venue / Tempat</dt>                            
                        <input type="text" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={venue} onChange={((e) => setVenue(e.target.value))}/>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Kota</dt>                            
                        <input type="text" className='border-sky-900 border rounded-md w-full mt-1 p-2 outline-none text-sm' value={kota} onChange={((e) => setKota(e.target.value))}/>
                    </div>
                    <div className="bg-gray-50 list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Syarat & Ketentuan Event</dt>                            
                        <textarea className="block w-full py-3 px-2 text-t12 font-normal text-gray-500 bg-clip-padding border border-solid border-slate-700 rounded-md transition ease-in-out m-0 outline-none"
                            id="syarat" rows="8" value={syarat} onChange={((e) => setSyarat(e.target.value))}>                                
                        </textarea>
                    </div>
                    <div className="bg-white list-wrap">
                        <dt className="text-sm font-medium text-gray-500">Gambar Produk</dt>
                        <dd className="mt-1 md:mt-0">
                                {banner ? 
                                    <img src={banner} alt="Bukti Pembayaran" className='inline-block'/> 
                                    :
                                    <button className='bg-slate-700 text-white py-2 px-3 text-t12 uppercase shadow-md rounded-sm' onClick={() => ( document.querySelector("#file-input").click())}>Upload</button>
                                }
                            <input type="file" name="file" id='file-input' className='text-sm hidden' onChange={onChange}/>
                        </dd>
                    </div>  
                </dl>
            </div>
        </div>
        <button className='w-full py-3 mt-5 uppercase bg-slate-700 text-white font-semibold text-sm rounded-md hover:opacity-80' onClick={handleSubmit}>Tambah</button>
        {isModalOpen && <Modal/>}
    </>
  )
}

export default TambahEvent