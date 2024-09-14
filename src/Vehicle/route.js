import express from "express"
import {
  //   getAllVehicles,
  //   getVehicleById,
  createVehicle,
  getBrowseByVehicles,
  //   updateVehicle,
  //   deleteVehicle,
  getListVehicles,
  getPopularVehicles,
  getPopularVehiclesByReviews,
  getSimilarVehicles,
  getVehicleBySlug,
  // imageUploader
} from "./controller.js"

const router = express.Router();

router.get('/vehicles-by-type', getBrowseByVehicles);
router.get('/get-popular-vehicles', getPopularVehicles);
router.get('/get-popular-by-reviews-vehicles', getPopularVehiclesByReviews);
router.get('/:slug', getVehicleBySlug);
router.get('/getSimilarVehicles/:vehicleId', getSimilarVehicles);
router.get('/vehicles-listing/*', getListVehicles);
router.post('/', createVehicle); // Assuming authentication middleware is applied
// router.put('/:id', updateVehicle);
// router.delete('/:id', deleteVehicle); 

// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
