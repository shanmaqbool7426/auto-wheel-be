import { fetchAPI } from './fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchTags = async () => {
  try {
     const tags= await fetchAPI(API_ENDPOINTS.TAGS)
  
     return tags
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
    tags:[]
    };
  }
};