// rolesPermissions.ts

// Define roles
export const ROLES = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    USER: "USER",
} as const;

// Define permissions
export const PERMISSIONS = {
    ROLE_UPDATE: "ROLE_UPDATE",
    PERMISSION_UPDATE: "PERMISSION_UPDATE",
    ROLE_DELETE: "ROLE_DELETE",
    PERMISSION_DELETE: "PERMISSION_DELETE",
    ROLE_VIEW: "ROLE_VIEW",
    PERMISSION_VIEW: "PERMISSION_VIEW",
} as const;

// Types derived from the roles and permissions constants
export type Role = keyof typeof ROLES;
export type Permission = keyof typeof PERMISSIONS;
