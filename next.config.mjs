/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            'storage.googleapis.com',
            'localhost',
            'lh3.googleusercontent.com',
        ],
    }
};

export default nextConfig;
