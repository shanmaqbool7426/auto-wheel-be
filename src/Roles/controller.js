import asyncHandler from 'express-async-handler';
import Role from './model.js';
import responses from '../Utils/response.js';

// Get all roles with pagination and search
export const getRoles = asyncHandler(async (req, res) => {
    try {
        const { search, page = 1, limit = 10, isActive } = req.query;
        
        // Build query
        let query = {};
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        const roles = await Role.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalRoles = await Role.countDocuments(query);
        const totalPages = Math.ceil(totalRoles / limit);

        return responses.ok(res, 'Roles retrieved successfully', {
            roles,
            totalRoles,
            totalPages,
            currentPage: Number(page)
        });
    } catch (error) {
        console.error('Get roles error:', error);
        return responses.serverError(res, 'Error retrieving roles');
    }
});


// Create new role
export const createRole = asyncHandler(async (req, res) => {
    try {
        const { name, permissions } = req.body;

        // Validate required fields
        if (!name || !permissions) {
            return responses.badRequest(res, 'Name and permissions are required');
        }

        // Check if role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return responses.conflict(res, 'Role already exists');
        }

        const role = await Role.create({
            name,
            permissions,
            isActive: true
        });

        return responses.created(res, 'Role created successfully', role);
    } catch (error) {
        console.error('Create role error:', error);
        return responses.serverError(res, 'Error creating role');
    }
});


// Get single role by ID
export const getRoleById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        const role = await Role.findById(id);
        if (!role) {
            return responses.notFound(res, 'Role not found');
        }

        return responses.ok(res, 'Role retrieved successfully', role);
    } catch (error) {
        console.error('Get role error:', error);
        return responses.serverError(res, 'Error retrieving role');
    }
});

export const updateRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions, isActive } = req.body;

        // Use findOneAndUpdate with proper options
        const role = await Role.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...(permissions && Object.keys(permissions).reduce((acc, module) => ({
                        ...acc,
                        [`permissions.${module}`]: permissions[module]
                    }), {})),
                    ...(typeof isActive !== 'undefined' && { isActive })
                }
            },
            {
                new: true, // Return updated document
                runValidators: true, // Run validators only on updated fields
                context: 'query'
            }
        );

        if (!role) {
            return responses.notFound(res, 'Role not found');
        }

        return responses.ok(res, 'Role updated successfully', role);
    } catch (error) {
        console.error('Update role error:', error);
        return responses.serverError(res, 'Error updating role');
    }
});

// Delete role
export const deleteRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return responses.notFound(res, 'Role not found');
        }

        // Prevent deleting superAdmin role
        if (role.name === 'superAdmin') {
            return responses.forbidden(res, 'Super Admin role cannot be deleted');
        }

        await Role.deleteOne({ _id: id });
        return responses.ok(res, 'Role deleted successfully');
    } catch (error) {
        console.error('Delete role error:', error);
        return responses.serverError(res, 'Error deleting role');
    }
});
