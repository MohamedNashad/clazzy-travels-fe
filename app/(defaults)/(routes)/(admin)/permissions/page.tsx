'use client';

import React, { useEffect } from 'react';
import PermissionTable from '@/components/organisms/tables/permission-table';
import { useRouter } from 'next/navigation';
import { FrontEndRoutes } from '@/constants/routes';

const Permission = () => {
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
            <PermissionTable />
        </div>
    );
};

export default Permission;
