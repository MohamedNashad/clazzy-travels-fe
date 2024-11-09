import { ApiRouteConstants } from '@/configs/app-configs';
import { UserApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { RoleApiEndpoints } from './api-endpoints/role';
import { UserType } from '@/types/forms';
import { UserRoleApiEndpoints } from './api-endpoints/user-role';

export const assignAuthorizedRolesToUser = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USER_ROLES}/${UserRoleApiEndpoints.ASSIGN_ROLES_TO_USER_URL}`, {
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
export const fetchAuthorizedUserWithRoles = async (userId: string): Promise<UserType> => {
    const response = await fetch(
        `${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USER_ROLES}/${UserRoleApiEndpoints?.GET_USER_WITH_ROLES_URL}/${userId}`,
        {
            credentials: 'include',
        }
    );

    if (!response.ok) {
        throw new Error('Error fetching Roles');
    }

    return response.json();
};
