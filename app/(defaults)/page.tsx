import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const metadata: Metadata = {
    title: 'CLAZZY TR',
};

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /home on initial load
        router.replace('/home');
    }, [router]);

    return null; // Optional
};

export default Home;
