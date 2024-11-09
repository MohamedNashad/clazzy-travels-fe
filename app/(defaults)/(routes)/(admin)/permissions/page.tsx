import React from 'react';
import { Metadata } from 'next';
import PermissionTable from '@/components/organisms/tables/permission-table';

export const metadata: Metadata = {
    title: 'Permissions',
};

const Permission = () => {
    return (
        <div>
            <PermissionTable />
        </div>
    );
};

export default Permission;
