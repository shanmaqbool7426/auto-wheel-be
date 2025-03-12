import asyncHandler from 'express-async-handler';
import Banner from './model.js';
import response from '../Utils/response.js';

// Create a new banner
export const createBanner = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, order, link } = req.body;

    // Check if a banner with the same order already exists
    const existingBanner = await Banner.findOne({ order });
    if (existingBanner) {
      return response.badRequest(res, 'A banner with this order number already exists');
    }

    // If no duplicate order, create the banner
    const banner = await Banner.create({
      title,
      description,
      image,
      link,
      order: order || await getNextOrder() // Use helper function to get next available order
    });

    response.created(res, 'Banner created successfully', banner);
  } catch (error) {
    console.error('Error creating banner:', error);
    response.serverError(res, 'Error creating banner');
  }
});

// Helper function to get the next available order number
const getNextOrder = async () => {
  const lastBanner = await Banner.findOne({})
    .sort({ order: -1 })
    .limit(1);
  
  return lastBanner ? lastBanner.order + 1 : 0;
};

// Get all banners
export const getAllBanners = asyncHandler(async (req, res) => {
  try {
    const banners = await Banner.find({ })
      .sort({ order: 1, createdAt: -1 });

    response.ok(res, 'Banners retrieved successfully', banners);
  } catch (error) {
    console.error('Error retrieving banners:', error);
    response.serverError(res, 'Error retrieving banners');
  }
});

// Get all banners
export const getAllActiveBanners = asyncHandler(async (req, res) => {
  try {
    const banners = await Banner.find({ status: true })
      .sort({ order: 1, createdAt: -1 });

    response.ok(res, 'Banners retrieved successfully', banners);
  } catch (error) {
    console.error('Error retrieving banners:', error);
    response.serverError(res, 'Error retrieving banners');
  }
});

// Get banner by ID
export const getBannerById = asyncHandler(async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return response.notFound(res, 'Banner not found');
    }

    response.ok(res, 'Banner retrieved successfully', banner);
  } catch (error) {
    console.error('Error retrieving banner:', error);
    response.serverError(res, 'Error retrieving banner');
  }
});

// Update banner
export const updateBanner = asyncHandler(async (req, res) => {
    try {
      const { title, description, image, status, link, order } = req.body;
      
      const banner = await Banner.findById(req.params.id);
      
      if (!banner) {
        return response.notFound(res, 'Banner not found');
      }
  
      // Check for duplicate order number only if order is being updated
      if (order && order !== banner.order) {
        const existingBanner = await Banner.findOne({ 
          order, 
          _id: { $ne: banner._id } // Exclude current banner from check
        });
        
        if (existingBanner) {
          return response.badRequest(res, 'A banner with this order number already exists');
        }
      }
  
      // Update banner fields
      banner.title = title || banner.title;
      banner.description = description
      banner.image = image || banner.image;
      banner.link = link || banner.link;
      banner.order = order || banner.order;
      banner.status = status !== undefined ? status : banner.status;
  console.log("banner......",banner)
      const updatedBanner = await banner.save();
      
      response.ok(res, 'Banner updated successfully', updatedBanner);
    } catch (error) {
      console.error('Error updating banner:', error);
      response.serverError(res, 'Error updating banner');
    }
  });
// Delete banner
export const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return response.notFound(res, 'Banner not found');
    }

    await banner.deleteOne();
    
    response.ok(res, 'Banner deleted successfully');
  } catch (error) {
    console.error('Error deleting banner:', error);
    response.serverError(res, 'Error deleting banner');
  }
});

// Update banner order
export const updateBannerOrder = asyncHandler(async (req, res) => {
  try {
    const { order } = req.body;
    
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return response.notFound(res, 'Banner not found');
    }

    banner.order = order;
    await banner.save();
    
    response.ok(res, 'Banner order updated successfully', banner);
  } catch (error) {
    console.error('Error updating banner order:', error);
    response.serverError(res, 'Error updating banner order');
  }
});


