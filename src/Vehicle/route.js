import express  from "express"
import {
//   getAllVehicles,
//   getVehicleById,
  createVehicle,
  getBrowseByVehicles,
//   updateVehicle,
//   deleteVehicle,
  getListVehicles
}  from "./controller.js"
import {upload} from "../Middleware/multer.js"

const router = express.Router();

router.get('/', getListVehicles); 
router.get('/vehicles-by-type', getBrowseByVehicles); 
// router.get('/:id', getVehicleById);
router.post('/', upload.fields([
    {
        name: "image",
        maxCount: 10
    }
]), createVehicle); // Assuming authentication middleware is applied
// router.put('/:id', updateVehicle); // Assuming authentication middleware is applied
// router.delete('/:id', deleteVehicle); // Assuming authentication middleware is applied

export default  router;