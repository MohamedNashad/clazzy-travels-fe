// usePermissionForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { permissionSchema } from '@/validations/permission';

export const usePermissionForm = () => {
    return useForm({
        mode: 'onSubmit',
        resolver: yupResolver(permissionSchema),
        defaultValues: {
            _id: '',
            code: '',
            name: '',
            type: '',
            description: '',
        },
    });
};
