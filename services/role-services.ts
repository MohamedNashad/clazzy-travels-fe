import { ApiRouteConstants } from '@/configs/app-configs';
import { UserApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { RoleApiEndpoints } from './api-endpoints/role';
import { RoleType } from '@/types/forms';

export const createRole = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints.CREATE_ROLE_URL}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody; // Return the parsed JSON responsereturn responseBody; // Return the parsed JSON response
};

export const fetchAuthorizedRoles = async (): Promise<RoleType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints.GET_AUTHORIZED_ROLES_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles!');
    }

    return response.json();
};

export const fetchAllPermissions = async (): Promise<RoleType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints.GET_ALL_ROLES_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles!');
    }

    return response.json();
};

// this isn't used at now
export const fetchRoleById = async (roleId: string): Promise<RoleType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints?.GET_ROLE_BY_ID_URL}/${roleId}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles');
    }

    return response.json();
};

export const updateRoleById = async (formData: any) => {
    const roleId = formData?._id; // Correct way to access the shirt ID

    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints.UPDATE_ROLE_BY_ID_URL}/${roleId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Ensure you send a JSON string
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to update Role');
    }

    return response.json();
};

export const deleteRoleById = async (roleId: string): Promise<RoleType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLES}/${RoleApiEndpoints?.DELETE_ROLE_BY_ID_URL}/${roleId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error deleting Role');
    }

    return response.json();
};
