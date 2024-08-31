"use server"
import { fetchAPI } from '@/services/fetchAPI';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const fetchMakesByTypeServer = async (type) => {
  try {
    const makes = await await fetchAPI(`${API_ENDPOINTS.MAKES}?type=${type}`);
    return makes;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      makes: [],
    };
  }
};


export const postDataToServer = async (data) => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.VEHICLE_DETAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    return {
      success: false,
      message: 'Failed to post data',
    };
  }
};