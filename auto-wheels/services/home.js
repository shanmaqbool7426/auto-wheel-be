import { fetchAPI } from '../utils/fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetcHomeData = async () => {
  try {
    const [makes, bodies, vehiclesTypes, comparisons, instantUsedCars, videos, blogs] = await Promise.all([
      fetchAPI(API_ENDPOINTS.MAKES,),
      fetchAPI(API_ENDPOINTS.BODIES),
      fetchAPI(API_ENDPOINTS.VEHICLES_TYPE()),
      fetchAPI(API_ENDPOINTS.COMPARISONS,),
      fetchAPI(API_ENDPOINTS.INSTANT_USED_CARS,),
      fetchAPI(API_ENDPOINTS.VIDEOS,),
      fetchAPI(API_ENDPOINTS.BLOGS,),
    ]);

    return { makes, bodies, vehiclesTypes, comparisons, instantUsedCars, videos, blogs };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      makes: [],
      bodies: [],
      vehiclesTypes: [],
      comparisons: [],
      instantUsedCars: [],
      videos: [],
      blogs: []
    };
  }
};
