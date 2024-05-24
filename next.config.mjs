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
        USE_ENV_FILE: true,
        API_KEY: process.env.API_KEY,
        API_ID: process.env.API_ID,
    },
};

export default nextConfig;
