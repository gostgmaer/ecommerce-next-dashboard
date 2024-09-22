"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory,fetchBrands } from '@/store/reducers/masterSlice';

const FetchRedux = () => {

    const dispatch = useDispatch();
    const { data: session } = useSession();


  
 
  
    // const token = { "Authorization": `Bearer ${session?.["accessToken"]}` }
  
  
    useEffect(() => {
      if (session) {
        dispatch(fetchCategory(session?.["accessToken"])); // Fetch wishlist when component mounts
        dispatch(fetchBrands(session?.["accessToken"])); 
      }
  
        
    }, [dispatch]);

  return (
    <div></div>
  )
}

export default FetchRedux