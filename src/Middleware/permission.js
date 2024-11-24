import responses from '../Utils/response.js';
import Role from '../Role/model.js';

export const hasPermission = (resource, action) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return responses.unauthorized(res, 'User not authenticated');
            }

            // Superadmin has all permissions
            const userRoles = await Role.find({ _id: { $in: req.user.roles } });
            if (userRoles.some(role => role.name === 'superAdmin')) {
                return next();
            }

            // Check if user has required permission
            const hasRequiredPermission = userRoles.some(role => 
                role.permissions.some(permission =>
                    permission.resource === resource &&
                    permission.actions.includes(action)
                )
            );

            if (!hasRequiredPermission) {
                return responses.forbidden(res, 'You do not have permission to perform this action');
            }

            next();
        } catch (error) {
            console.error('Permission check error:', error);
            return responses.error(res, 'Error checking permissions');
        }
    };
};

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return responses.unauthorized(res, 'User not authenticated');
        }

        const userRoles = await Role.find({ _id: { $in: req.user.roles } });
        if (!userRoles.some(role => ['superAdmin', 'admin'].includes(role.name))) {
            return responses.forbidden(res, 'Admin access required');
        }

        next();
    } catch (error) {
        console.error('Admin check error:', error);
        return responses.error(res, 'Error checking admin status');
    }
};

export const isDealer = async (req, res, next) => {
    try {
        if (!req.user) {
            return responses.unauthorized(res, 'User not authenticated');
        }

        const userRoles = await Role.find({ _id: { $in: req.user.roles } });
        if (!userRoles.some(role => ['superAdmin', 'admin', 'dealer'].includes(role.name))) {
            return responses.forbidden(res, 'Dealer access required');
        }

        next();
    } catch (error) {
        console.error('Dealer check error:', error);
        return responses.error(res, 'Error checking dealer status');
    }
};