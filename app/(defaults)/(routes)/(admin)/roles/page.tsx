import React from 'react';
import { Metadata } from 'next';
import RoleTable from '@/components/organisms/tables/role-table';

export const metadata: Metadata = {
    title: 'Roles',
};

const Role = () => {
    return (
        <div>
            <RoleTable />
        </div>
    );
};

export default Role;
