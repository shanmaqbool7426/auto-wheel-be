const typeMapping = {
  cars: 'car',
  bikes: 'bike',
  trucks: 'truck',
};


export const formatPrice = (price) => {
    return price?.toFixed()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

  // Utility function to calculate the time ago string
export const getTimeAgo = (lastUpdateDate) => {
    const timeDiff = new Date() - new Date(lastUpdateDate);
    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) return `Updated ${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `Updated ${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `Updated ${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  
    return "Updated just now";
  };

  export const formatDate=(dateString)=> {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
  

export const reorderSlug = (slug,view,sortBy) => {
  const basePath = slug[0];
  const makes = slug.filter((item) => item.startsWith('mk_'));
  const models = slug.filter((item) => item.startsWith('md_'));
  const cities = slug.filter((item) => item.startsWith('ct_'));
  const bodyType = slug.filter((item) => item.startsWith('bt_'));
  const page = slug.find((item) => item.startsWith('page_'));
  const price = slug.find((item) => item.startsWith('pr_'));
  const year = slug.find((item) => item.startsWith('yr_'));
  const mileage = slug.find((item) => item.startsWith('ml_'));
  const transmission = slug.find((item) => item.startsWith('tr_'));
  const drive = slug.find((item) => item.startsWith('dr_'));
  const exteriorColor = slug.find((item) => item.startsWith('cl_'));
  const fuelType = slug.find((item) => item.startsWith('ft_'));
  const condition = slug.find((item) => item.startsWith('cn_'));

  const dynamicSlug = [
      `t_${typeMapping[basePath]}`,
      ...makes,
      ...models,
      ...cities,
      ...bodyType,
      page,
      price,
      year,
      mileage,
      transmission,
      drive,
      exteriorColor,
      fuelType,
      condition,
      sortBy
  ].filter(Boolean);

  return `/${dynamicSlug.join('/')}`;
};