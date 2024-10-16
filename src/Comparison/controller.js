// controllers/comparisonController.js
import Comparison from './model.js';
import {NewVehicle} from '../NewVehicle/model.js';

// Function to add a new comparison or return existing one
// export const addComparison = async (req, res) => {
//   const { vehicleIds } = req.body;

//   if (!vehicleIds || vehicleIds.length < 2 || vehicleIds.length > 3) {
//     return res.status(400).json({ error: "You must select between 2 and 3 vehicles to compare." });
//   }

//   try {
//     // Check if the combination of vehicle IDs already exists
//     const existingComparison = await Comparison.findOne({
//       vehicles: { $size: vehicleIds.length, $all: vehicleIds }
//     }).populate({
//       path: 'vehicles',
//       model: 'NewVehicle',
//       populate: [
//         { path: 'Car', model: 'Car' },
//         { path: 'Bike', model: 'Bike' },
//         { path: 'Truck', model: 'Truck' }
//       ]
//     });

//     if (existingComparison) {
//       // If comparison already exists, return it
//       return res.status(200).json({
//         message: "Comparison already exists",
//         comparison: existingComparison
//       });
//     }

//     // If not found, create a new comparison
//     const newComparison = new Comparison({
//       vehicles: vehicleIds
//     });

//     await newComparison.save();

//     // Populate the vehicle details before returning
//     const populatedComparison = await Comparison.findById(newComparison._id).populate({
//       path: 'vehicles',
//       model: 'NewVehicle',
//       populate: [
//         { path: 'Car', model: 'Car' },
//         { path: 'Bike', model: 'Bike' },
//         { path: 'Truck', model: 'Truck' }
//       ]
//     });

//     res.status(201).json({
//       message: "New comparison created successfully",
//       comparison: populatedComparison
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// controllers/comparisonController.js

export const addComparison = async (req, res) => {
  const { vehicle1, vehicle2, vehicle3 } = req.body;

  // Check that at least two vehicles are provided
  if (!vehicle1 || !vehicle2 || (vehicle1 && !vehicle2 && vehicle3)) {
    return res.status(400).json({ error: "You must select at least two vehicles to compare." });
  }

  try {
    // Function to find or return a random vehicle
    const findOrRandomVehicle = async (vehicle) => {
      if (vehicle) {
        const existingVehicle = await NewVehicle.findOne({
          make: vehicle.make,
          model: vehicle.model,
          variant: vehicle.variant
        });

        // If vehicle exists, return its ID
        if (existingVehicle) {
          return existingVehicle._id;
        }
      }

      // If vehicle doesn't exist or not provided, return a random vehicle ID
      const randomVehicle = await NewVehicle.aggregate([{ $sample: { size: 1 } }]);
      return randomVehicle[0]._id;
    };

    // Check each vehicle
    const vehicleIds = [];
    vehicleIds.push(await findOrRandomVehicle(vehicle1));
    vehicleIds.push(await findOrRandomVehicle(vehicle2));

    if (vehicle3) {
      vehicleIds.push(await findOrRandomVehicle(vehicle3));
    }

    // Check if the combination of vehicle IDs already exists
    const existingComparison = await Comparison.findOne({
      vehicles: { $size: vehicleIds.length, $all: vehicleIds }
    }).populate({
      path: 'vehicles',
      model: 'NewVehicle',
      populate: [
        { path: 'Car', model: 'Car' },
        { path: 'Bike', model: 'Bike' },
        { path: 'Truck', model: 'Truck' }
      ]
    });

    if (existingComparison) {
      // If comparison already exists, return it
      return res.status(200).json({
        message: "Comparison already exists",
        comparison: existingComparison
      });
    }

    // If not found, create a new comparison
    const newComparison = new Comparison({
      vehicles: vehicleIds
    });

    await newComparison.save();

    // Populate the vehicle details before returning
    const populatedComparison = await Comparison.findById(newComparison._id).populate({
      path: 'vehicles',
      model: 'NewVehicle',
      populate: [
        { path: 'Car', model: 'Car' },
        { path: 'Bike', model: 'Bike' },
        { path: 'Truck', model: 'Truck' }
      ]
    });

    res.status(201).json({
      message: "New comparison created successfully",
      comparison: populatedComparison
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Function to get all comparisons
export const getAllComparisons = async (req, res) => {
    try {
      const comparisons = await Comparison.find().populate({
        path: 'vehicles',
        model: 'NewVehicle',
        populate: [
          { path: 'Car', model: 'Car' },
          { path: 'Bike', model: 'Bike' },
          { path: 'Truck', model: 'Truck' }
        ]
      });
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Function to get a single comparison by ID
export const getComparisonById = async (req, res) => {
    try {
      const comparison = await Comparison.findById(req.params.id).populate({
        path: 'vehicles',
        model: 'NewVehicle',
        populate: [
          { path: 'Car', model: 'Car' },
          { path: 'Bike', model: 'Bike' },
          { path: 'Truck', model: 'Truck' }
        ]
      });
  
      if (!comparison) {
        return res.status(404).json({ error: "Comparison not found" });
      }
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
