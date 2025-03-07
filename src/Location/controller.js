import asyncHandler from 'express-async-handler';
import Location from './model.js';
import responses from '../Utils/response.js';

// Create Location
export const createLocation = asyncHandler(async (req, res) => {
    const { name, type, parentId, parentType } = req.body;

    try {
        // Check if location with same name exists
        const existingLocation = await Location.findOne({ 
            name: name,
            type: type,
            parentId: parentId || null 
        });

        if (existingLocation) {
            return responses.badRequest(res, 'Location with this name already exists');
        }

        // Validate parent-child relationship
        if (parentId) {
            const parent = await Location.findById(parentId);
            if (!parent) {
                return responses.badRequest(res, 'Parent location not found');
            }

            // Validate location hierarchy
            const validHierarchy = {
                'province': 'country',
                'city': 'province',
                'suburb': 'city'
            };

            if (validHierarchy[type] !== parent.type) {
                return responses.badRequest(res, `${type} must have a ${validHierarchy[type]} as parent`);
            }
        }

        const location = await Location.create({
            name,
            type,
            parentId,
            parentType,
            isActive: true
        });

        return responses.created(res, 'Location created successfully', location);
    } catch (error) {
        console.error('Create location error:', error);
        return responses.error(res, 'Error creating location');
    }
});

// Get All Locations
export const getLocations = asyncHandler(async (req, res) => {
    try {
        const { 
            type, 
            parentId, 
            search,
            isActive,
            parentType,
            sort = 'name',
            order = 'asc',
            page = 1,
            limit = 10
        } = req.query;
        
        let query = {};
        let sortOptions = {};
        
        // Basic filters
        if (type) query.type = type;
        if (parentId) query.parentId = parentId;
        if (parentType) query.parentType = parentType;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        // Search filter - search in name and slug
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { slug: { $regex: search, $options: 'i' } }
            ];
        }

        // Type-specific filters
        switch(type) {
            case 'province':
                if (req.query.countryId) query.parentId = req.query.countryId;
                break;
            case 'city':
                if (req.query.provinceId) query.parentId = req.query.provinceId;
                break;
            case 'suburb':
                if (req.query.cityId) query.parentId = req.query.cityId;
                break;
        }

        // Sorting
        sortOptions[sort] = order === 'desc' ? -1 : 1;

        // Pagination
        const skip = (page - 1) * limit;

        // Execute query with pagination
        const [locations, total] = await Promise.all([
            Location.find(query)
                .populate('parentId', 'name type')
                .sort(sortOptions)
                .skip(skip)
                .limit(parseInt(limit)),
            Location.countDocuments(query)
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return responses.ok(res, 'Locations fetched successfully', {
            locations,
            pagination: {
                total,
                page: parseInt(page),
                totalPages,
                limit: parseInt(limit),
                hasNextPage,
                hasPrevPage
            },
            filters: {
                type,
                parentId,
                search,
                isActive,
                parentType
            },
            sorting: {
                field: sort,
                order
            }
        });

    } catch (error) {
        console.error('Get locations error:', error);
        // return responses.error(res, 'Error fetching locations');
    }
});

// Get Location Hierarchy
export const getLocationHierarchy = asyncHandler(async (req, res) => {
    try {
        // Get all countries
        const countries = await Location.find({ type: 'country' });

        const hierarchy = await Promise.all(countries.map(async (country) => {
            // Get provinces for each country
            const provinces = await Location.find({ 
                parentId: country._id,
                type: 'province'
            });

            // Get cities and suburbs for each province
            const provincesWithCities = await Promise.all(provinces.map(async (province) => {
                const cities = await Location.find({ 
                    parentId: province._id,
                    type: 'city'
                });

                // Get suburbs for each city
                const citiesWithSuburbs = await Promise.all(cities.map(async (city) => {
                    const suburbs = await Location.find({
                        parentId: city._id,
                        type: 'suburb'
                    });

                    return {
                        ...city.toObject(),
                        suburbs: suburbs
                    };
                }));

                return {
                    ...province.toObject(),
                    cities: citiesWithSuburbs
                };
            }));

            return {
                ...country.toObject(),
                provinces: provincesWithCities
            };
        }));

        return responses.ok(res, 'Hierarchy fetched successfully', hierarchy);
    } catch (error) {
        return responses.error(res, 'Error fetching hierarchy');
    }
});

// Get Children Locations
export const getChildrenLocations = asyncHandler(async (req, res) => {
    try {
        const { parentId } = req.params;
        const { type } = req.query;

        let query = { parentId };
        if (type) query.type = type;

        const children = await Location.find(query);
        return responses.ok(res, 'Children locations fetched successfully', children);
    } catch (error) {
        return responses.error(res, 'Error fetching children locations');
    }
});

// Update Location
export const updateLocation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isActive } = req.body;

        const location = await Location.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true }
        );

        if (!location) {
            return responses.notFound(res, 'Location not found');
        }

        return responses.ok(res, 'Location updated successfully', location);
    } catch (error) {
        return responses.error(res, 'Error updating location');
    }
});

// Delete Location
export const deleteLocation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Check if location has any children (including suburbs)
        const hasChildren = await Location.findOne({ parentId: id });
        if (hasChildren) {
            return responses.badRequest(res, 'Cannot delete location with children');
        }

        const location = await Location.findByIdAndDelete(id);
        if (!location) {
            return responses.notFound(res, 'Location not found');
        }

        return responses.ok(res, 'Location deleted successfully', location);
    } catch (error) {
        return responses.error(res, 'Error deleting location');
    }
});
// Get Provinces
export const getProvinces = asyncHandler(async (req, res) => {
    const provinces = await Location.find({ type: 'province' });
    return responses.ok(res, 'Provinces fetched successfully', provinces);
});

// Get Cities
export const getCities = asyncHandler(async (req, res) => {
    const cities = await Location.find({ type: 'city' });
    return responses.ok(res, 'Cities fetched successfully', cities);
});

