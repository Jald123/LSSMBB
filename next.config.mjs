/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/learn',
                destination: '/academy',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
