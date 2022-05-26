import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { db } from '../../firebase-context/config';
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from '../../firebase-context/AuthContext';

function ListTransaksi() {

    const [transaksi, setTransaksi] = useState();
    const {userData} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "transaksi"));
            const dataTransaksi = []
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                dataTransaksi.push(doc.data())
            });
            setTransaksi(dataTransaksi.filter((item) => item.event.admin_id === userData.id))
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
                <li className='text-gray-700 font-semibold text-base'><Link to="/admin-pages/transaksi">Transaksi</Link></li>
            </ul>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-t12 text-left text-sky-900 ">
                <thead class="text-sky-900 uppercase">
                    <tr>
                        <th scope="col" class="px-6 py-3">No</th>
                        <th scope="col" class="px-6 py-3">Nama</th>
                        <th scope="col" class="px-6 py-3">Alamat</th>
                        <th scope="col" class="px-6 py-3">No.Telp</th>
                        <th scope="col" class="px-6 py-3">Total Bayar</th>
                        <th scope="col" class="px-6 py-3">Status Pembayaran</th>
                    </tr>
                </thead>
                <tbody>
                    {transaksi && transaksi.map((row, key) => (
                        <tr class="bg-white border-b  text-sm " key={key}>
                            <th scope="row" class="px-6 py-4 font-medium text-sky-900 dark:text-white whitespace-nowrap">{key + 1}</th>
                            <td class="px-6 py-4">{row.user.nama}</td>
                            <td class="px-6 py-4">{row.user.alamat}</td>
                            <td class="px-6 py-4">{row.user.no_telp}</td>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <td class="px-6 py-4">{value}</td>
                                )}
                                displayType={"text"}
                                value={row.total_bayar}
                                thousandSeparator={true}
                                prefix={"Rp."}
                            />
                            <td class="px-6 py-4">{row.status_pembayaran === "berhasil" ? 
                                <p className='py-2 px-4 w-fit uppercase rounded-md text-t12 text-white font-medium bg-green-600'>{row.status_pembayaran}</p>
                                : 
                                row.status_pembayaran === "validasi" ?
                                    <p className='py-2 px-4 w-fit uppercase rounded-md text-t12 text-white font-medium bg-amber-600'>{row.status_pembayaran}</p>
                                    :
                                    <p className='py-2 px-4 w-fit uppercase rounded-md text-t12 text-white font-medium bg-red-700'>Belum Bayar</p>}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div className='flex items-center'>
                                    <button className='py-1 px-2 text-super uppercase text-white rounded-md bg-blue-800 lg:py-2 lg:px-4 lg:text-t12' onClick={(() => navigate(`/admin-pages/transaksi/update/${row.kode}`, {state : row}))}>Edit</button>
                                    <button className='py-2 px-4 text-t12 uppercase text-white rounded-md bg-red-800 ml-2'>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    </>
  )
}

export default ListTransaksi