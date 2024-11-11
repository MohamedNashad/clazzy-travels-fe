import { ApiRouteConstants } from '@/configs/app-configs';
import { AuthApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { LoginFormData } from '@/types/forms';

export const validateToken = async () => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.AUTH}/${AuthApiEndpoints.VALIDATE_TOKEN_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Token invalid');
    }

    return response.json();
};

export const signIn = async (formData: LoginFormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.AUTH}/${AuthApiEndpoints.LOGIN_URL}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }

    // Save the userId and token in sessionStorage
    sessionStorage.setItem('userId', body.userId);

    return body;
};

export const signOut = async () => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.AUTH}/${AuthApiEndpoints.LOGOUT_URL}`, {
        credentials: 'include',
        method: 'POST',
    });
    
    // Remove the userId and token from sessionStorage    
    sessionStorage.removeItem('userId');

    if (!response.ok) {
        throw new Error('Error during sign out');
    }
};

export const getLoggedInUserRoleWithPermissions = async (): Promise<any[]> => {
    const response = await fetch(
        `${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USER_ROLES_AND_PERMISSIONS}/${AuthApiEndpoints.LOGGED_IN_USER_ASSIGNED_ROLES_AND_PERMISSIONS}`,
        {
            credentials: 'include',
        }
    );

    if (!response.ok) {
        throw new Error('Error fetching shirts!');
    }

    return response.json();
};
