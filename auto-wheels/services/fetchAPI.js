export const fetchAPI = async (url,options = {}) => {
  const response = await fetch(url, { cache: "no-store" , ...options,});
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.json();
};


