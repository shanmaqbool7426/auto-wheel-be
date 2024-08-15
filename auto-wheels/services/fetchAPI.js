export const fetchAPI = async (url) => {
    const response = await fetch(url,{ next: { revalidate: 60 }});
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
  };
  