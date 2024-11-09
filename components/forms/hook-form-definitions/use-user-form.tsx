// useUserForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { userSchema } from '@/validations/user';
import { yupResolver } from '@hookform/resolvers/yup';

export const useUserForm = () => {
    return useForm({
        mode: 'onSubmit',
        resolver: yupResolver(userSchema),
        defaultValues: {
            _id: '',
            email: '',
            firstName: '',
            lastName: '',
            roles: [],
        },
    });
};
