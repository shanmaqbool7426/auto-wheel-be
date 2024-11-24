import asyncHandler from 'express-async-handler';
import Location from './model.js';
import Vehicle from '../Vehicle/model.js';
import responses from '../Utils/response.js';
import mongoose from 'mongoose';

// Create Location
export const createLocation = asyncHandler(async (req, res) => {
    const { name, type, parentId } = req.body;

    try {
        // If type is country, parentId should not be provided
        if (type === 'country' && parentId) {
            return responses.badRequest(res, 'Country cannot have a parent location');
        }

        // For other types, parentId is required
        if (type !== 'country') {
            if (!parentId) {
                return responses.badRequest(res, 
                    'Parent location is required for provinces, cities and suburbs'
                );
            }

            const parentLocation = await Location.findById(parentId);
            if (!parentLocation) {
                return responses.notFound(res, 'Parent location not found');
            }

            // Validate hierarchy
            if (
                (type === 'province' && parentLocation.type !== 'country') ||
                (type === 'city' && parentLocation.type !== 'province') ||
                (type === 'suburb' && parentLocation.type !== 'city')
            ) {
                return responses.badRequest(res, 
                    'Invalid location hierarchy. The hierarchy should be: Country -> Province -> City -> Suburb'
                );
            }
        }

        // Check for duplicate name under same parent
        const existingLocation = await Location.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }, // Case insensitive
            type,
            parent: parentId || null
        });

        if (existingLocation) {
            return responses.badRequest(res, 
                `A ${type} with this name already exists ${parentId ? 'under the selected parent' : ''}`
            );
        }

        const location = new Location({
            name,
            type,
            parent: type === 'country' ? null : parentId,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        });

        await location.save();
        return responses.created(res, 'Location created successfully', location);
    } catch (error) {
        console.error('Create location error:', error);
        return responses.error(res, 'Error creating location');
    }
});

// Get Locations with hierarchy and counts
export const getLocations = asyncHandler(async (req, res) => {
    try {
        const {
            type,
            parentId,
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            isActive
        } = req.query;

        // Build query object
        const query = {};

        // Type filter
        if (type) {
            query.type = type;
        }

        // Parent filter
        if (parentId) {
            query.parent = new mongoose.Types.ObjectId(parentId);
        }

        // Active status filter
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute queries in parallel
        const [locations, total] = await Promise.all([
            Location.find(query)
                .populate('parent', 'name type')
                .sort(sortOptions)
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Location.countDocuments(query)
        ]);

        // Prepare pagination info
        const totalPages = Math.ceil(total / parseInt(limit));
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return responses.ok(res, 'Locations retrieved successfully', {
            locations: locations.map(location => ({
                ...location,
                hasChildren: location.children?.length > 0
            })),
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: total,
                limit: parseInt(limit),
                hasNextPage,
                hasPrevPage
            },
            filters: {
                type,
                parentId,
                search,
                isActive
            }
        });

    } catch (error) {
        console.error('Get locations error:', error);
        return responses.internalServerError(res, 'Error retrieving locations');
    }
});

export const getLocationHierarchy = asyncHandler(async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            isActive
        } = req.query;

        // Build base query for countries
        const baseQuery = { type: 'country' };
        
        if (isActive !== undefined) {
            baseQuery.isActive = isActive === 'true';
        }

        if (search) {
            baseQuery.name = { $regex: search, $options: 'i' };
        }

        // Calculate skip for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get paginated countries
        const [countries, totalCountries] = await Promise.all([
            Location.find(baseQuery)
                .sort({ name: 1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Location.countDocuments(baseQuery)
        ]);

        // Get hierarchical data for each country
        const hierarchicalData = await Promise.all(
            countries.map(async (country) => {
                // Get provinces for this country
                const provinces = await Location.find({
                    type: 'province',
                    parent: country._id,
                    ...(isActive !== undefined && { isActive: isActive === 'true' }),
                    ...(search && { name: { $regex: search, $options: 'i' } })
                }).sort({ name: 1 });

                // Get cities and suburbs for each province
                const provincesWithCities = await Promise.all(
                    provinces.map(async (province) => {
                        const cities = await Location.find({
                            type: 'city',
                            parent: province._id,
                            ...(isActive !== undefined && { isActive: isActive === 'true' }),
                            ...(search && { name: { $regex: search, $options: 'i' } })
                        }).sort({ name: 1 });

                        // Get suburbs for each city
                        const citiesWithSuburbs = await Promise.all(
                            cities.map(async (city) => {
                                const suburbs = await Location.find({
                                    type: 'suburb',
                                    parent: city._id,
                                    ...(isActive !== undefined && { isActive: isActive === 'true' }),
                                    ...(search && { name: { $regex: search, $options: 'i' } })
                                }).sort({ name: 1 });

                                return {
                                    _id: city._id,
                                    name: city.name,
                                    slug: city.slug,
                                    type: city.type,
                                    isActive: city.isActive,
                                    suburbs: suburbs.map(suburb => ({
                                        _id: suburb._id,
                                        name: suburb.name,
                                        slug: suburb.slug,
                                        type: suburb.type,
                                        isActive: suburb.isActive
                                    }))
                                };
                            })
                        );

                        return {
                            _id: province._id,
                            name: province.name,
                            slug: province.slug,
                            type: province.type,
                            isActive: province.isActive,
                            cities: citiesWithSuburbs
                        };
                    })
                );

                return {
                    _id: country._id,
                    name: country.name,
                    slug: country.slug,
                    type: country.type,
                    isActive: country.isActive,
                    provinces: provincesWithCities
                };
            })
        );

        // Prepare pagination info
        const totalPages = Math.ceil(totalCountries / parseInt(limit));

        return responses.ok(res, 'Location hierarchy retrieved successfully', {
            locations: hierarchicalData,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: totalCountries,
                limit: parseInt(limit),
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            filters: {
                search,
                isActive
            }
        });

    } catch (error) {
        console.error('Get location hierarchy error:', error);
        return responses.error(res, 'Error retrieving location hierarchy');
    }
});

