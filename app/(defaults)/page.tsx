'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /home on initial load
        router.replace('/home');
    }, [router]);

    return null; // Optional
};

export default Home;
