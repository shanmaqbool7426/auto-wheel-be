import express from "express";
import {
  createNewVehicle,
  getListNewVehicles,
  getPopularNewVehicles,
  getNewVehicleBySlug,
  getSimilarNewVehicles,
  updateNewVehicle,
  deleteNewVehicle,
  getUpcomingNewVehicles,
  getVehiclesByMake,
  getPopularVehiclesByReviews,
  getNewlyLaunchedVehicles,
  getTopComparisonVehicles,
  getComparison,
  getListVehicles,
  getVehicleById,
  bulkDeleteVehicles,
  getVehicleVariants
} from "./controller.js";  // Import new vehicle controller

const router = express.Router();

// -------------------- New Vehicle Routes --------------------

// Create a new vehicle
router.post('/', createNewVehicle);
router.get('/get-vehicle-by-id', getVehicleById);

// List all new vehicles with filters
router.get('/', getListNewVehicles);

router.get('/get-popular-by-reviews-vehicles', getPopularVehiclesByReviews);


// Get popular new vehicles based on views
router.get('/popular', getPopularNewVehicles);

// Get top comparison new vehicles
router.get('/comparison', getTopComparisonVehicles);

// Get comparison new vehicles
router.post('/compare', getComparison);

// Get comparison new vehicles
router.get('/vehicles-listing/*', getListVehicles);

// Get  newly launched vehicles 
router.get('/newly-launched', getNewlyLaunchedVehicles);

// Get upcoming new vehicles (releaseDate in the future)
router.get('/upcoming', getUpcomingNewVehicles);

// Get similar new vehicles by make/model
router.get('/similar/:vehicleId', getSimilarNewVehicles);

// Get vehicles by make
router.get('/make', getVehiclesByMake);

// Update a new vehicle by ID
router.put('/update/:id', updateNewVehicle);

// Delete a new vehicle by ID
// router.delete('/:id', deleteNewVehicle);

// Get vehicle variants (place this BEFORE the /:slug route)

// Get details of a new vehicle by slug
router.get('/:slug', getNewVehicleBySlug);

router.delete('/bulk-delete', bulkDeleteVehicles);

// Get vehicle variants
router.get('/variants/:slug', getVehicleVariants);


// -------------------- Additional Image Uploader (Optional) --------------------
// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
