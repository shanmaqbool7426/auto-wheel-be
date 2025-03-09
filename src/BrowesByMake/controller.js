import asyncHandler from 'express-async-handler';
import BrowesByMake from './model.js';
import responses from "../Utils/response.js";
import mongoose from 'mongoose';
import { uploadToS3 } from '../Utils/s3Upload.js';

export const createMake = asyncHandler(async (req, res) => {
  const { name, type, description } = req.body;

  let companyImageURL = null;

  console.log(">>>>>> payload", req.file)
  // Handle image upload if file exists
  if (req.file) {
    // uploadToS3(file.buffer, file.originalname)

    companyImageURL = await uploadToS3(req.file.buffer, req.file.originalname);
    console.log(">>>>>> companyImageURL", companyImageURL);
    if (!companyImageURL) {
      return responses.badRequest(res, 'Error uploading image');
    }
  }

  const make = new BrowesByMake({
    companyImage: companyImageURL || null,
    name,
    type,
    description,
    models: []  // Initialize with empty models array
  });

  await make.save();

  return responses.created(res, 'Make entry created successfully', make);
});



export const getAllMakes = asyncHandler(async (req, res) => {
  try {
    const { type } = req.query;
    // Only apply type filter if type is valid (not undefined, null, or "undefined")
    const filter = type && type !== 'undefined' ? { type } : {};

    const makes = await BrowesByMake.find(filter);
    return responses.ok(res, 'All make entries retrieved successfully', makes);
  } catch (error) {
    console.error('Error fetching makes:', error);
    return responses.serverError(res, 'Error fetching makes', error);
  }
});


export const getMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  return responses.ok(res, 'Make entry retrieved successfully', make);
});

export const updateMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, type, models, description } = req.body;

  const make = await BrowesByMake.findById(id);
  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  if (req.file) {
    const companyImageURL = await uploadToS3(req.file.buffer, req.file.originalname)
    console.log("companyImageURL",companyImageURL)
    make.companyImage = companyImageURL
  }
  make.name = name
  make.type = type
  make.description = description
  make.models = models
  await make.save();

  return responses.ok(res, 'Make entry updated successfully', make);
});


export const deleteMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findByIdAndDelete(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  return responses.ok(res, 'Make entry deleted successfully');
});


// BrowesByMake/controller.js

// ... existing imports ...

// Add Model to a Make
export const addModel = asyncHandler(async (req, res) => {
  const { makeId } = req.params;
  const { name } = req.body;
  console.log('makeIdmakeId', makeId)
  const make = await BrowesByMake.findById(makeId);
  console.log(">>> make", make)
  if (!make) {
    return responses.notFound(res, 'Make not found');
  }
  // Create slug from name

  const newModel = {
    name,
    variants: []
  };

  make.models.push(newModel);
  await make.save();

  return responses.created(res, 'Model added successfully', newModel);
});

export const addVariant = asyncHandler(async (req, res) => {

  const { name, makeId, modelId } = req.body;

  try {
    // Validate ObjectIds

    if (!mongoose.Types.ObjectId.isValid(makeId) || !mongoose.Types.ObjectId.isValid(modelId)) {
      return responses.badRequest(res, 'Invalid makeId or modelId');
    }

    // First, check if the make exists
    const make = await BrowesByMake.findById(makeId);
    if (!make) {
      return responses.notFound(res, 'Make not found');
    }

    // Find the model using array find
    const modelIndex = make.models.findIndex(
      model => model._id.toString() === modelId
    );

    if (modelIndex === -1) {
      return responses.notFound(res, 'Model not found');
    }

    // Create the new variant

    // Initialize variants array if it doesn't exist
    if (!make.models[modelIndex].variants) {
      make.models[modelIndex].variants = [];
    }

    // Add the new variant
    make.models[modelIndex].variants.push(name);
    // Save the updated document
    await make.save();
    return responses.created(res, 'Variant added successfully', name);
  } catch (error) {
    console.error('Error adding variant:', error);
    return responses.serverError(res, 'Error adding variant');
  }
});

// Update Model
export const updateModel = asyncHandler(async (req, res) => {
  const { makeId, modelId } = req.params;
  const { name } = req.body;


  const updatedMake = await BrowesByMake.findOneAndUpdate(
    {
      _id: makeId,
      "models._id": modelId  // Match the specific model by its _id
    },
    {
      $set: {
        "models.$.name": name  // Update only the name of the matched model
      }
    },
    {
      new: true,  // Return the updated document
      runValidators: true  // Run schema validators
    }
  );

  if (!updatedMake) {
    return responses.notFound(res, 'Make or Model not found');
  }

  // Find the updated model from the returned document
  const updatedModel = updatedMake.models.find(
    model => model._id.toString() === modelId
  );

  return responses.ok(res, 'Model updated successfully', updatedModel);
});

export const updateVariant = asyncHandler(async (req, res) => {
  const { makeId, modelId } = req.params;
  const { name, oldName } = req.body;  // Get both new name and old name

  try {
    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(makeId) || !mongoose.Types.ObjectId.isValid(modelId)) {
      return responses.badRequest(res, 'Invalid makeId or modelId');
    }

    // First, check if the make exists
    const make = await BrowesByMake.findById(makeId);
    if (!make) {
      return responses.notFound(res, 'Make not found');
    }

    // Find the model using array find
    const modelIndex = make.models.findIndex(
      model => model._id.toString() === modelId
    );

    if (modelIndex === -1) {
      return responses.notFound(res, 'Model not found');
    }

    // Find variant index by old name
    const variantIndex = make.models[modelIndex].variants.findIndex(
      variant => variant === oldName
    );

    if (variantIndex === -1) {
      return responses.notFound(res, 'Variant not found');
    }

    // Update the variant name
    make.models[modelIndex].variants[variantIndex] = name;

    // Save the updated document
    await make.save();

    return responses.ok(res, 'Variant updated successfully', { name });
  } catch (error) {
    console.error('Error updating variant:', error);
    return responses.serverError(res, 'Error updating variant');
  }
});

// Delete Model
export const deleteModel = asyncHandler(async (req, res) => {
  const { makeId, modelId } = req.params;

  const make = await BrowesByMake.findById(makeId);
  if (!make) {
    return responses.notFound(res, 'Make not found');
  }

  make.models = make.models.filter(model => model._id.toString() !== modelId);
  await make.save();

  return responses.ok(res, 'Model deleted successfully');
});

// Delete Variant
export const deleteVariant = asyncHandler(async (req, res) => {
  const { makeId, modelId, variant} = req.params;

  const make = await BrowesByMake.findById(makeId);
  if (!make) {
    return responses.notFound(res, 'Make not found');
  }

  const model = make.models.id(modelId);
  if (!model) {
    return responses.notFound(res, 'Model not found');
  }

  model.variants = model.variants.filter(variantData => variantData !== variant);
  await make.save();

  return responses.ok(res, 'Variant deleted successfully');
});
