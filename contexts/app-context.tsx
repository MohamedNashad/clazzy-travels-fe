'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { QueryKeyConstants } from '@/constants/query-keys';
import * as AuthServices from '@/services/auth-services';
import Toast from '@/components/molecules/toast/toast';

type ToastMessage = {
    icon: 'success' | 'error' | 'warning';
    position: 'top-end';
    message: string;
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    userRolesAndPermissions?: any;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY, AuthServices.validateToken, {
        retry: false,
    });

    const { data: userRolesAndPermissionsData } = useQuery(QueryKeyConstants.GET_AUTHORIZED_USER_ROLES_AND_PERMISSIONS_KEY, AuthServices.getLoggedInUserRoleWithPermissions, {
        retry: false,
    });

    useEffect(() => {
        if (toast) {
            Toast(toast);
            // Clear the toast after showing it
            setToast(undefined);
        }
    }, [toast]);

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError,
                userRolesAndPermissions: userRolesAndPermissionsData,
            }}
        >
            {toast && <Toast icon={toast.icon} message={toast.message} position={toast.position} />}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
