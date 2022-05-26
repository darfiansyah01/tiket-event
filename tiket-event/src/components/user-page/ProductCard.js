import React from 'react';
import CurrencyFormat from 'react-currency-format';
import dateFormat from "dateformat";
import { useNavigate } from 'react-router-dom';

function ProductCard({data}) {

    const navigate = useNavigate();

  return (
    <div className="relative">
        <div className='w-full bg-slate-200 rounded-tr-xl rounded-bl-xl h-32 md:h-52'>
            <img src={data.imageUrl} alt={data.nama_event} className="inline-block w-full h-full rounded-tr-xl rounded-bl-xl"/>
        </div>
            <p className='text-t11 uppercase text-slate-700 font-medium md:text-sm line-clamp-1 mt-2'>{data.nama_event}</p>
            <div className='flex items-center italic my-1'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className='text-t11 uppercase font-medium ml-1 mb-1'>{data.kota}</p>
            </div>                        
            <p className='line-clamp-2 text-t11 my-2'>{data.syarat}</p>
            <div className='flex items-center justify-between my-4'>
                {data.tglMulai === data.tglBerakhir ? 
                    <p className='text-gray-500 font-semibold text-sm'>{dateFormat(new Date(data.tglMulai), "dd mmm yyyy")}</p>
                    : 
                    <p className='text-gray-500 font-semibold text-sm'>{dateFormat(new Date(data.tglMulai), "dd mmm yyyy")} - {dateFormat(new Date(data.tglBerakhir), "dd mmm yyyy")}</p>
                }                               
                <CurrencyFormat
                    renderText={(value) => (
                        <p className='text-gray-500 font-semibold text-sm'>{value}</p>
                    )}
                    displayType={"text"}
                    value={data.harga}
                    thousandSeparator={true}
                    prefix={"IDR "}
                />
            </div>
        <button className='bg-slate-700 py-1 px-5 w-full flex justify-end relative text-slate-200 text-sm md:text-base rounded-tl-xl rounded-br-xl mt-1 cursor-pointer font-semibold italic md:py-2 md:justify-center uppercase' onClick={(() => navigate(`/deskripsi/${data.kode}` ))}> get ticket </button>
    </div>
  )
}

export default ProductCard