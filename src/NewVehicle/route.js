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
  getComparison
} from "./controller.js";  // Import new vehicle controller

const router = express.Router();

// -------------------- New Vehicle Routes --------------------

// Create a new vehicle
router.post('/', createNewVehicle);

// List all new vehicles with filters
router.get('/', getListNewVehicles);

router.get('/get-popular-by-reviews-vehicles', getPopularVehiclesByReviews);


// Get popular new vehicles based on views
router.get('/popular', getPopularNewVehicles);

// Get top comparison new vehicles
router.get('/comparison', getTopComparisonVehicles);

// Get comparison new vehicles
router.post('/compare', getComparison);

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
router.delete('/:id', deleteNewVehicle);

// Get details of a new vehicle by slug
router.get('/:slug', getNewVehicleBySlug);



// -------------------- Additional Image Uploader (Optional) --------------------
// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
