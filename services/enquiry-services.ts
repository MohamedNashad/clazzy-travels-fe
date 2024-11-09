import { ApiRouteConstants } from '@/configs/app-configs';
import { ApiModules } from '@/constants/routes';
import { EnquiryApiEndpoints } from './api-endpoints/enquiry';

export const createEnquiry = async (formData: FormData) => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints.CREATE_ENQUIRY_URL}`, {
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

// export const fetchAuthorizedRoles = async (): Promise<RoleType[]> => {
//     const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints.GET_AUTHORIZED_ROLES_URL}`, {
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         throw new Error('Error fetching Roles!');
//     }

//     return response.json();
// };

export const fetchAllEnquiries = async (): Promise<any[]> => {
    const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints.GET_ALL_ENQUIRIES_URL}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching Roles!');
    }

    return response.json();
};

// this isn't used at now
// export const fetchRoleById = async (roleId: string): Promise<RoleType> => {
//     const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints?.GET_ROLE_BY_ID_URL}/${roleId}`, {
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         throw new Error('Error fetching Enquiries');
//     }

//     return response.json();
// };

// export const updateRoleById = async (formData: any) => {

//     const roleId = formData?._id; // Correct way to access the shirt ID

//     const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints.UPDATE_ROLE_BY_ID_URL}/${roleId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Ensure you send a JSON string
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         throw new Error('Failed to update Role');
//     }

//     return response.json();
// };

// export const deleteRoleById = async (roleId: string): Promise<RoleType> => {
//     const response = await fetch(`${ApiRouteConstants.BASE_API_URL}/${ApiRouteConstants.MODULE}/${ApiModules.ENQUIRY}/${EnquiryApiEndpoints?.DELETE_ROLE_BY_ID_URL}/${roleId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         throw new Error('Error deleting Role');
//     }

//     return response.json();
// };
