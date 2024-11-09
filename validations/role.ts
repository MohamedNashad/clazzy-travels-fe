import * as yup from 'yup';

export const roleSchema = yup.object({
    _id: yup.string().nullable(),
    slug: yup.string().required('Slug is required!'),
    name: yup.string().required('Name is required!'),
    rank: yup.string().nullable(),
    description: yup.string().nullable(),
    isDelete: yup.boolean().nullable(),
    permissions: yup.array().nullable(),
});
