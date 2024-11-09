import React from 'react';
import UserTable from '@/components/organisms/tables/user-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Users',
};

const Role = () => {
    return (
        <div>
            <UserTable />
        </div>
    );
};

export default Role;
