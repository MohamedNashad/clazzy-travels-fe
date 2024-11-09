import * as yup from 'yup';

export const userRegisterSchema = yup.object({
    email: yup.string().required('Email is required!').email('Invalid email format!'),
    firstName: yup.string().required('First Name is required!'),
    lastName: yup.string().required('Last Name is required!'),
    password: yup.string().required('Password is required!').min(6, 'Password must be at least 6 characters long!'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required!')
        .oneOf([yup.ref('password')], 'Passwords must match!'),
});

export const userSchema = yup.object({
    _id: yup.string().nullable(),
    firstName: yup.string().required('First Name is required!'),
    lastName: yup.string().required('Last Name is required!'),
    email: yup.string().required('Email is required!').email('Invalid email format!'),
    roles: yup.array().nullable(),
    isDelete: yup.boolean().nullable(),
});
