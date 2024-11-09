/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/', // Match the root path
                destination: '/home', // Redirect to /home
                permanent: false, // Use false to indicate a temporary redirect
            },
        ];
    },
};

module.exports = nextConfig;
