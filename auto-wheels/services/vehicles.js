import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchVehiclsData = async (params) => {
  try {
    console.log('>>>>>>>>>>>>>>>>>>>>>complete url',`http://localhost:5000/api/vehicles-listing${params}`)
     const vehicls= await fetchAPI(`https://auto-wheel-be.vercel.app/api/vehicle/vehicles-listing${params}`)
  console.log('>>>>>>>>>>>>>>>>',vehicls.data.results[0])
     return vehicls
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    vehicls:[]
    };
  }
};
export const fetchMakesByType=async(type)=>{
  try {
    const makes= await fetchAPI(`${API_ENDPOINTS.MAKES}?type=${type}`)
    return makes
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    makes:[]
    };
  }
}
export const fetchBodiesByType=async(type)=>{
  try {
    const makes= await fetchAPI(`${API_ENDPOINTS.BODIES}/${type}`)
    return makes
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    makes:[]
    };
  }
}

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


export const fetchSimilarVehicls = async (url) => {
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
