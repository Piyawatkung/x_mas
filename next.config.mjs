/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [],
        domains: [],
        unoptimized: true, // This allows using local images without optimization
    },
    reactStrictMode: true,
};

export default nextConfig;
