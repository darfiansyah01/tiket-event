import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../firebase-context/config';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import 'moment/locale/id';

function DeskripsiEvent() {

    const [event, setEvent] = useState();
    const navigate = useNavigate();
    const params = useParams();
    moment.locale("id")

    useEffect(() => {       
            
          const fetchData = async () => {
              const docRef = doc(db, "event", params.id);
              const docSnap = await getDoc(docRef);
              const dataRef = docSnap.data();               
              setEvent(dataRef)
          }      
          fetchData()
          
      }, [])


  return (
    <div className='contain'>
      {event && 
        <>
          <div className='w-full h-96  flex items-center justify-center bg-gradient-to-b from-slate-300 to-slate-700 rounded-sm'>
            <img src={event.imageUrl} alt={event.nama_event} className='object-cover w-1/2 h-full'/>
          </div>
          <div className='flex'>
            <div className='mr-12 flex-1 divide-y'> 
              <div className="bg-white overflow-hidden mb-3 sm:rounded-lg text-slate-700 block md:py-4">                
                <h3 className='text-xl2 line-clamp-1 text-slate-700 capitalize'>{event.nama_event}</h3>
                <div className='flex items-end my-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <h5 className='ml-2 text-md'>{event.venue}, {event.kota}</h5>
                </div>
                <p className='font-bold text-slate-500 italic'>{moment(new Date(event.tglMulai)).format("dddd")} - {moment(new Date(event.tglBerakhir)).format("dddd")}, {moment(new Date(event.tglMulai)).format("ll")} - {moment(new Date(event.tglBerakhir)).format("ll")}</p>
              </div> 
              <div className='pt-8'>
                <h3 className='text-md font-bold uppercase mb-2'>Syarat & Ketentuan</h3>
                <p>{event.syarat}</p>
              </div>
            </div>             
            <div className='flex items-start my-4  capitalize '>
              <div className='shadow-lg rounded-md p-8'>
                <p className='font-medium mb-2 text-base'>Harga Tiket</p>                
                <CurrencyFormat
                    renderText={(value) => (
                      <h3 className='font-medium mb-4 text-md text-slate-500'>{value}</h3>
                    )}
                    displayType={"text"}
                    value={event.harga}
                    thousandSeparator={true}
                    prefix={"IDR "}
                />
                <button className='px-20 py-3 bg-amber-500 text-base text-gray-50 rounded-md uppercase font-bold hover:bg-amber-600 transition-all ease-in-out delay-100' 
                onClick={(() => navigate(`/deskripsi/checkout/`, {state : event}))}>Beli tiket </button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default DeskripsiEvent