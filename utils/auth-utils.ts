import { Permission, Role } from '@/constants/role-permissions';

// Define a type for individual role permissions
interface RolePermission {
    userId: string;
    roleName: Role;
    permissions: Permission[];
}

// Define the type for the `userRolesAndPermissions` array
type UserRolesAndPermissions = RolePermission[];

export const hasPermission = (userRolesAndPermissions: UserRolesAndPermissions, requiredRoles: Role[], requiredPermissions: Permission[]): boolean => {
    return userRolesAndPermissions.some(
        (rolePermission) => requiredRoles.includes(rolePermission.roleName) && rolePermission.permissions.some((permission) => requiredPermissions.includes(permission))
    );
};
