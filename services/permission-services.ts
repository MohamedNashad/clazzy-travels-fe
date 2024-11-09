import { ApiRouteConstants } from '@/configs/app-configs';
import { UserApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { PermissionApiEndpoints } from './api-endpoints/permission';
import { PermissionType } from '@/types/forms';

export const createPermission = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints.CREATE_PERMISSION_URL}`, {
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
};

export const fetchAuthorizedPermissions = async (): Promise<PermissionType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints.GET_AUTHORIZED_PERMISSIONS_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Permissions!');
    }

    return response.json();
};

export const fetchAllPermissions = async (): Promise<PermissionType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints.GET_ALL_PERMISSIONS_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Permissions!');
    }

    return response.json();
};

// this isn't used at now
export const fetchPermissionById = async (permissionId: string): Promise<PermissionType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints?.GET_PERMISSION_BY_ID_URL}/${permissionId}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Permission');
    }

    return response.json();
};

export const updatePermissionById = async (formData: any) => {
    const permissionId = formData?._id; // Correct way to access the shirt ID

    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints.UPDATE_PERMISSION_BY_ID_URL}/${permissionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Ensure you send a JSON string
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to update Permission');
    }

    return response.json();
};

export const deletePermissionById = async (permissionId: string): Promise<PermissionType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.PERMISSIONS}/${PermissionApiEndpoints?.DELETE_PERMISSION_BY_ID_URL}/${permissionId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error deleting Permission');
    }

    return response.json();
};
