'use client';

import { FrontEndRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /home on initial load
        router.replace(FrontEndRoutes?.DASHBOARD_URL);
    }, []);

    return null; // Optional
};

export default Home;
