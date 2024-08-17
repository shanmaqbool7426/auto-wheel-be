export const fetchAPI = async (url) => {
    const response = await fetch(url,{ cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
  };
  