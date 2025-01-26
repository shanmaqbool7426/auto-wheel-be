/**
 * Creates a URL-friendly slug from a string
 * @param {string} str - The string to convert to a slug
 * @returns {string} The slugified string
 */
export const createSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/[\s_-]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
};

// Add any other utility functions here