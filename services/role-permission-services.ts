import { ApiRouteConstants } from '@/configs/app-configs';
import { UserApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { RoleApiEndpoints } from './api-endpoints/role';
import { RoleType } from '@/types/forms';
import { RolePermissionApiEndpoints } from './api-endpoints/role-permission';

export const assignAuthorizedPermissionsToRole = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLE_PERMISSIONS}/${RolePermissionApiEndpoints.ASSIGN_PERMISSIONS_TO_ROLE_URL}`, {
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

// this isn't used at now
export const fetchAuthorizedRoleWithPermissions = async (roleId: string): Promise<RoleType> => {
    const response = await fetch(
        `${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ROLE_PERMISSIONS}/${RolePermissionApiEndpoints?.GET_ROLE_WITH_PERMISSIONS_URL}/${roleId}`,
        {
            credentials: 'include',
        }
    );

    if (!response.ok) {
        throw new Error('Error fetching Roles');
    }

    return response.json();
};
