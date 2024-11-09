import { ApiRouteConstants } from '@/configs/app-configs';
import { UserApiEndpoints } from './api-endpoints';
import { ApiModules } from '@/constants/routes';
import { RegisterFormData, UserType } from '@/types/forms';

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints.REGISTER_USER_URL}`, {
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

export const createUser = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints.CREATE_USER_URL}`, {
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

export const fetchAuthorizedUsers = async (): Promise<UserType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints.GET_AUTHORIZED_USERS_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Users!');
    }

    return response.json();
};

export const fetchAllUsers = async (): Promise<UserType[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints.GET_ALL_USERS_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles!');
    }

    return response.json();
};

// this isn't used at now
export const fetchUserById = async (userId: string): Promise<UserType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints?.GET_USER_BY_ID_URL}/${userId}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles');
    }

    return response.json();
};

export const updateUserById = async (formData: any) => {
    const userId = formData?._id; // Correct way to access the shirt ID

    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints.UPDATE_USER_BY_ID_URL}/${userId}`, {
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

export const deleteUserById = async (userId: string): Promise<UserType> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.USERS}/${UserApiEndpoints?.DELETE_USER_BY_ID_URL}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error deleting Role');
    }

    return response.json();
};
