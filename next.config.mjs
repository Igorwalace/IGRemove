/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            'storage.googleapis.com',
            'localhost',
            'lh3.googleusercontent.com',
        ],
    },
    env: {
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
    },
};

export default nextConfig;
