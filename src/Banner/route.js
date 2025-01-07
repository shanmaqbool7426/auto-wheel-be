import express from 'express';
import { 
  createBanner, 
  getAllBanners, 
  getBannerById, 
  updateBanner, 
  deleteBanner,
  updateBannerOrder
} from './controller.js';

const router = express.Router();

// Create a new banner
router.post('/', createBanner);

// Get all banners
router.get('/', getAllBanners);

// Get a specific banner by ID
router.get('/:id', getBannerById);

// Update a banner
router.put('/:id', updateBanner);

// Delete a banner
router.delete('/:id', deleteBanner);

// Update banner order
router.put('/order/:id', updateBannerOrder);

export default router;
