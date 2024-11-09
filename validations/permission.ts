import * as yup from 'yup';

export const permissionSchema = yup.object({
    _id: yup.string().nullable(),
    code: yup.string().required('Code is required!'),
    name: yup.string().required('Name is required!'),
    type: yup.string().required('Type is required!'),
    description: yup.string().nullable(),
    isDelete: yup.boolean().nullable(),
});
