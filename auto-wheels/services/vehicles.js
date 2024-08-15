import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchVehiclsData = async (params) => {
  try {
   
     const vehicls= await fetchAPI(`http://localhost:5000/api/vehicle${params}`)
  
     return vehicls
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    vehicls:[]
    };
  }
};