// Update Location
export const updateLocation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, isActive } = req.body;

    try {
        const location = await Location.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true, runValidators: true }
        );

        if (!location) {
            return responses.notFound(res, 'Location not found');
        }

        return responses.ok(res, 'Location updated successfully', location);
    } catch (error) {
        console.error('Update location error:', error);
        return responses.internalServerError(res, 'Error updating location');
    }
});

// Delete Location
export const deleteLocation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // First check if location exists
        const location = await Location.findById(id);
        if (!location) {
            return responses.notFound(res, 'Location not found');
        }

        // Get all descendant locations recursively
        const getAllDescendantIds = async (locationId) => {
            const descendants = [];
            
            // Get immediate children
            const children = await Location.find({ parent: locationId });
            
            for (const child of children) {
                descendants.push(child._id);
                // Recursively get children of children
                const childDescendants = await getAllDescendantIds(child._id);
                descendants.push(...childDescendants);
            }
            
            return descendants;
        };

        // Get all descendant IDs
        const descendantIds = await getAllDescendantIds(id);
        const allLocationIds = [id, ...descendantIds];

        // Check for associated vehicles in all locations
        const hasVehicles = await Vehicle.exists({
            $or: [
                { country: { $in: allLocationIds } },
                { province: { $in: allLocationIds } },
                { city: { $in: allLocationIds } },
                { suburb: { $in: allLocationIds } }
            ]
        });

        if (hasVehicles) {
            return responses.badRequest(res, 
                'Cannot delete location. There are vehicles associated with this location or its children'
            );
        }

        // Delete all descendant locations and the parent location
        const deleteResult = await Location.deleteMany({
            _id: { $in: allLocationIds }
        });

        return responses.ok(res, 'Location and all its children deleted successfully', {
            deletedCount: deleteResult.deletedCount,
            deletedLocations: {
                parent: location.name,
                type: location.type,
                childrenCount: descendantIds.length
            }
        });

    } catch (error) {
        console.error('Delete location error:', error);
        return responses.internalServerError(res, 'Error deleting location');
    }
});

export const bulkDeleteLocations = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    try {
        // Validate input
        if (!Array.isArray(ids) || ids.length === 0) {
            return responses.badRequest(res, 'Please provide valid location IDs');
        }

        // Convert string IDs to ObjectIds
        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));

        // Get all selected locations
        const selectedLocations = await Location.find({ _id: { $in: objectIds } });
        if (selectedLocations.length === 0) {
            return responses.notFound(res, 'No locations found');
        }

        // Get all descendant locations recursively
        const getAllDescendantIds = async (locationId) => {
            const descendants = [];
            const children = await Location.find({ parent: locationId });
            
            for (const child of children) {
                descendants.push(child._id);
                const childDescendants = await getAllDescendantIds(child._id);
                descendants.push(...childDescendants);
            }
            
            return descendants;
        };

        // Collect all locations to be deleted (selected + their descendants)
        let allLocationIds = [...objectIds];
        for (const location of selectedLocations) {
            const descendantIds = await getAllDescendantIds(location._id);
            allLocationIds.push(...descendantIds);
        }

        // Remove duplicates
        allLocationIds = [...new Set(allLocationIds.map(id => id.toString()))];
        allLocationIds = allLocationIds.map(id => new mongoose.Types.ObjectId(id));

        // Check for associated vehicles in all locations
        const hasVehicles = await Vehicle.exists({
            $or: [
                { country: { $in: allLocationIds } },
                { province: { $in: allLocationIds } },
                { city: { $in: allLocationIds } },
                { suburb: { $in: allLocationIds } }
            ]
        });

        if (hasVehicles) {
            return responses.badRequest(res, 
                'Cannot delete locations. There are vehicles associated with these locations or their children'
            );
        }

        // Get location details before deletion for response
        const locationDetails = await Location.find({ _id: { $in: objectIds } })
            .select('name type');

        // Delete all locations
        const deleteResult = await Location.deleteMany({
            _id: { $in: allLocationIds }
        });

        return responses.ok(res, 'Locations deleted successfully', {
            requestedDeletions: locationDetails.map(loc => ({
                _id: loc._id,
                name: loc.name,
                type: loc.type
            })),
            totalDeleted: deleteResult.deletedCount,
            directDeletions: ids.length,
            cascadedDeletions: deleteResult.deletedCount - ids.length
        });

    } catch (error) {
        console.error('Bulk delete locations error:', error);
        if (error.name === 'CastError') {
            return responses.badRequest(res, 'Invalid location ID format');
        }
        return responses.internalServerError(res, 'Error deleting locations');
    }
});