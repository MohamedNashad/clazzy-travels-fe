import { QueryKeyConstants } from '@/constants/query-keys';
import { FrontEndRoutes } from '@/constants/routes';
import { useAppContext } from '@/contexts/app-context';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as AuthServices from '@/services/auth-services';

const LogoutButton = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(AuthServices.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(QueryKeyConstants?.GET_VALIDATE_TOKEN_KEY);
            showToast({ message: 'Signed Out!', icon: 'success', position: 'top-end' });
            router.push(FrontEndRoutes.LOGIN_URL);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return <button onClick={handleClick}>Sign Out</button>;
};

export default LogoutButton;
