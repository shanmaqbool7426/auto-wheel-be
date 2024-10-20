import express from "express"
import {
  //   getAllVehicles,
  //   getVehicleById,
  createVehicle,
  deleteVehicle,
  getBrowseByVehicles,
  //   updateVehicle,
  //   deleteVehicle,
  getListVehicles,
  getPopularVehicles,
  getPopularVehiclesByReviews,
  getSimilarVehicles,
  getVehicleBySlug,
  toggleFeaturedVehicle,
  // imageUploader
} from "./controller.js"

const router = express.Router();

router.put('/:vehicleId/toggle-featured', toggleFeaturedVehicle);
router.get('/vehicles-by-type', getBrowseByVehicles);
router.get('/vehicles-by-type', getBrowseByVehicles);
router.get('/get-popular-vehicles', getPopularVehicles);
router.get('/get-popular-by-reviews-vehicles', getPopularVehiclesByReviews);
router.get('/getSimilarVehicles/:vehicleId', getSimilarVehicles);
router.get('/:slug', getVehicleBySlug);
router.get('/vehicles-listing/*', getListVehicles);
router.post('/', createVehicle); // Assuming authentication middleware is applied
// router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle); 

// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
