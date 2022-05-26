import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase-context/config';
import ProductCard from './ProductCard';

function Home() {

    const [eventList, setEventList] = useState();

    useEffect(() => {
      const fetchData = async () => {
          const data = await getDocs(collection(db, "event"))
          setEventList(data.docs.map(doc => ({ ...doc.data() })))
          }
      fetchData();
    }, [])

  return (
    <div className='contain'>
        <div className='mt-1 grid grid-cols-2 gap-y-12 gap-x-12 md:grid-cols-4 md:mt-6'>
            {eventList && eventList.map((data, key) => (<ProductCard data={data} key={key} />))}
        </div>
    </div>
  )
}

export default Home