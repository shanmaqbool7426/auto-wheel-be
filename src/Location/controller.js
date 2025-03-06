import asyncHandler from 'express-async-handler';
import Location from './model.js';
import responses from '../Utils/response.js';

// Create Location
export const createLocation = asyncHandler(async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Locations
export const getLocations = asyncHandler(async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const locations = await Location.find(query).populate('parent');
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Location Hierarchy
export const getLocationHierarchy = asyncHandler(async (req, res) => {
    try {
        const provinces = await Location.find({ type: 'PROVINCE' });
        const hierarchy = await Promise.all(provinces.map(async (province) => {
            const cities = await Location.find({ parent: province._id });
            const citiesWithSuburbs = await Promise.all(cities.map(async (city) => {
                const suburbs = await Location.find({ parent: city._id });
                return { ...city.toObject(), suburbs };
            }));
            return { ...province.toObject(), cities: citiesWithSuburbs };
        }));
        res.json(hierarchy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Children Locations
export const getChildrenLocations = asyncHandler(async (req, res) => {
    try {
        const { parentId } = req.params;
        const children = await Location.find({ parent: parentId });
        res.json(children);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Location
export const updateLocation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findByIdAndUpdate(id, req.body, { new: true });
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Location
export const deleteLocation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findByIdAndDelete(id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const getProvinces = asyncHandler(async (req, res) => {
    try {
        const provinces = await Location.find({ type: 'PROVINCE' });
        res.json(provinces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
