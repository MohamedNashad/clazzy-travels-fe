import React from 'react';
import { Metadata } from 'next';
import EnquiryTable from '@/components/organisms/tables/enquiry-table';

export const metadata: Metadata = {
    title: 'Enquiries',
};

const Role = () => {
    return (
        <div>
            <EnquiryTable />
        </div>
    );
};

export default Role;
