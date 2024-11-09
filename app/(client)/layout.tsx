import React from 'react';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto max-w-[1920px] text-sm text-black">
            <div className="bg-white">{children}</div>
        </div>
    );
};

export default ClientLayout;
