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
  