"use client";

import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '@/store/thunk';
import { useEffect } from 'react';

export const useFetchData = (url, key, options = {}) => {
  const dispatch = useDispatch();
  const {  method = 'GET', body = null, immediate = false } = options;
  const triggerFetch = () => {
    dispatch(fetchData({ url, method, body, key }));
  };

  useEffect(() => {
    if(immediate){
    dispatch(fetchData({ url, method, body, key }));
    }
  }, [])
  

  let data = useSelector((state) => state.data?.entities ? state.data?.entities[key]: undefined);
  const status = useSelector((state) => state.data?.status ? state.data.status[key] : undefined);
  const error = useSelector((state) => state.data?.error ? state.data?.error[key]: undefined);
   data = JSON.stringify(data);

  return { data, status, error, triggerFetch };
};
