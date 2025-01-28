import express from "express"
import {
  //   getAllVehicles,
  //   getVehicleById,
  createVehicle,
  deleteBulkVehicles,
  deleteVehicle,
  getBrowseByVehicles,
  //   updateVehicle,
  //   deleteVehicle,
  getListVehicles,
  getOverviewStats,
  getPopularVehicles,
  getPopularVehiclesByReviews,
  getSimilarVehicles,
  getVehicleBySlug,
  getVehiclesForAdmin,
  toggleFeaturedVehicle,
  updateVehicleStatus,
  // imageUploader
} from "./controller.js"
import { protect } from "../Middleware/auth.js";

const router = express.Router();

router.put('/:vehicleId/toggle-featured', toggleFeaturedVehicle);
router.get('/vehicles-by-type', getBrowseByVehicles);
router.get('/get-popular-vehicles', getPopularVehicles);
router.get('/get-user-dashboard-overview',protect,getOverviewStats);


router.get('/get-popular-by-reviews-vehicles', getPopularVehiclesByReviews);
router.get('/getSimilarVehicles/:vehicleId', getSimilarVehicles);
router.get('/:slug', getVehicleBySlug);
router.get('/vehicles-listing/*', getListVehicles);
router.post('/', createVehicle); // Assuming authentication middleware is applied
// router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle); 
//  update vehicle status
router.put('/:vehicleId/update-status', updateVehicleStatus);

// get vehicles for admin
router.get('/admin/vehicles', getVehiclesForAdmin);
router.delete('/admin/bulk-delete', deleteBulkVehicles);
// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
