const VIEW_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const viewCache = new Map();

// Clean up old entries every hour to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of viewCache.entries()) {
    if (now - timestamp > VIEW_TIMEOUT) {
      viewCache.delete(key);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

export const shouldCountView = (identifier) => {
  const now = Date.now();
  const lastView = viewCache.get(identifier);
  
  if (!lastView || (now - lastView) > VIEW_TIMEOUT) {
    viewCache.set(identifier, now);
    return true;
  }
  
  return false;
};