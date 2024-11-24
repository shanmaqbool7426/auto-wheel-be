import asyncHandler from 'express-async-handler';
import Role from './model.js';
import responses from '../Utils/response.js';

export const createRole = asyncHandler(async (req, res) => {
    try {
        const { name, permissions, description } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return responses.conflict(res, 'Role already exists');
        }

        const role = await Role.create({
            name,
            permissions,
            description
        });

        return responses.created(res, 'Role created successfully', role);
    } catch (error) {
        console.error('Create role error:', error);
        return responses.error(res, 'Error creating role');
    }
});

export const getRoles = asyncHandler(async (req, res) => {
    try {
        const roles = await Role.find({});
        return responses.ok(res, 'Roles retrieved successfully', roles);
    } catch (error) {
        console.error('Get roles error:', error);
        return responses.error(res, 'Error retrieving roles');
    }
});

export const updateRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions, description, isActive } = req.body;

        const role = await Role.findById(id);
        if (!role) {
            return responses.notFound(res, 'Role not found');
        }

        if (permissions) role.permissions = permissions;
        if (description) role.description = description;
        if (isActive !== undefined) role.isActive = isActive;

        await role.save();
        return responses.ok(res, 'Role updated successfully', role);
    } catch (error) {
        console.error('Update role error:', error);
        return responses.error(res, 'Error updating role');
    }
});

export const deleteRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return responses.notFound(res, 'Role not found');
        }

        await role.remove();
        return responses.ok(res, 'Role deleted successfully');
    } catch (error) {
        console.error('Delete role error:', error);
        return responses.error(res, 'Error deleting role');
    }
});