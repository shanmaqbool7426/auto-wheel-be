import asyncHandler from 'express-async-handler';
import Footer from './model.js';
import response from '../Utils/response.js';

// Helper function to get the next available order number for a category
const getNextOrder = async (category) => {
  const lastFooterLink = await Footer.findOne({ category })
    .sort({ order: -1 })
    .limit(1);
  return lastFooterLink ? lastFooterLink.order + 1 : 1;
};

// Create a new footer link
export const createFooterLink = asyncHandler(async (req, res) => {
  const { order, section, title, url, vehicleType, category, status, byMake } = req.body;

  const footerLink = new Footer({
    order: order || 0,
    section,
    title,
    url,
    vehicleType,
    category,
    status: status !== undefined ? status : true,
    byMake
  });

  const createdFooterLink = await footerLink.save();
  return response.created(res, 'Footer link created successfully', createdFooterLink);
});

// Get all footer links
export const getAllFooterLinks = asyncHandler(async (req, res) => {
  try {
    const { category, status, section, vehicleType } = req.query;
    const query = {};

    if (category) query.category = category;
    if (status !== undefined) query.status = status === 'true';
    if (section) query.section = section;
    if (vehicleType) query.vehicleType = vehicleType;

    const footerLinks = await Footer.find(query)
      .sort({ category: 1, order: 1 });

    return response.ok(res, 'Footer links retrieved successfully', footerLinks);
  } catch (error) {
    return response.internalServerError(res, error.message);
  }
});

// Get footer link by ID
export const getFooterLinkById = asyncHandler(async (req, res) => {
  try {
    const footerLink = await Footer.findById(req.params.id);
    if (!footerLink) {
      return response.notFound(res, 'Footer link not found');
    }
    return response.ok(res, 'Footer link retrieved successfully', footerLink);
  } catch (error) {
    return response.internalServerError(res, error.message);
  }
});

// Update footer link
export const updateFooterLink = asyncHandler(async (req, res) => {
  try {
    const { order, section, title, url, vehicleType, status, category, byMake } = req.body;
    const footerLink = await Footer.findById(req.params.id);

    if (!footerLink) {
      return response.notFound(res, 'Footer link not found');
    }

    // Check for duplicate order only if order or category is being changed
    if ((order !== footerLink.order || category !== footerLink.category) && order) {
      const existingLink = await Footer.findOne({
        _id: { $ne: req.params.id },
        category: category || footerLink.category,
        order
      });

      if (existingLink) {
        return response.badRequest(res, 'A footer link with this order number already exists in this category');
      }
    }

    footerLink.order = order !== undefined ? order : footerLink.order;
    footerLink.section = section || footerLink.section;
    footerLink.title = title || footerLink.title;
    footerLink.url = url || footerLink.url;
    footerLink.vehicleType = vehicleType || footerLink.vehicleType;
    footerLink.category = category || footerLink.category;
    footerLink.byMake = byMake || footerLink.byMake;
    footerLink.status = status !== undefined ? status : footerLink.status;

    const updatedFooterLink = await footerLink.save();
    return response.ok(res, 'Footer link updated successfully', updatedFooterLink);
  } catch (error) {
    return response.internalServerError(res, error.message);
  }
});

// Delete footer link
export const deleteFooterLink = asyncHandler(async (req, res) => {
  try {
    const footerLink = await Footer.findById(req.params.id);
    if (!footerLink) {
      return response.notFound(res, 'Footer link not found');
    }

    await footerLink.deleteOne();
    return response.ok(res, 'Footer link deleted successfully');
  } catch (error) {
    return response.internalServerError(res, error.message);
  }
});
