import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetcHomeData = async () => {
  const results = await Promise.allSettled([
    fetchAPI(API_ENDPOINTS.MAKES),
    fetchAPI(API_ENDPOINTS.BODIES),
    fetchAPI(API_ENDPOINTS.VEHICLES_TYPE()),
    fetchAPI(API_ENDPOINTS.COMPARISONS),
    fetchAPI(API_ENDPOINTS.INSTANT_USED_CARS),
    fetchAPI(API_ENDPOINTS.VIDEOS),
    fetchAPI(API_ENDPOINTS.BLOGS),
  ]);

  const data = {
    makes: results[0].status === 'fulfilled' ? results[0].value : [],
    bodies: results[1].status === 'fulfilled' ? results[1].value : [],
    vehiclesTypes: results[2].status === 'fulfilled' ? results[2].value : [],
    comparisons: results[3].status === 'fulfilled' ? results[3].value : [],
    instantUsedCars: results[4].status === 'fulfilled' ? results[4].value : [],
    videos: results[5].status === 'fulfilled' ? results[5].value : [],
    blogs: results[6].status === 'fulfilled' ? results[6].value : [],
  };

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Error fetching ${Object.keys(data)[index]}:`, result.reason);
    }
  });

  return data;
};
