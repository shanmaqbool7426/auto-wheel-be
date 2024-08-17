import express from "express"
import {
  //   getAllVehicles,
  //   getVehicleById,
  createVehicle,
  getBrowseByVehicles,
  //   updateVehicle,
  //   deleteVehicle,
  getListVehicles,
  getVehicleById,
  // imageUploader
} from "./controller.js"
import { upload } from "../Middleware/multer.js"

const router = express.Router();

router.get('/:id', getVehicleById);
router.get('/vehicles-by-type', getBrowseByVehicles);
router.get('/*', getListVehicles);
router.post('/', upload.fields([
  {
    name: "images",
    maxCount: 10
  },
  {
    name: "defaultImage",
    maxCount: 1
  }
]), createVehicle); // Assuming authentication middleware is applied
// router.put('/:id', updateVehicle);
// router.delete('/:id', deleteVehicle); 

// router.post('/upload-image', upload.single("image"), imageUploader);

export default router;
