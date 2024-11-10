"use client";

import { FrontEndRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AccountSettings = () => {

    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('userId') !== null;

        if (!isAuthenticated) {
            // Redirect to login page if not authenticated
            router.push(FrontEndRoutes?.LOGIN_URL);
        }
    }, [router]);

    return <div>AccountSettings</div>;
};

export default AccountSettings;
