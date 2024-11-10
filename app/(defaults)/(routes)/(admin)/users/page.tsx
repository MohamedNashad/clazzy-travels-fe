'use client';

import React, { useEffect } from 'react';
import UserTable from '@/components/organisms/tables/user-table';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { FrontEndRoutes } from '@/constants/routes';

const Role = () => {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('userId') !== null;

        if (!isAuthenticated) {
            // Redirect to login page if not authenticated
            router.push(FrontEndRoutes?.LOGIN_URL);
        }
    }, [router]);
    
    return (
        <div>
            <UserTable />
        </div>
    );
};

export default Role;
