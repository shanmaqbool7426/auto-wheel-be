import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchVehiclsData = async (params) => {
  try {
    console.log('>>>>>>>>>>>>>>>>>>>>>complete url',`http://localhost:5000/api/vehicle/${params}`)
     const vehicls= await fetchAPI(`http://localhost:5000/api/vehicle/${params}`)
  
     return vehicls
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    vehicls:[]
    };
  }
};


export const fetchVehiclDetail = async (url) => {
  try {
    console.log('vehicl>>>',url)
     const vehicl= await fetchAPI(url)
     return vehicl
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    vehicls:[]
    };
  }
};
