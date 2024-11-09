// useRoleForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { roleSchema } from '@/validations/role';
import { yupResolver } from '@hookform/resolvers/yup';

export const useRoleForm = () => {
    return useForm({
        mode: 'onSubmit',
        resolver: yupResolver(roleSchema),
        defaultValues: {
            _id: '',
            slug: '',
            name: '',
            rank: '',
            description: '',
            permissions: [],
        },
    });
};
